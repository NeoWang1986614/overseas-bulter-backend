<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/service-primary-manager' }">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>服务编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content-scroll-container">
        <div class="content-container">
            <el-input 
                class="input-container" 
                v-model="servicePrimary.value" 
                type="text"
                resize="none"
                placeholder="请输入服务关键值">
                    <template slot="prepend">服务值:</template>
            </el-input>
            <el-input 
                class="input-container" 
                v-model="servicePrimary.title"
                type="text"
                resize="none"
                placeholder="请输入服务关键标题">
                    <template slot="prepend">服务标题:</template>
            </el-input>
            <el-input 
                class="input-container" 
                v-model="servicePrimary.location"
                type="text"
                resize="none"
                placeholder="请输入显示顺序">
                    <template slot="prepend">显示顺序:</template>
            </el-input>
            <el-input 
                class="input-container" 
                v-model="servicePrimary.basePrice"
                type="text"
                resize="none"
                placeholder="请输入起步价">
                    <template slot="prepend">起步价格:</template>
            </el-input>
            <div class="icon-uploader-container">
                <span class="icon-static">图标</span>
                <el-upload
                    class="image-uploader"
                    :action="imgUploadUrl"
                    :show-file-list="false"
                    :on-success="onAreaImageUploadSuccess"
                    :before-upload="beforeImageUpload">
                        <i v-if="'' == servicePrimary.iconUrl" class="el-icon-plus avatar-uploader-icon"></i>
                        <img v-if="'' != servicePrimary.iconUrl" class="icon-img" :src="servicePrimary.iconUrl"/>
                </el-upload>
            </div>
            <el-input 
                style="min-height: 120px; width: 100%;"
                class="input-container" 
                v-model="servicePrimary.content" 
                type="textarea"
                rows="8"
                resize="none"
                placeholder="请输入服务内容">
            </el-input>
            <div class="file-uploader-container">
                <div style="margin-top: 0;">
                    <div style="height: 50px; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                        <span style="margin-left: 10px;">附件列表:</span>
                        <el-button style="margin-right: 10px;" type="primary" @click="isAddAttachment = !isAddAttachment">
                            {{ isAddAttachment ? '关闭添加': '添加'}}
                        </el-button>
                    </div>
                    <div style="width: 100%; height: 2px; background: lightgray;"></div>
                    <div style="font-size: 12px; width: 100%; height: 40px; display: flex; flex-direction: row; justify-content: space-between; align-items: center;" v-for="item, index in attachments">
                        <div style="margin-left: 5px;">
                            <span style="float: left;">
                                <a style="color: green;" :href="item.fileUrl" target="_blank">{{item.title}}</a>
                            </span>
                        </div>
                        <div style="width: 60px; height: 24px; background: red; text-align: center; line-height: 24px; margin-right: 5px; cursor: pointer; color: white;"
                            @click="onAttachmentDeleteClick(index)">
                            删除
                        </div>
                    </div>
                </div>

                <div style="width: 100%; height: 2px; background: lightgray;"></div>
                
                <div v-if="isAddAttachment"
                    style="min-height: 100px;">
                    <div style="width: 100%; height: 60px; display: flex; flex-direction: row; align-items: center;">
                        <el-input 
                            style="margin-top: 0; margin-left: 5px; width: 200px;"
                            class="input-container" 
                            v-model="newAttachment.value" 
                            type="text"
                            resize="none"
                            placeholder="请输入附件值">
                        </el-input>
                        <el-input 
                            style="margin-top: 0; margin-left: 5px; width: 200px;"
                            class="input-container" 
                            v-model="newAttachment.title" 
                            type="text"
                            resize="none"
                            placeholder="请输入附件名字">
                        </el-input>
                        <el-upload
                            :action="fileUploadUrl"
                            :show-file-list="false"
                            :on-success="onAttachmentFileUploadSuccess"
                            :before-upload="beforeFileUpload">
                            <el-button style="width: 100px; margin-left: 10px" type="success">点击上传</el-button>
                        </el-upload>
                    </div>
                    <div style="margin-top: 5px; margin-left: 5px; height: 20px; line-height: 20px; width: 98%; font-size: 12px;">
                        {{newAttachment.fileUrl}}
                    </div>
                    <div style="width: 100%; height: 60px; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                        <el-button style="width: 100px;" type="primary" @click="onAttachmentAddClick">确定添加</el-button>
                    </div>
                    
                </div>
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
    addServicePrimaryAsync,
    queryServicePrimaryAsync,
    updateServicePrimaryAsync,
    deleteServicePrimaryAsync,
    querySearchServicePrimaryAsync
} from '../../common/utils.js';
import {preUrl} from '../../config/http.js'

