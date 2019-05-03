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
            <div class="order-info-container">
                <div class="order-common-item">类型: {{textMap[order.type]}}</div>
                <div class="vertical-line"></div>
                <div class="order-common-item">户型: {{textMap[order.houseLayout]}}</div>
                <div class="vertical-line"></div>
                <div class="order-common-item">状态: {{textMap[order.status]}}</div>
                <div class="vertical-line"></div>
                <div class="order-common-item">下单时间: {{order.createTime}}</div>
                <div class="vertical-line"></div>
                <div class="order-common-item">用户信息: {{user.name}}(电话号码:{{user.phoneNumber}}-身份证号码:{{user.idCardNumber}})</div>
                <div class="vertical-line"></div>
                <div class="order-common-item">房产地址: 
                    {{'Room ' + order.houseRoomNum + ', ' +
                    'Building ' + order.houseBuildingNum + ', ' + 
                    order.houseStreetNum + ' ' + order.houseStreetName + ' Street, ' + 
                    order.houseAdLevel3 + ', ' + 
                    order.houseAdLevel2 + ', ' +
                    order.houseAdLevel1 + ', ' +
                    order.houseNation}}
                </div>
            </div>
            <div class="order-detail-container">
                <el-input 
                    class="content-input" 
                    v-model="order.content" 
                    type="textarea"
                    :rows="19"
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
                <span class="title-container">订单反馈报告</span>
                <div class="feedback-detail-container">
                    <div style="width: 100%; height: 40px; background: white; display: flex; justify-content: space-around; align-items: center;">
                            <el-radio v-model="recordType" label="rent-record">出租</el-radio>
                            <el-radio v-model="recordType" label="inspect-record">验房</el-radio>
                            <el-radio v-model="recordType" label="repair-record">维修</el-radio>
                    </div>
                    <div v-if="'rent-record' == recordType"
                         style="width: 100%; min-height: 100px; background: whitesmoke; overflow-y: scroll;">
                        <div v-for="item in rentRecords"
                            style="margin-top: 4px; width: 100%; height: 120px; background: white; padding-left: 4px; font-size: 12px; display: flex; flex-direction: column; justify-content: space-around;">
                            <div>创建时间: {{item.createTime}}</div>
                            <div>结算范围: {{item.timeRange.from}}到{{item.timeRange.to}}</div>
                            <div>结算时间: {{item.accountingDate}}</div>
                            <div>结算余额: ¥{{item.balance}}</div>
                            <div>
                                <el-button class="sub-delete-btn" type="danger" @click="onRecordItemClick(recordType, item)">编辑</el-button>
                                <el-button class="sub-delete-btn" type="danger" @click="onRecordDeleteClick(recordType, item)">删除</el-button>
                            </div>
                        </div>
                    </div>
                    <div v-if="'inspect-record' == recordType"
                        style="width: 100%; min-height: 100px; background: whitesmoke; overflow-y: scroll;">
                        <div v-for="item in inspectRecords"
                            style="margin-top: 4px; width: 100%; height: 120px; background: white; padding-left: 4px; font-size: 12px; display: flex; flex-direction: column; justify-content: space-around;">
                            <div>创建时间: {{item.createTime}}</div>
                            <div>验房人员: {{item.inspector}}</div>
                            <div>验房日期: {{item.inspectDate}}</div>
                            <div>备注: {{item.comment}}</div>
                            <div>
                                <el-button class="sub-delete-btn" type="danger" @click="onRecordItemClick(recordType, item)">编辑</el-button>
                                <el-button class="sub-delete-btn" type="danger" @click="onRecordDeleteClick(recordType, item)">删除</el-button>
                            </div>
                        </div>
                    </div>
                    <div v-if="'repair-record' == recordType"
                        style="width: 100%; min-height: 100px; background: whitesmoke; overflow-y: scroll;">
                        <div v-for="item in repairRecords"
                            style="margin-top: 4px; width: 100%; height: 120px; background: white; padding-left: 4px; font-size: 12px; display: flex; flex-direction: column; justify-content: space-around;">
                            <div>创建时间: {{item.createTime}}</div>
                            <div>状态: {{item.status}}</div>
                            <div>备注: {{item.comment}}</div>
                            <div>费用: ¥{{item.cost}}</div>
                            <div>
                                <el-button class="sub-delete-btn" type="danger" @click="onRecordItemClick(recordType, item)">编辑</el-button>
                                <el-button class="sub-delete-btn" type="danger" @click="onRecordDeleteClick(recordType, item)">删除</el-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="feedback-control-container" v-if="isNeedFeedbackControl">
                    <el-button class="feecback-edit-button" type="primary" @click="onAddRecordClick">添加反馈报告</el-button>
                    <div class="compelte-container">
                        <div class="complete-btn-discription">注:点击‘完成订单’后反馈将不能输入</div>
                        <el-button class="complete-button" type="danger" @click="onCompleteClick">完 成 订 单</el-button>
                    </div>
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
import {
    getOrderAsync, 
    modifyOrderAsync, 
    getFeedbacksAsync, 
    queryRecordsAsync,
    addFeedbackAsync, 
    getUserAsync,
    deleteFeedbackAsync,
    deleteRecordAsync} from '../../common/utils.js'
