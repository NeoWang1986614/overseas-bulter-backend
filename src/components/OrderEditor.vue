<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/order-manager' }">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content-container">
        <div class="left-part-container">
            <span class="title-container">订单详情</span>
            <div class="order-detail-container">
                <el-input 
                    class="content-input" 
                    v-model="order.content" 
                    type="textarea"
                    :rows="23"
                    resize="none"
                    :disabled="'non-payment' != this.order.status">
                    placeholder="请输入订单内容">
                        <template slot="prepend">价格:</template>
                </el-input>
            </div>
            <div class="price-container">
                <el-input 
                    class="price-input" 
                    v-model.number="order.price" 
                    type="text"
                    :disabled="'non-payment' != this.order.status">
                    placeholder="请输入价格">
                        <template slot="prepend">价格:</template>
                </el-input>
            </div>
            <div class="button-container">
                <el-button class="modify-button" type="success" @click="onModifyClick" :disabled="'non-payment' != this.order.status">修 改 订 单</el-button>
            </div>
        </div>
        <div class="middle-line" v-if="isNeedExtralPart"></div>
        <div class="right-part-container" v-if="isNeedExtralPart">
            <div class="feedback-container" v-if="isNeedFeedback">
                <span class="title-container">订单反馈</span>
                <div class="feedback-detail-container">
                    <el-timeline>
                        <el-timeline-item v-for="item in feedbacks" :timestamp="item.createTime" placement="top">
                        <el-card>
                            <p>{{item.content}}</p>
                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
                <div class="feedback-control-container" v-if="isNeedFeedbackControl">
                    <el-input 
                        class="feedback-input" 
                        v-model="feedbackInput" 
                        type="text"
                        @keyup.enter.native="onFeedbackInputEnter"
                        placeholder="请输入反馈按回车发送">
                            <template slot="prepend">反馈:</template>
                    </el-input>
                    <div class="complete-btn-discription">注:点击‘完成订单’后反馈将不能输入</div>
                    <el-button class="complete-button" type="danger" @click="onCompleteClick">完 成 订 单</el-button>
                </div>
            </div>
            <div class="operate-container" v-if="isNeedOperate">
                <el-button class="modify-button" type="primary" @click="onAcceptedClick">接 受 订 单</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {getOrderAsync, modifyOrderAsync, getFeedbacksAsync, addFeedbackAsync} from '../../common/utils.js'
import {convertOrderEntity, convertOrderObject} from '../entity/order.js'
import {convertFeedbackObject} from '../entity/feedback.js'
import {convertFeedbackEntities} from '../entity/feedback.js'

export default {
  name: 'OrderEditor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      order: {},
      /*extral*/
      isNeedExtralPart: false,
      isNeedFeedback: false,
      isNeedFeedbackControl: false,
      isNeedOperate: false,
      feedbacks: [],
      feedbackInput: ''
    }
  },
  created: function() {
    console.log('case editor is created');
    if(this.$route.params.hasOwnProperty('id')){
        console.log(this.$route.params['id']);
        getOrderAsync(this.$route.params['id'], res => {
            console.log(res);
            this.order = convertOrderEntity(res);
            this.checkOrderStatus();
        }); 
    }
  },
  methods: {
      onModifyClick: function(){
          console.log('modify click', this.order);
          modifyOrderAsync(convertOrderObject(this.order), res => {
              console.log('modify success', res);
              this.$message({
                  message: '订单修改成功!',
                  type: 'success'
              });
          })
      },
      onAcceptedClick: function(){
          this.order.status = 'accepted';
          modifyOrderAsync(convertOrderObject(this.order), res => {
              console.log('accept success', res);
              this.$message({
                  message: '接受订单成功!',
                  type: 'success'
              });
              this.checkOrderStatus();
              this.sendFeedbackText('订单已接受');
          })
      },
      onCompleteClick: function() {
          this.$alert('确定完成订单后，将无法输入反馈。确定完成订单?', '完成订单', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(action);
                        if(action == 'confirm'){
                            console.log('确定完成');
                            this.order.status = 'completed';
                            modifyOrderAsync(convertOrderObject(this.order), res => {
                                console.log('complete success', res);
                                this.$message({
                                    message: '完成订单!',
                                    type: 'success'
                                });
                                this.checkOrderStatus();
                            })
                        }
                    }
                }); 
      },
      sendFeedbackText: function(feedbackContent){
          var feedback = {
              orderId: this.order.id,
              authorId: '001',
              content: feedbackContent
          };
          addFeedbackAsync(convertFeedbackObject(feedback), res=>{
              console.log(res);
              this.updateFeedbacks();
          });
      },
      onFeedbackInputEnter: function(){
          this.sendFeedbackText(this.feedbackInput);
          this.feedbackInput = '';
      },
      updateFeedbacks: function() {
          getFeedbacksAsync(this.order.id, 0, 10000, res => {
              console.log(convertFeedbackEntities(res));
              this.feedbacks = convertFeedbackEntities(res);
          });
      },
      checkOrderStatus: function() {
        this.isNeedExtralPart = false;
        this.isNeedFeedback = false;
        this.isNeedOperate = false;
        this.isNeedFeedbackControl = false;
        if(this.order && 'non-payment' == this.order.status){
            this.isNeedExtralPart = false;
        }else if(this.order && 'paid' == this.order.status){
            this.isNeedExtralPart = true;
            this.isNeedOperate = true;
        }else if(this.order && 'accepted' == this.order.status){
            this.isNeedExtralPart = true;
            this.isNeedFeedback = true;
            this.isNeedFeedbackControl = true;
            this.updateFeedbacks();
        }else if(this.order && 'completed' == this.order.status){
            this.isNeedExtralPart = true;
            this.isNeedFeedback = true;
            this.updateFeedbacks();
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
    background: whitesmoke;
    display: flex;
    flex-direction: column;
}

.indicator-container {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: white;
    flex-shrink: 0;
    padding-left: 10px;
}

.content-container {
    width: 100%;
    // background: pink;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.left-part-container {
    height: 100%;
    width: 600px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.middle-line {
    width: 2px;
    height: 98%;
    background: lightblue;
}

.right-part-container {
    height: 100%;
    width: 400px;
}

.feedback-container {
    width: 100%;
    height: 96%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify: center;
    background: whitesmoke;
}

.operate-container {
    width: 100%;
    height: 100%;
    background: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
}

.title-container {
    height: 60px;
    line-height: 60px;
    font-size: 24px;
}

.order-detail-container{
    width: 90%;
    height: 500px;
    // background: purple;
}

.price-container {
    height: 60px;
    width: 90%;
    // background: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content-input {
    width: 100%;
    height: 500px;
    // background: gray;
}

.button-container {
    width: 90%;
    height: 50px;
    // background: lightgreen;
    display: flex;
    justify-content: center;
    align-items: center;
}

.save-button {
    width: 100px;
}

.feedback-detail-container {
    width: 80%;
    height: 500px;
    background: white;
    padding: 20px;
    flex-grow: 1;
    overflow-y: scroll;
}

.feedback-control-container {
    width: 90%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.complete-button {
    margin-top: 2px;
}

.complete-btn-discription {
    font-size: 10px;
    color: red;
    margin-top: 10px
}

</style>
