<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout-manager' }">户型管理</el-breadcrumb-item>
            <el-breadcrumb-item>户型编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content-scroll-container">
        <div class="content-container">
            <el-input 
                class="input-container" 
                v-model="layout.value" 
                type="text"
                resize="none"
                placeholder="请输入户型关键值">
                    <template slot="prepend">户型值:</template>
            </el-input>
            <el-input 
                class="input-container" 
                v-model="layout.title"
                type="text"
                resize="none"
                placeholder="请输入户型关键标题">
                    <template slot="prepend">户型名字:</template>
            </el-input>
            <el-input 
                class="input-container" 
                v-model="layout.location"
                type="text"
                resize="none"
                placeholder="请输入户型排序位置">
                    <template slot="prepend">排列位置:</template>
            </el-input>
            <div class="file-uploader-container">
                <div style="margin-left: 10px; margin-top: 10px;">
                    家装清单:
                    <span>{{homeDecorationAttachment}}</span>
                </div>
                <el-upload
                    style="margin-top: 10px; margin-left: 10px"
                    :action="imgUploadUrl"
                    :show-file-list="false"
                    :on-success="onHomeDecorationFileUploadSuccess"
                    :before-upload="beforeFileUpload">
                    <el-button style="width: 100px; margin-bottom: 10px" type="success">点击上传</el-button>
                </el-upload>
            </div>
            <div class="file-uploader-container">
                <div style="margin-left: 10px; margin-top: 10px;">
                    房屋保养清单:
                    <span>{{houseMaintainAttachment}}</span>
                </div>
                <el-upload
                    style="margin-top: 10px; margin-left: 10px"
                    :action="imgUploadUrl"
                    :show-file-list="false"
                    :on-success="onHouseMaintainFileUploadSuccess"
                    :before-upload="beforeFileUpload">
                    <el-button style="width: 100px; margin-bottom: 10px" type="success">点击上传</el-button>
                </el-upload>
            </div>
            <el-input 
                style="height: 120px; width: 100%;"
                class="input-container" 
                v-model="layout.content" 
                type="textarea"
                rows="4"
                resize="none"
                placeholder="请输入户型内容">
            </el-input>
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
    addLayoutAsync,
    queryLayoutAsync,
    updateLayoutAsync,
    deleteLayoutAsync,
    querySearchLayoutAsync
} from '../../common/utils.js';
import {preUrl} from '../../config/http.js'

export default {
  name: 'LayoutEditor',
  created: function(){
      if(this.$route.params.hasOwnProperty('uid')){
        console.log(this.$route.params['uid']);
        this.layoutUid = this.$route.params['uid'];
        this.isEdit = true;
        queryLayoutAsync(this.layoutUid, res=>{
            console.log('query layout = ',res);
            this.layout = res;
            this.parseMetaData();
        });  
    }
  },
  data () {
    return {
        imgUploadUrl: preUrl + '/overseas-bulter/v1/file',
        isEdit: false,
        layoutUid: '',
        homeDecorationAttachment: '',
        houseMaintainAttachment: '',
        layout: {
            value: '',
            title: '',
            content: '',
            meta: '',
        }
    }
  },
  methods:{
    makeMetaData: function(){
        this.layout.meta = JSON.stringify({
            homeDecorationAttachment: this.homeDecorationAttachment,
            houseMaintainAttachment: this.houseMaintainAttachment
        });
    },
    parseMetaData: function(){
        var temp = JSON.parse(this.layout.meta);
        this.homeDecorationAttachment = temp.homeDecorationAttachment;
        this.houseMaintainAttachment = temp.houseMaintainAttachment;
    },
    onSaveClick: function(){
        this.makeMetaData();
        if(this.isEdit){
            this.updateLayout();
        }else{
            this.addLayout();
        }
    },
    onCancelClick: function(){
        this.$router.back(-1);
    },
    addLayout: function(){
        console.log('add layout = ', this.layout);
        addLayoutAsync(this.layout, res=>{
            this.addLayoutSuccessWithRes(res);
        });
    },
    updateLayout: function(){
        console.log('update layout = ', this.layout);
        updateLayoutAsync(this.layout, res=>{
            this.updateLayoutSuccessWithRes(res);
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
    addLayoutSuccessWithRes: function(res){
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
    updateLayoutSuccessWithRes: function(res){
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
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isLt2M;
    },
    onHouseMaintainFileUploadSuccess(res, file){
      console.log('upload file success url = ', res.path);
      this.houseMaintainAttachment = res.path;
    },
    onHomeDecorationFileUploadSuccess(res, file){
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

</style>
