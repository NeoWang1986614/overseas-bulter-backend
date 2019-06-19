<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{path: '/order-manager'}">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{name: 'OrderEditor', params: {id: orderId}}">订单编辑</el-breadcrumb-item>
            <el-breadcrumb-item>反馈编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="main-container">
      <div class="type-selector-container">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{textMap[recordTypeOptions[recordTypeCurrentIndex]]}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, index) in recordTypeOptions" 
                :key="item" 
                :disabled="'edit' == editType"
                @click.native="onRecordTypeSelect(index)">
                    {{textMap[item]}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="edit-container">
        <div class="record-container" v-if="'billing-record' == recordTypeOptions[recordTypeCurrentIndex]">
          <el-collapse style="padding: 0 10px;">
            <el-collapse-item :title="incomeTotalTitle" name="1">
              <div class="sub-item-container" v-for="(item, index) in incomeItems">
                <div style="display: flex; align-items: center;">
                  {{item.title}}
                  <span style="margin-left: 20px">¥{{item.amount}}</span>
                </div>
                <el-button class="sub-delete-btn" type="danger" @click="onItemDeleteClick(incomeItems, index)">删除</el-button>
              </div>
              <div style="margin-top: 10px;">
                <el-input 
                    class="input-container" 
                    v-model="newIncomeItem.title" 
                    type="text"
                    resize="none"
                    placeholder="请输入费用项">
                        <template slot="prepend">费用项:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="newIncomeItem.amount" 
                    type="number"
                    resize="none"
                    placeholder="请输入数额">
                        <template slot="prepend">数额(两位小数):</template>
                </el-input>
                <el-button style="width: 70px; height: 30px; padding: 0; font-size: 10px;" type="primary" @click="checkFeeItemValid(newIncomeItem) ? onItemAddClick(incomeItems ,newIncomeItem, initIncomeNewItem) : null">确定添加</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="outgoingsTotalTitle" name="2">
              <div class="sub-item-container" v-for="(item, index) in outgoingsItems">
                <div style="display: flex; align-items: center;">
                  {{item.title}}
                  <span style="margin-left: 20px">¥{{item.amount}}</span>
                </div>
                <el-button class="sub-delete-btn" type="danger" @click="onItemDeleteClick(outgoingsItems, index)">删除</el-button>
              </div>
              <div style="margin-top: 10px;">
                <el-input 
                    class="input-container" 
                    v-model="newOutgoingsItem.title" 
                    type="text"
                    resize="none"
                    placeholder="请输入费用项">
                        <template slot="prepend">费用项:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model.number="newOutgoingsItem.amount" 
                    type="number"
                    step="0.01"
                    resize="none"
                    placeholder="请输入数额">
                        <template slot="prepend">数额(两位小数):</template>
                </el-input>
                <el-button style="width: 70px; height: 30px; padding: 0; font-size: 10px;" type="primary" @click="checkFeeItemValid(newOutgoingsItem) ? onItemAddClick(outgoingsItems, newOutgoingsItem, initOutgoingsNewItem) : null">确定添加</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item :title="balanceTitle" name="3">
            </el-collapse-item>
            <el-collapse-item title="结算时间范围" name="4">
              <el-date-picker
                style="transform: scale(0.8)"
                v-model="timeRange.from"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
              -
              <el-date-picker
                style="transform: scale(0.8)"
                v-model="timeRange.to"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-collapse-item>
            <el-collapse-item title="结算日期" name="5">
              <el-date-picker
                  style="transform: scale(0.8)"
                  v-model="rentRecord.accountingDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
              </el-date-picker>
            </el-collapse-item>
            <el-collapse-item title="概述说明" name="6">
              <el-input 
                  style="height: 120px; width: 100%;"
                  class="input-container" 
                  v-model="rentRecord.comment" 
                  type="textarea"
                  rows="4"
                  resize="none"
                  placeholder="请输入备注">
              </el-input>
            </el-collapse-item>
          </el-collapse>
          <div class="button-container">
            <el-button 
              type="primary" 
              @click="onConfirmClick()">
              {{'edit' == this.editType ? '确定修改' : '确定添加'}}
            </el-button>
          </div>
        </div>
        <div class="record-container" v-if="'inspect-record' == recordTypeOptions[recordTypeCurrentIndex]">
          <el-collapse style="padding: 0 10px;">
            <el-collapse-item title="验房人员" name="1">
              <div style="margin-top: 10px;">
                <el-input 
                    class="input-container" 
                    v-model="inspectRecord.inspector" 
                    type="text"
                    resize="none"
                    placeholder="请输入验房人员姓名">
                </el-input>
              </div>
            </el-collapse-item>
            <el-collapse-item title="验房日期" name="2">
              <div style="margin-top: 10px;">
                <el-date-picker
                  style="transform: scale(0.8)"
                  v-model="inspectRecord.inspectDate"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
              </el-date-picker>
              </div>
            </el-collapse-item>
            <el-collapse-item title="概述说明" name="3">
              <el-input 
                  style="height: 120px; width: 100%;"
                  class="input-container" 
                  v-model="inspectRecord.comment" 
                  type="textarea"
                  rows="4"
                  resize="none"
                  placeholder="请输入备注">
              </el-input>
            </el-collapse-item>
            <el-collapse-item title="配置" name="4">
              <div class="sub-item-container" style="height: 30px;" v-for="(item, index) in configItems">
                <div style="display: flex; align-items: center;">
                  <div class="config-sub-item-container">
                    {{item.title}}
                    <el-switch
                        style="font-size: 10px;"
                        v-model="item.is_installed"
                        :active-value="1"
                        :inactive-value="0"
                        @change="onConfigItemIsInstalledChange(item, $event)"
                        active-text="已安装"
                        inactive-text="未安装">
                    </el-switch>
                  </div>
                </div>
                <el-button v-if="index >= configFixedAmount" class="sub-delete-btn" type="danger" @click="onItemDeleteClick(configItems, index)">删除</el-button>
              </div>
              <div class="sub-item-container">
                <el-input 
                    style="transform: scale(0.8); height: 100%; width:300px;"
                    v-model="configNewItem.title" 
                    type="text"
                    resize="none"
                    placeholder="请输入要添加的项">
                </el-input>
                <el-button style="margin-right: 90px; margin-top: 6px; width: 70px; height: 30px; padding: 0; font-size: 10px;" type="primary" @click="checkConfigItemValid(configNewItem) ? onItemAddClick(configItems ,configNewItem, initConfigNewItem) : null">确定添加</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item title="区域图片" name="5">
              <div class="sub-item-container" style="height: 30px; overflow: hidden; display: flex; justify-content: space-between;" v-for="(item, index) in areaItems">
                <div style="height: 100%; display: flex; align-items: center;">
                {{item.title}}-{{item.desc}}-<img :src="urlitem" style="height: 24px; width: 24px; margin-left: 4px;" v-for="urlitem in item.urls" />
                </div>
                <el-button class="sub-delete-btn" type="danger" @click="onItemDeleteClick(configItems, index)">删除</el-button>
              </div>
              <el-input 
                  style="transform: scale(0.8); height: 100%; width:300px; margin-top: 20px;"
                  v-model="areaNewItem.title" 
                  type="text"
                  resize="none"
                  placeholder="请输入要添加的区域">
              </el-input>
              <el-input 
                  style="transform: scale(0.8); height: 100%; width:300px;"
                  v-model="areaNewItem.desc" 
                  type="text"
                  resize="none"
                  placeholder="请输入简短描述">
              </el-input>
              <div class="image-container">
                   <div class="image-item-container" v-for="(item, index) in areaNewItem.urls">
                      <img :src="item" style="height: 80px; width: 100%" />
                      <el-button class="sub-delete-btn" style="margin-top: 10px;" type="danger" @click="onImageDeleteClick(areaNewItem.urls, index)">删除</el-button>
                   </div>
                   <el-upload
                    v-if="3 > areaNewItem.urls.length"
                    class="image-uploader"
                    :action="imgUploadUrl"
                    :show-file-list="false"
                    :on-success="onAreaImageUploadSuccess"
                    :before-upload="beforeImageUpload">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
              </div>
              <el-button style="margin-right: 90px; margin-top: 6px; width: 70px; height: 30px; padding: 0; font-size: 10px;" type="primary" @click="checkAreaItemValid(areaNewItem) ? onItemAddClick(areaItems ,areaNewItem, initAreaNewItem) : null">确定添加</el-button>
            </el-collapse-item>
          </el-collapse>
          <div class="button-container">
            <el-button 
              type="primary" 
              @click="onConfirmClick()">
              {{'edit' == this.editType ? '确定修改' : '确定添加'}}
            </el-button>
          </div>
        </div>
        <div class="record-container" v-if="'repair-record' == recordTypeOptions[recordTypeCurrentIndex]">
          <el-collapse style="padding: 0 10px;">
            <el-collapse-item title="报修时间" name="1">
              <div style="margin-top: 10px;">
                <el-date-picker
                  style="transform: scale(0.8)"
                  v-model="repairRecord.reportTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
              </el-date-picker>
              </div>
            </el-collapse-item>
            <el-collapse-item title="维修开始时间" name="2">
              <div style="margin-top: 10px;">
                <el-date-picker
                  style="transform: scale(0.8)"
                  v-model="repairRecord.repairTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
              </el-date-picker>
              </div>
            </el-collapse-item>
            <el-collapse-item title="维修完成时间" name="3">
              <div style="margin-top: 10px;">
                <el-date-picker
                  style="transform: scale(0.8)"
                  v-model="repairRecord.completeTime"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间">
              </el-date-picker>
              </div>
            </el-collapse-item>
            <el-collapse-item title="概述说明" name="4">
              <el-input 
                  style="height: 120px; width: 100%;"
                  class="input-container" 
                  v-model="repairRecord.comment" 
                  type="textarea"
                  rows="4"
                  resize="none"
                  placeholder="请输入简短说明">
              </el-input>
            </el-collapse-item>
            <el-collapse-item title="费用" name="5">
              <el-input 
                  class="input-container" 
                  v-model.number="repairRecord.cost" 
                  type="number"
                  resize="none"
                  placeholder="请输入费用数额(两位小数)">
              </el-input>
            </el-collapse-item>
            <el-collapse-item title="当前维修状态" name="6">
              <el-input 
                  class="input-container" 
                  v-model.number="repairRecord.status" 
                  type="text"
                  resize="none"
                  placeholder="请输入当前状态">
              </el-input>
            </el-collapse-item>
            <el-collapse-item title="相关图片" name="7">
              <div class="sub-item-container" style="height: 30px; overflow: hidden; display: flex; justify-content: space-between;" v-for="(item, index) in relatedImages">
                <div style="height: 100%; display: flex; align-items: center;">
                {{item.title}}-{{item.desc}}-<img :src="urlitem" style="height: 24px; width: 24px; margin-left: 4px;" v-for="urlitem in item.urls" />
                </div>
                <el-button class="sub-delete-btn" type="danger" @click="onItemDeleteClick(relatedImages, index)">删除</el-button>
              </div>
              <el-input 
                  style="transform: scale(0.8); height: 100%; width:300px; margin-top: 20px;"
                  v-model="relatedNewImage.title" 
                  type="text"
                  resize="none"
                  placeholder="请输入要添加图片名字">
              </el-input>
              <el-input 
                  style="transform: scale(0.8); height: 100%; width:300px;"
                  v-model="relatedNewImage.desc" 
                  type="text"
                  resize="none"
                  placeholder="请输入简短描述">
              </el-input>
              <div class="image-container">
                   <div class="image-item-container" v-for="(item, index) in relatedNewImage.urls">
                      <img :src="item" style="height: 80px; width: 100%" />
                      <el-button class="sub-delete-btn" style="margin-top: 10px;" type="danger" @click="onImageDeleteClick(relatedNewImage.urls, index)">删除</el-button>
                   </div>
                   <el-upload
                    v-if="1 > relatedNewImage.urls.length"
                    class="image-uploader"
                    :action="imgUploadUrl"
                    :show-file-list="false"
                    :on-success="onRepairImageUploadSuccess"
                    :before-upload="beforeImageUpload">
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
              </div>
              <el-button style="margin-right: 90px; margin-top: 6px; width: 70px; height: 30px; padding: 0; font-size: 10px;" type="primary" @click="checkRelatedImageItemValid(relatedNewImage) ? onItemAddClick(relatedImages ,relatedNewImage, initRelatedNewImage) : null">确定添加</el-button>
            </el-collapse-item>
          </el-collapse>
          <div class="button-container">
            <el-button 
              type="primary" 
              @click="onConfirmClick()">
              {{'edit' == this.editType ? '确定修改' : '确定添加'}}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {textMap} from '../../common/map.js'
import {convertBillingRecordEntity, convertBillingRecordObject} from '../entity/billing-record.js'
import {convertInspectRecordEntity, convertInspectRecordObject} from '../entity/inspect-record.js'
import {convertRepairRecordEntity, convertRepairRecordObject} from '../entity/repair-record.js'
import {
    getRecordAsync,
    addRecordAsync,
    updateRecordAsync} from '../../common/utils.js'
import {preUrl} from '../../config/http.js'

export default {
  name: 'FeedbackEditor',
  data () {
    return {
      editType: '',
      recordId: '',
      imgUploadUrl: preUrl + '/overseas-bulter/v1/image',
      textMap: textMap,
      msg: 'Welcome to Your Vue.js App',
      orderId: '',
      /*类型选择*/
      recordTypeOptions: [
        'billing-record',
        'inspect-record',
        'repair-record'
      ],
      recordTypeCurrentIndex: 0,
      /*出租报告*/
      rentRecord:{},
      newIncomeItem: {},
      incomeItems: [
      ],
      newOutgoingsItem: {},
      outgoingsItems: [
      ],
      timeRange:{},
      /*验房报告*/
      inspectRecord:{},
      configFixedAmount: 11,
      configItems: [
        {
          title: '内部通话装置',
          is_installed: 0
        },
        {
          title: '电话信号接口',
          is_installed: 0
        },
        {
          title: '电视信号接口',
          is_installed: 0
        },
        {
          title: '照明设备',
          is_installed: 0
        },
        {
          title: '烤箱',
          is_installed: 0
        },
        {
          title: '抽油烟机',
          is_installed: 0
        },
        {
          title: '电炉灶',
          is_installed: 0
        },
        {
          title: '洗碗机',
          is_installed: 0
        },
        {
          title: '窗户',
          is_installed: 0
        },
        {
          title: '门',
          is_installed: 0
        },
        {
          title: '窗帘',
          is_installed: 0
        },
      ],
      configNewItem: {
        title: '',
        is_installed: 0
      },
      areaItems:[
      ],
      areaNewItem: {
        title: '',
        desc: '',
        urls: []
      },
      /*维修报告*/
      repairRecord:{},
      relatedImages:[],
      relatedNewImage:{
        title: '',
        desc: '',
        urls: [
        ]
      }
    }
  },
  created: function() {
    console.log('record editor is created');
    if(this.$route.params.hasOwnProperty('editType')){
        this.editType = this.$route.params['editType'];
        console.log('editType =', this.editType);
    }
    if(this.$route.params.hasOwnProperty('orderId')){
        this.orderId = this.$route.params['orderId'];
        console.log('orderId =', this.orderId);
    }
    if(this.$route.params.hasOwnProperty('uid')){
        this.recordId = this.$route.params['uid'];
        console.log('recordId =', this.recordId);
    }
    if(this.$route.params.hasOwnProperty('recordType')){
        this.recordTypeCurrentIndex = this.recordTypeOptions.indexOf(this.$route.params['recordType']);
        console.log('recordTypeCurrentIndex =', this.recordTypeCurrentIndex);
    }
    var recordType = this.recordTypeOptions[this.recordTypeCurrentIndex];
    if('edit' == this.editType){
      getRecordAsync(recordType, this.recordId, res => {
        console.log('get record in edit type =', res);
        if('billing-record' ==  recordType){
          this.rentRecord = convertBillingRecordEntity(res);
          this.orderId = this.rentRecord.orderId;
          console.log('billing record object = ', this.rentRecord);
          this.incomeItems = this.rentRecord.income;
          this.outgoingsItems = this.rentRecord.outgoings;
          this.timeRange = this.rentRecord.timeRange;
        }else if('inspect-record' ==  recordType){
          this.inspectRecord = convertInspectRecordEntity(res);
          this.orderId = this.inspectRecord.orderId;
          console.log('insepctRecord object = ', this.inspectRecord);
          this.configItems = this.inspectRecord.config;
          this.areaItems = this.inspectRecord.area;
        }else if('repair-record' ==  recordType){
          this.repairRecord = convertRepairRecordEntity(res);
          this.orderId = this.repairRecord.orderId;
          console.log('repairRecord object = ', this.repairRecord);
          this.relatedImages = this.repairRecord.relatedImage;
        }
      });
    }
  },
  computed: {
    incomeTotalTitle: function(){
      return '收入(CNY) - 总额:¥' + this.getTotal(this.incomeItems).toFixed(2);
    },
    outgoingsTotalTitle: function(){
      return '支出(CNY) - 总额:¥' + this.getTotal(this.outgoingsItems).toFixed(2);
    },
    balanceTitle: function(){
      return '结余(CNY) - 总额:¥' + this.balance();
    }
  },
  methods: {
    getTotal: function(items){
      var total = 0.0;
      if(0 != items.length){
        for(let i=0; i<items.length; i++){
          total += items[i].amount;
        }
      }
      return total;
    },
    balance: function(){
      return (this.getTotal(this.incomeItems) - this.getTotal(this.outgoingsItems)).toFixed(2);
    },
    onRecordTypeSelect: function(index){
      this.recordTypeCurrentIndex = index;
    },
    onConfigItemIsInstalledChange: function(item, event){
      console.log('event = ', event);
      item.is_installed = event;
      // item.is_installed = !item.is_installed;
    },
    sendSuccessNotify(message) {
      this.$message({
          message: message,
          type: 'success'
      }); 
    },
    sendWarningNotify(message) {
      this.$message({
          message: message,
          type: 'warning'
      }); 
    },
    navigateToOrderEditor: function() {
      this.$router.push({name: 'OrderEditor', params: {id: this.orderId}});
    },
    checkFeeItemValid: function(item){
      if(undefined == item.title || 0 == item.title.length || undefined == item.amount || 0 == item.amount.length){
        return false;
      }
      return true;
    },
    initIncomeNewItem: function(){
      this.newIncomeItem.title = '';
      this.newIncomeItem.amount = 0;
    },
    initOutgoingsNewItem: function(){
      this.newOutgoingsItem.title = '';
      this.newOutgoingsItem.amount = 0;
    },
    checkConfigItemValid: function(item){
      if(undefined == item.title || 0 == item.title.length){
        return false;
      }
      return true;
    },
    initConfigNewItem: function(){
      this.configNewItem.title = '';
      this.configNewItem.is_installed = 0;
    },
    checkAreaItemValid: function(item){
      if(undefined == item.title || 0 == item.title.length || 
          undefined == item.desc || 0 == item.desc.length){
        return false;
      }
      return true;
    },
    initAreaNewItem: function(){
      this.areaNewItem.title = '';
      this.areaNewItem.desc = '';
      this.areaNewItem.urls = [];
    },
    checkRelatedImageItemValid: function(item){
      console.log('checkRelatedImageItemValid = ', item);
      if(undefined == item.title || 0 == item.title.length || 
          undefined == item.desc || 0 == item.desc.length){
        return false;
      }
      return true;
    },
    initRelatedNewImage: function(){
      this.relatedNewImage.title = '';
      this.relatedNewImage.desc = '';
      this.relatedNewImage.urls = [];
    },
    onItemAddClick: function(items, newItem, initFunc){
      console.log('onItemAddClick');
      newItem.amount = Number(parseFloat(newItem.amount).toFixed(2));
      console.log(JSON.stringify(newItem));
      items.push(JSON.parse(JSON.stringify(newItem)));//深copy
      if(initFunc){
          initFunc();
      }
    },
    onItemDeleteClick: function(items, index){
      items.splice(index, 1);
    },
    onAreaImageUploadSuccess(res, file){
      console.log('upload image success url = ', res.path);
      this.areaNewItem.urls.push(res.path);
    },
    onRepairImageUploadSuccess(res, file){
      console.log('upload image success url = ', res.path);
      this.relatedNewImage.urls.push(res.path);
    },
    onImageDeleteClick(urls, index){
      if(null != urls && 0 != urls.length){
        urls.splice(index, 1);
      }
    },
    rentRecordObjectValidCheck(){
      if(undefined == this.timeRange.from || 0 == this.timeRange.from.length){
        this.sendWarningNotify('未选择完整结算时间范围!');
        return false;
      }
      if(undefined == this.timeRange.to || 0 == this.timeRange.to.length){
        this.sendWarningNotify('未选择完整结算时间范围!');
        return false;
      }
      if(undefined == this.rentRecord.accountingDate || 0 == this.rentRecord.accountingDate.length){
        this.sendWarningNotify('未选择结算日期!');
        return false;
      }
      if(undefined == this.rentRecord.comment || 0 == this.rentRecord.comment.length){
        this.sendWarningNotify('未填写概述说明!');
        return false;
      }
      return true;
    },
    inspectRecordObjectValidCheck(){
      if(undefined == this.inspectRecord.inspector || 0 == this.inspectRecord.inspector.length){
        this.sendWarningNotify('未填写验房人员!');
        return false;
      }
      if(undefined == this.inspectRecord.inspectDate || 0 == this.inspectRecord.inspectDate.length){
        this.sendWarningNotify('未选择验房日期!');
        return false;
      }
      if(undefined == this.inspectRecord.comment || 0 == this.inspectRecord.comment.length){
        this.sendWarningNotify('未填写概述说明!');
        return false;
      }
      return true;
    },
    repairRecordObjectValidCheck(){
      if(undefined == this.repairRecord.reportTime || 0 == this.repairRecord.reportTime.length){
        this.sendWarningNotify('未选择报修时间!');
        return false;
      }
      if(undefined == this.repairRecord.repairTime || 0 == this.repairRecord.repairTime.length){
        this.sendWarningNotify('未选择维修开始时间!');
        return false;
      }
      if(undefined == this.repairRecord.completeTime || 0 == this.repairRecord.completeTime.length){
        this.sendWarningNotify('未选择维修完成时间!');
        return false;
      }
      if(undefined == this.repairRecord.comment || 0 == this.repairRecord.comment.length){
        this.sendWarningNotify('未填写概述说明!');
        return false;
      }
      if(undefined == this.repairRecord.cost || 0 == this.repairRecord.cost.length){
        this.sendWarningNotify('未填写费用!');
        return false;
      }
      if(undefined == this.repairRecord.status || 0 == this.repairRecord.status.length){
        this.sendWarningNotify('未填写维修状态!');
        return false;
      }
      return true;
    },
    onConfirmClick: function(){
      if('edit' == this.editType){
        this.updateRecord();
      }else{
        this.addNewRecord();
      }
    },
    getValidEntity: function(){
      var entity = null;
      if('billing-record' == this.recordTypeOptions[this.recordTypeCurrentIndex]){
        if(!this.rentRecordObjectValidCheck()){
          return entity;
        }
        this.rentRecord.orderId = this.orderId;
        this.rentRecord.income = JSON.stringify(this.incomeItems);
        this.rentRecord.outgoings = JSON.stringify(this.outgoingsItems);
        this.rentRecord.balance = parseFloat(this.balance());
        this.rentRecord.timeRange = JSON.stringify(this.timeRange);
        entity = convertBillingRecordObject(this.rentRecord);
        
      } else if('inspect-record' == this.recordTypeOptions[this.recordTypeCurrentIndex]){
        if(!this.inspectRecordObjectValidCheck()){
          return;
        }
        this.inspectRecord.orderId = this.orderId;
        this.inspectRecord.config = JSON.stringify(this.configItems);
        this.inspectRecord.area = JSON.stringify(this.areaItems);
        entity = convertInspectRecordObject(this.inspectRecord);

      } else if('repair-record' == this.recordTypeOptions[this.recordTypeCurrentIndex]){
        if(!this.repairRecordObjectValidCheck()){
          return;
        }
        this.repairRecord.orderId = this.orderId;
        this.repairRecord.relatedImage = JSON.stringify(this.relatedImages);
        this.repairRecord.cost = parseFloat(this.repairRecord.cost.toFixed(2));
        entity = convertRepairRecordObject(this.repairRecord);
        
      }
      return entity;
    },
    updateRecord: function(){
      var entity = this.getValidEntity();
      if(null == entity){
        return;
      }

      updateRecordAsync(this.recordTypeOptions[this.recordTypeCurrentIndex], this.recordId, entity, res => {
          console.log('update record success!');
          this.sendSuccessNotify(textMap[this.recordTypeOptions[this.recordTypeCurrentIndex]] + '修改成功');
          setTimeout(this.navigateToOrderEditor, 1500);
        }); 
    },
    addNewRecord: function() {
      
      var entity = this.getValidEntity();
      if(null == entity){
        return;
      }

      addRecordAsync(this.recordTypeOptions[this.recordTypeCurrentIndex], entity, res => {
          console.log('add record success!');
          this.sendSuccessNotify(textMap[this.recordTypeOptions[this.recordTypeCurrentIndex]] + '保存成功');
          setTimeout(this.navigateToOrderEditor, 1500);
        });
    },
    beforeImageUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
    overflow: scroll;
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

.main-container {
  width: 100%;
  min-height: 100px;
  background: white;
}

.type-selector-container {
  width: 100%;
  height: 60px;
  padding-left: 20px;
  // background: orange;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.edit-container {
  width: 100%;
  min-height: 100px;
  background: whitesmoke;
}

.record-container {
  width: 600px;
  min-height: 100px;
  background: white;
  margin: 0 auto;
  padding-top: 20px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
font-size: 12px;
}

.sub-item-container {
  padding-left: 10px;
  // background: lightblue;
  display: flex;
  justify-content: space-between;
}

.sub-delete-btn {
  margin: 4px 0;
  margin-right: 0;
  padding: 0;
  width: 50px;
  height: 24px;
  font-size: 12px;
}

.input-container {
  height: 20px;
  width: 240px;
  transform: scale(0.8);
}

.button-container {
  width: 100%;
  height: 60px;
  // background: orange;
  display: flex;
  justify-content: center;
  align-items: center;
}

.config-sub-item-container {
  width: 500px;
  height: 100%;
  // background: lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-config-container {
  height: 80px;
  width: 100%;
  background: lightgray;
}

.image-container {
  width: 90%; 
  min-height: 100px; 
  padding: 10px 0;
  // background: orange; 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 4px;
}

.image-item-container {
  width: 80px;
  height: 120px;
  // background: lightblue;
  margin-right: 10px; 
  display: flex; 
  flex-direction: column; 
  align-items: center;
}

.image-uploader {
    width: 80px;
    height: 80px;
    border: 2px dashed gray;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    // background: red;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}

</style>
