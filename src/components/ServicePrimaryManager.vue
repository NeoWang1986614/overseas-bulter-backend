<template>
  <div class="wrap">
    <div class="content-scroll-container">
        <div class="content-container">
            <div class="header-container">
                <div style="margin-left: 20px;">服务列表</div>
                <el-button style="margin-right: 20px;" @click="onAddNewClick" type="success">添加</el-button>
            </div>
            <div class="horizontal-line"></div>
            <div class="item-container">
                <div class="item" v-for="item in servicePrimaryArr">
                    <img style="margin-top: 10px; width: 100px; height: 100px;" :src="item.iconUrl"/>
                    <div class="item-content">
                        <div class="sub-item">标题: {{item.title}}</div>
                        <div class="sub-item">关键值: {{item.value}}</div>
                        <div class="sub-item">显示顺序: {{item.location}}</div>
                    </div>
                    <div class="horizontal-line"></div>
                    <div class="item-operate">
                        <el-button class="operate-btn" style="margin-left: 60px;" @click="onEditClick(item)" type="primary">编辑</el-button>
                        <el-button class="operate-btn" @click="onDeleteClick(item)" type="danger">删除</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
    queryServicePrimaryAsync,
    updateServicePrimaryAsync,
    deleteServicePrimaryAsync,
    querySearchServicePrimaryAsync
} from '../../common/utils.js';

export default {
  name: 'ServicePrimaryManager',
  
  created: function(){
      this.updateServicePrimaryArray();
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      servicePrimaryArr: []
    }
  },
  methods:{
    updateServicePrimaryArray: function(){
        querySearchServicePrimaryAsync(0, 10000, res => {
          console.log('create querySearchServicePrimaryAsync res=', res);
          this.servicePrimaryArr = res;
        });
    },
    onAddNewClick: function(){
        console.log('onAddNewClick');
        this.navigateToServicePrimaryEditor();
    },
    onEditClick: function(item){
        console.log('onEditClick');
        console.log(item);
        this.navigateToServicePrimaryEditor({uid: item.uid});
    },
    onDeleteClick: function(item){
        deleteServicePrimaryAsync(item.uid, res=>{
            this.updateServicePrimaryArray();
        });
    },
    navigateToServicePrimaryEditor: function(params) {
      this.$router.push({name: 'ServicePrimaryEditor', params: params});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
    background: lightgreen;
    display: flex;
    flex-direction: column;
}

.content-scroll-container {
    width: 100%;
    height: 100%;
    background: whitesmoke;
    overflow-y: scroll;
}

.content-container {
    margin: 0 auto;
    width: 90%;
    min-height: 100px;
    background: whitesmoke;
}

.horizontal-line {
    width: 100%;
    height: 2px;
    background: lightblue;
}

.header-container {
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
}

.item-container {
    width: 98%;
    min-height: 100px;
    background: green;
    margin: 0 auto;
    margin-top: 10px;
    background: whitesmoke;
    display: flex;
    flex-wrap: wrap;
}

.item {
    width: 200px;
    height: 250px;
    background: white;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item-content {
    width: 100%;
    height: 100px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
}

.item-operate {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.operate-btn {
    font-size: 10px;
    padding:0;
    width: 60px;
    height: 30px;
}

.sub-item {
    padding-left: 10px;
    height: 24px;
    line-height: 24px;
    // background: green;
    display: -webkit-box;    
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 1;    
    overflow: hidden;
    font-size: 12px;
}

</style>
