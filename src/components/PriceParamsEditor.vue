<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/price-params-manager' }">价格参数管理</el-breadcrumb-item>
            <el-breadcrumb-item>价格参数编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content-scroll-container">
        <div class="content-container">
            <div class="selector-container">
                <span style="margin-right: 10px;">服务:</span>
                <el-dropdown>
                    <span class="el-dropdown-link" style="cursor: pointer;">
                        {{constInvalidIndex == servicePrimaryCurrentIndex ? '未选择' : servicePrimaryArr[servicePrimaryCurrentIndex].title}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in servicePrimaryArr" 
                        :key="item.uid" 
                        @click.native="onServicePrimarySelect(index)">
                            {{item.title}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="selector-container">
                <span style="margin-right: 10px;">户型:</span>
                <el-dropdown>
                    <span class="el-dropdown-link" style="cursor: pointer;">
                        {{constInvalidIndex == layoutCurrentIndex ? '未选择' : layoutArr[layoutCurrentIndex].title}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in layoutArr" 
                        :key="item.uid" 
                        @click.native="onLayoutSelect(index)">
                            {{item.title}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="selector-container">
                <span style="margin-right: 10px;">算法类型选择:</span>
                <el-dropdown>
                    <span class="el-dropdown-link" style="cursor: pointer;">
                        {{constInvalidIndex == algorithmTypeCurrentIndex ? '未选择' : algorithmTypeArr[algorithmTypeCurrentIndex]}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in algorithmTypeArr" 
                        :key="index" 
                        @click.native="onAlgorithmTypeSelect(index)">
                            {{item}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="params-container" v-if="0 == algorithmTypeCurrentIndex">
                算法1参数:
                <el-input 
                    class="input-container" 
                    v-model="homeDecorationParams.baseArea" 
                    type="text"
                    resize="none"
                    placeholder="请输入基本面积">
                        <template slot="prepend">基本面积:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="homeDecorationParams.baseFee" 
                    type="text"
                    resize="none"
                    placeholder="请输入基本费用">
                        <template slot="prepend">基本费用:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="homeDecorationParams.stepArea" 
                    type="text"
                    resize="none"
                    placeholder="请输入步进面积">
                        <template slot="prepend">步进面积:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="homeDecorationParams.stepFee" 
                    type="text"
                    resize="none"
                    placeholder="请输入步进费用">
                        <template slot="prepend">步进费用:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="homeDecorationParams.discount" 
                    type="text"
                    resize="none"
                    placeholder="请输入折扣">
                        <template slot="prepend">折扣:</template>
                </el-input>
            </div>
            <div class="params-container" v-if="1 == algorithmTypeCurrentIndex">
                算法2参数:
                <el-input 
                    class="input-container" 
                    v-model="houseMaintainParams.feePerYear" 
                    type="text"
                    resize="none"
                    placeholder="请输入每年基本费用">
                        <template slot="prepend">每年费用:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="houseMaintainParams.timeNodes" 
                    type="text"
                    resize="none"
                    placeholder="请输入优惠折扣时间期节点数组">
                        <template slot="prepend">优惠折扣时间节点:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="houseMaintainParams.discounts" 
                    type="text"
                    resize="none"
                    placeholder="请输入优惠折扣数组">
                        <template slot="prepend">优惠折扣:</template>
                </el-input>
            </div>
            
            <div class="operate-container">
                <el-button style="width: 100px;" @click="onSaveClick" type="success">{{isEdit ? '修改':'保存'}}</el-button>
                <el-button style="width: 100px; float: left; margin-left: 100px;" @click="onCancelClick" type="info">取消</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
    addPriceParamsAsync,
    queryPriceParamsAsync,
    updatePriceParamsAsync,
    deletePriceParamsAsync,
    querySearchLayoutAsync,
    querySearchServicePrimaryAsync,
    querySearchPriceParamsAsync
} from '../../common/utils.js';

import { number_max_value } from '../../common/const.js';


export default {
  name: 'PriceParamsEditor',
  created: function(){
      if(this.$route.params.hasOwnProperty('uid')){
        console.log(this.$route.params['uid']);
        this.priceParamsUid = this.$route.params['uid'];
        this.isEdit = true;
        queryPriceParamsAsync(this.priceParamsUid, res => {
            console.log('price params res = ', res);
            this.priceParams = res;
            this.updateServicesAndLayouts(_=>{
                this.initInfo();
            });
        });
     }else{
         this.updateServicesAndLayouts();
     }
    
  },
  data () {
    return {
        priceParamsUid: '',
        priceParams: {
            serviceId: '',
            layoutId: '',
            algorithmType: '',
            params: '',
            meta: '',
        },
        constInvalidIndex: number_max_value,
        isEdit: false,
        servicePrimaryArr: [],
        servicePrimaryCurrentIndex: number_max_value,
        layoutArr: [],
        layoutCurrentIndex: number_max_value,


        algorithmTypeArr: ['算法1','算法2'],
        algorithmTypeCurrentIndex: number_max_value,

        /*家装费用算法*/
        homeDecorationParams:{
            baseArea: '',
            baseFee: '',
            stepArea: '',
            stepFee: '',
            discount: ''
        },
        /*保养费用算法*/
        houseMaintainParams:{
            feePerYear: '',
            timeNodes: '',
            discounts: ''
        }
    }
  },
  methods:{
    getIndexByUidInArr: function(uid, arr){
        if('' == uid || 0 == arr){
            return -1;
        }
        for(var i=0; i < arr.length; i++){
            if(uid == arr[i].uid){
                return i;
            }
        }
        return -1;
    },
    initInfo: function(){
        this.servicePrimaryCurrentIndex = this.getIndexByUidInArr(this.priceParams.serviceId, this.servicePrimaryArr);
        this.layoutCurrentIndex = this.getIndexByUidInArr(this.priceParams.layoutId, this.layoutArr);
        this.algorithmTypeCurrentIndex = parseInt(this.priceParams.algorithmType);
        this.parseParams();
    },
    updateServicesAndLayouts: function(callback){
        querySearchServicePrimaryAsync(0, 10000, res=>{
            console.log('query search service primary = ',res);
            this.servicePrimaryArr = res;
            querySearchLayoutAsync(0, 10000, res1=>{
                console.log('query search layout = ',res1);
                this.layoutArr = res1;
                if(callback){
                    callback();
                }
            });
        });
    },
    onServicePrimarySelect: function(index){
      this.servicePrimaryCurrentIndex = index;  
    },
    onLayoutSelect: function(index){
      this.layoutCurrentIndex = index;  
    },
    onAlgorithmTypeSelect: function(index){
      this.algorithmTypeCurrentIndex = index;  
    },
    makeParams: function(){
        var ret =  '';
        if(0==this.algorithmTypeCurrentIndex){
            ret = this.convertHomeDecorationParamsJsonString();
        }else{
            ret = this.convertHouseMaintainParamsJsonString();
        }
        return ret;
    },
    parseParams: function(){
        var paramsObj = JSON.parse(this.priceParams.params);
        if(0 == this.algorithmTypeCurrentIndex){
            this.homeDecorationParams = paramsObj;
        }else{
            this.houseMaintainParams = paramsObj;
            this.houseMaintainParams.timeNodes = paramsObj.timeNodes.join(',');
            this.houseMaintainParams.discounts = paramsObj.discounts.join(',');
        }
    },
    convertHomeDecorationParamsJsonString: function(){
        console.log('this.homeDecorationParams=', this.homeDecorationParams);
        var ret = {
         baseArea: this.textToFloat(this.homeDecorationParams.baseArea),
         baseFee: this.textToFloat(this.homeDecorationParams.baseFee),
         stepArea: this.textToFloat(this.homeDecorationParams.stepArea),
         stepFee: this.textToFloat(this.homeDecorationParams.stepFee),
         discount: this.textToFloat(this.homeDecorationParams.discount)
        }
        console.log('ret=', ret);
        return JSON.stringify(ret);

    },
    convertHouseMaintainParamsJsonString: function(){
        var ret = {
         feePerYear: this.textToFloat(this.houseMaintainParams.feePerYear),
         timeNodes: this.textParseToArray(this.houseMaintainParams.timeNodes),
         discounts: this.textParseToArray(this.houseMaintainParams.discounts),
        }
        return JSON.stringify(ret);
    },
    textParseToArray: function(text){
         var originArr = text.split(',');
         var ret = [];
         if(0 != originArr.length){
            for(var i=0; i<originArr.length; i++){
                ret.push(this.textToFloat(originArr[i]));
            }
         }
         return ret;
    },
    textToFloat: function(text){
        return Number(parseFloat(text).toFixed(2));
    },
    makePriceParams: function(){
        console.log('service id = ', this.servicePrimaryArr[this.servicePrimaryCurrentIndex]);
        this.priceParams.serviceId = this.servicePrimaryArr[this.servicePrimaryCurrentIndex].uid;
        this.priceParams.layoutId = this.layoutArr[this.layoutCurrentIndex].uid;
        this.priceParams.algorithmType = '' + this.algorithmTypeCurrentIndex;
        this.priceParams.params = this.makeParams();
    },
    onSaveClick: function(){
        this.makePriceParams();
        console.log('price params entity = ', this.priceParams);
        if(this.isEdit){
            this.updatePriceParams();
        }else{
            this.addPriceParams();
        }
    },
    onCancelClick: function(){
        this.$router.back(-1);
    },
    addPriceParams: function(){
        addPriceParamsAsync(this.priceParams, res=>{
            this.addPriceParamsSuccessWithRes(res);
        });
    },
    updatePriceParams: function(){
        this.priceParams.uid = this.priceParamsUid;
        updatePriceParamsAsync(this.priceParams, res=>{
            this.updatePriceParamsSuccessWithRes(res);
        });
    },
    notifyMessage: function(msg){
        this.$message({
            message: msg,
            type: 'success'
        });
    },
    warningMessage: function(msg){
        this.$message({
            message: msg,
            type: 'warning'
        });
    },
    addPriceParamsSuccessWithRes: function(res){
        console.log('add layout res=', res);
        if(0==res.code){
            this.notifyMessage('保存成功');
            setTimeout(_=>{
                this.$router.back(-1);
            },1500);
        }else{
            this.warningMessage('保存出错!');
        }
    },
    updatePriceParamsSuccessWithRes: function(res){
        if(0==res.code){
            this.notifyMessage('修改成功');
            setTimeout(_=>{
                this.$router.back(-1);
            },1500);
        }else{
            this.warningMessage('修改出错!');
        }
    },
    beforeFileUpload(file) {
        console.log('upload file = ', file);
        // const isJPG = file.type === 'image/jpeg';
        // const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG && !isPNG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        // return (isJPG || isPNG) && isLt2M;
        return isLt2M;
    },
    onFileUploadSuccess(res, file){
      console.log('upload file success url = ', res.path);
      this.homeDecorationAttachment = res.path;
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

.content-scroll-container {
    width: 100%;
    height: 100%;
    background: whitesmoke;
    overflow-y: scroll;
}

.content-container {
    width: 600px;
    margin: 0 auto;
    min-height: 100px;
    // background: lightgreen;
}

.input-container {
    width: 100%;
    margin-top: 20px;
}

.operate-container {
    width: 100%;
    height: 80px;
    // background: pink;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
}

.file-uploader {
    margin-left: 10px;
    width: 80px;
    height: 80px;
    border: 2px dashed gray;
    border-radius: 10px;
}

.file-uploader-container {
    margin-top: 10px;
    width: 100%;
    min-height: 100px;
    // background: lightgreen;
    font-size: 14px;
    color: gray;
    border-radius: 10px;
    border: 1px solid lightgray;
}

.selector-container {
    width: 100%;
    height: 40px;
    // background: lightgreen;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: gray;
}

.params-container {
    margin-top: 10px;
    width: 100%;
    min-height: 100px;
    // background: lightgreen;
    font-size: 14px;
    color: gray;
}

.input-container {
    width: 100%;
}

</style>
