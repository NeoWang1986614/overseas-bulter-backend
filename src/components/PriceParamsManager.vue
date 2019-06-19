<template>
  <div class="wrap">
    <div class="content-scroll-container">
        <div class="content-container">
            <div class="header-container">
                <div style="margin-left: 20px;">价格计算方法参数列表</div>
                <el-button style="margin-right: 20px;" @click="onAddNewClick" type="success">添加</el-button>
            </div>
            <div class="horizontal-line"></div>
            <div class="item-container">
                <div class="item" v-for="item in priceParamsArr">
                    <div class="item-content">
                        <div class="sub-item">服务: {{serviceTitle(item.serviceId)}}</div>
                        <div class="sub-item">户型: {{layoutTitle(item.layoutId)}}</div>
                        <div class="sub-item">算法类型: {{item.algorithmType}}</div>
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
    queryPriceParamsAsync,
    updatePriceParamsAsync,
    deletePriceParamsAsync,
    querySearchPriceParamsAsync,
    querySearchServicePrimaryAsync,
    querySearchLayoutAsync,
} from '../../common/utils.js';

export default {
  name: 'PriceParamsManager',
  
  created: function(){
      this.updatePriceParamsArray();
      querySearchServicePrimaryAsync(0, 10000, res=>{
          console.log('service primary Arr = ', res);
          this.servicePrimaryArr = res;
      });
      querySearchLayoutAsync(0, 10000, res=>{
          console.log('layout Arr = ', res);
          this.layoutArr = res;
      });
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      priceParamsArr: [],
      servicePrimaryArr: [],
      layoutArr: [],
    }
  },
  methods:{
    serviceTitle: function(serviceId){
        if(0 == this.servicePrimaryArr.length){
            return '';
        }
        return this.getItemByUid(serviceId, this.servicePrimaryArr).title;
    },
    layoutTitle: function(layoutId){
        if(0 == this.layoutArr.length){
            return '';
        }
        return this.getItemByUid(layoutId, this.layoutArr).title;
    },
    getItemByUid: function(uid, arr){
        if(0 == arr.length){
            return null;
        }

        for(var i=0; i<arr.length;i++){
            if(uid == arr[i].uid){
                return arr[i];
            }
        }
    },
    updatePriceParamsArray: function(){
        querySearchPriceParamsAsync(0, 10000, res => {
          console.log('querySearchPriceParamsAsync res=', res);
          this.priceParamsArr = res;
        });
    },
    onAddNewClick: function(){
        console.log('onAddNewClick');
        this.navigateToPriceParamsEditor();
    },
    onEditClick: function(item){
        console.log('onEditClick');
        this.navigateToPriceParamsEditor({uid: item.uid});
    },
    onDeleteClick: function(item){
        console.log('delete price params item = ', item);
        deletePriceParamsAsync(item.uid, res=>{
            this.updatePriceParamsArray();
        });
    },
    navigateToPriceParamsEditor: function(params) {
      this.$router.push({name: 'PriceParamsEditor', params: params});
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
    height: 200px;
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
    height: 30px;
    line-height: 30px;
    // background: green;
    font-size: 12px;
}

</style>