import {convertOrderEntity, convertOrderObject} from '../entity/order.js'
import {convertFeedbackObject} from '../entity/feedback.js'
import {convertFeedbackEntities} from '../entity/feedback.js'
import {convertRentRecordEntities} from '../entity/rent-record.js'
import {convertInspectRecordEntities} from '../entity/inspect-record.js'
import {convertRepairRecordEntities} from '../entity/repair-record.js'
import {convertUserEntity} from '../entity/user.js'
import {textMap} from '../../common/map.js'

export default {
  name: 'OrderEditor',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      order: {},
      user: {},
      textMap: textMap,
      /*extral*/
      isNeedExtralPart: false,
      isNeedFeedback: false,
      isNeedFeedbackControl: false,
      isNeedOperate: false,
      feedbacks: [],
      feedbackContent: '',
      feedbackIncome: 0,
      feedbackOutgoings: 0,
      feedbackAccountingDate: '',
      /*record*/
      recordType: 'rent-record',
      rentRecords: [],
      inspectRecords: [],
      repairRecords: []
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
            getUserAsync(this.order.placerId, res=>{
                console.log('get user aysnc',res);
                this.user = convertUserEntity(res);
                console.log('user converted:', this.user);
            });
        }); 
    }
  },
  methods: {
      onRecordItemClick: function(recordType, item){
          this.$router.push({
              name: 'FeedbackEditor',
              params: {
                  editType: 'edit',
                  recordType: recordType,
                  uid: item.uid
                }
            });
      },
      onRecordDeleteClick: function(recordType, item){
          deleteRecordAsync(recordType, item.uid, res => {
              console.log('deleteRecordAsync');
              this.updateFeedbacks();
          });
      },
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
      checkFeedbackContentCheck: function(){
            var msg = '';
            if(0 == this.feedbackAccountingDate.length){
                msg = '结算日期未选择!';
            }else if(0 == this.feedbackContent.length){
                msg = '反馈内容未输入!';
            }

            if(0 == msg.length){
                return true;
            }else{
                this.$message({
                    message: msg,
                    type: 'warning'
                });
                return false;
            }
            
            returun 
      },
      onFeedbackDeleteClick: function(item){
          console.log('feedback item = ', item);
          deleteFeedbackAsync('')
      },
      onAddRecordClick: function(){
          this.$router.push({name: 'FeedbackEditor', params: {editType: 'add', orderId: this.order.id}});
      },
      onSendFeedbackClick: function(){
          if(!this.checkFeedbackContentCheck()){
              return;
          }
          var feedback = {
              orderId: this.order.id,
              authorId: '001',
              content: this.feedbackContent,
              income: 0 == this.feedbackIncome.length ? 0 : parseFloat(this.feedbackIncome),
              outgoings: 0 == this.feedbackOutgoings.length ? 0 : parseFloat(this.feedbackOutgoings),
              accountingDate: this.feedbackAccountingDate
          };
          console.log('feedback = ', feedback);
          this.sendFeedback(feedback);
      },
      sendFeedback: function(feedback){
          addFeedbackAsync(convertFeedbackObject(feedback), res=>{
              console.log(res);
              this.updateFeedbacks();
          });
      },
      updateFeedbacks: function() {

        queryRecordsAsync('rent-record', this.order.id, 0, 10000, res => {
            console.log('query rent record res = ', res);
            var rentRecords = convertRentRecordEntities(res.entities);
            console.log('rent records = ', rentRecords);
            this.rentRecords = rentRecords;
        });
        queryRecordsAsync('inspect-record', this.order.id, 0, 10000, res => {
            console.log('query inspect record res = ', res);
            var inspectRecords = convertInspectRecordEntities(res.entities);
            console.log('inspect records = ', inspectRecords);
            this.inspectRecords = inspectRecords;
        });
        queryRecordsAsync('repair-record', this.order.id, 0, 10000, res => {
            console.log('query repair record res = ', res);
            var repairRecords = convertRepairRecordEntities(res.entities);
            console.log('repair records = ', repairRecords);
            this.repairRecords = repairRecords;
        })

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
    height: 480px;
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
    // height: 500px;
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
    height: 30px;
    transform: scale(0.95);
    // background: white;
    background: whitesmoke;
    flex-grow: 1;
    overflow-y: scroll;
    border: 1px solid lightgray;
}

.feedback-control-container {
    width: 90%;
    max-height: 300px;
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

.order-info-container {
    width: 90%;
    // background: red;
    display: flex;
    flex-wrap: wrap;
}

.order-common-item {
    min-height: 24px;
    font-size: 12px;
    padding-left: 20px;
    padding-right: 20px;
    // background: lightblue;
}

.vertical-line {
    width: 2px;
    height: 18px;
    background: lightblue;
}

.feedback-item-container {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
}

.feedback-input-container {
    margin-top: 10px;
    background: white;
    width: 100%;
    height: 240px;
    padding: 10px;
    flex-shrink: 0;
    flex-grow: 0;
    display: flex;
    transform: scale(0.9);
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid lightgray;
}

.accounting-date-container {
    width: 100%;
    padding-left: 10px;
}

.send-button {
    width: 80%;
}

.compelte-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    height: 100px;
    transform: scale(0.9);
    background: lightgray;
}

.feecback-delete-button {
    height: 30px;
    width: 60px;
    padding: 0;
}

.sub-delete-btn {
  margin: 4px 0;
  margin-right: 0;
  padding: 0;
  width: 50px;
  height: 24px;
  font-size: 12px;
  margin-right: 10px;
}

</style>