export default {
  name: 'ServicePrimaryEditor',
  created: function(){
      if(this.$route.params.hasOwnProperty('uid')){
        console.log(this.$route.params['uid']);
        this.servicePrimaryUid = this.$route.params['uid'];
        this.isEdit = true;
        queryServicePrimaryAsync(this.servicePrimaryUid, res=>{
            console.log('query service primary = ',res);
            this.servicePrimary = res;
            this.parseMetaData();
        });  
    }
  },
  data () {
    return {
        imgUploadUrl: preUrl + '/overseas-bulter/v1/image',
        fileUploadUrl: preUrl + '/overseas-bulter/v1/file',
        isEdit: false,
        servicePrimaryUid: '',
        servicePrimary: {
            value: '',
            title: '',
            iconUrl: '',
            basePrice: '',
            content: '',
            meta: '',
        },
        attachments: [
        ],
        newAttachment: {
            value: '',
            title: '',
            fileUrl: ''
        },
        isAddAttachment: false
    }
  },
  methods:{
    makeMetaData(){
        if(0==this.attachments.length){
            this.servicePrimary.meta = '';
            return;
        }
        this.servicePrimary.meta = JSON.stringify(this.attachments);
    },
    parseMetaData(){
        if(0==this.servicePrimary.meta.length){
            return;
        }
        this.attachments = JSON.parse(this.servicePrimary.meta);
    },
    onSaveClick: function(){
        if(this.isEdit){
            this.updateServicePrimary();
        }else{
            this.addServicePrimary();
        }
    },
    onCancelClick: function(){
        this.$router.back(-1);
    },
    addServicePrimary: function(){
        this.makeMetaData();
        console.log('addServicePrimary = ', this.servicePrimary);
        addServicePrimaryAsync(this.servicePrimary, res=>{
            this.addServicePrimarySuccessWithRes(res);
        });
    },
    updateServicePrimary: function(){
        this.makeMetaData();
        console.log('updateServicePrimary = ', this.servicePrimary);
        updateServicePrimaryAsync(this.servicePrimary, res=>{
            this.updateServicePrimarySuccessWithRes(res);
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
    addServicePrimarySuccessWithRes: function(res){
        console.log('add service res=', res);
        if(0==res.code){
            this.notifyMessage('保存成功');
            setTimeout(_=>{
                this.$router.back(-1);
            },1500);
        }else{
            this.warningMessage('保存出错!');
        }
    },
    updateServicePrimarySuccessWithRes: function(res){
        if(0==res.code){
            this.notifyMessage('修改成功');
            setTimeout(_=>{
                this.$router.back(-1);
            },1500);
        }else{
            this.warningMessage('修改出错!');
        }
    },
    beforeImageUpload(file) {
        console.log('image file = ', file);
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
    },
    onAreaImageUploadSuccess(res, file){
      console.log('upload image success url = ', res.path);
      this.servicePrimary.iconUrl = res.path;
    },
    beforeFileUpload(file) {
        console.log('upload file = ', file);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isLt2M;
    },
    onAttachmentFileUploadSuccess(res, file){
      console.log('upload file success url = ', res.path);
      this.newAttachment.fileUrl = res.path;
    },
    onAttachmentAddClick(){
        if(0 != this.newAttachment.title.length&& 
            0!= this.newAttachment.fileUrl.length&&
             0!= this.newAttachment.value.length){
            this.attachments.push(JSON.parse(JSON.stringify(this.newAttachment)));
            this.newAttachment.title = '';
            this.newAttachment.value = '';
            this.newAttachment.fileUrl = '';
        }
    },
    onAttachmentDeleteClick(index){
        console.log('delete index = ', index);
        this.attachments.splice(index, 1);
    }
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

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
}

.icon-uploader-container {
    margin-top: 20px;
    width: 100%;
    height: 100px;
    // background: lightblue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: gray;
}

.image-uploader {
    margin-left: 10px;
    width: 80px;
    height: 80px;
    border: 2px dashed gray;
    border-radius: 10px;
}

.icon-img {
    width: 100%;
    height: 100%;
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


</style>
