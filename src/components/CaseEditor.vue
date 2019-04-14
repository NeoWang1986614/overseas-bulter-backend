<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/case-manager' }">案例管理</el-breadcrumb-item>
            <el-breadcrumb-item>案例编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="scroll-container">
        <div class="scroll">
            <div class="scroll-content">
                <div class="title-container">
                    添加案例
                </div>
                <el-input 
                    class="input-container" 
                    v-model="caseInfo.title"
                    placeholder="请输入标题">
                        <template slot="prepend">标题:</template>
                </el-input>
                <el-input
                    class="input-container"
                    v-model="caseInfo.imageUrl" 
                    placeholder="请输入图片地址 http://">
                        <template slot="prepend">图片:</template>
                </el-input>
                <el-upload
                    class="avatar-uploader uploader-container"
                    action="http://localhost:8008/overseas-bulter/v1/image"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="caseInfo.imageUrl" :src="caseInfo.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-input
                    class="input-container"
                    v-model="inputPrice" 
                    placeholder="请输入价格">
                        <template slot="prepend">价格:</template>
                </el-input>
                <el-input 
                    class="input-container" 
                    v-model="caseInfo.content" 
                    type="textarea"
                    :rows="30"
                    placeholder="请输入内容">
                        <template slot="prepend">内容:</template>
                </el-input>
                <el-switch
                    class="recommended-switch"
                    v-model="caseInfo.level"
                    :active-value="0"
                    :inactive-value="1"
                    @change="onRecommendedChange($event)"
                    active-text="推荐案例">
                </el-switch>
                <div class="button-container">
                    <el-button class="button-common" @click="onSaveClick" type="success">保存</el-button>
                    <el-button class="button-common">取消</el-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {preUrl} from '../../config/http.js'
import {convertCaseObject, convertCaseEntity} from '../entity/case.js'

export default {
  name: 'CaseEditor',
  data () {
    return {
      caseId: '',
      msg: 'Welcome to Your Vue.js App',
      caseInfo: {
        title: '',
        imageUrl: '',
        content: '',
        price: 0,
        level: 0
      },
      inputPrice: '30000',
      isRecommended: false
    }
  },
  created: function() {
    console.log('case editor is created');
    if(this.$route.params.hasOwnProperty('id')){
        this.caseId = this.$route.params.id;
    }
    console.log(this.caseId);
    this.getCaseInfoIfNeed();
  },
  methods: {
      getCaseInfoIfNeed: function () {
          this.$http.get(
            preUrl + '/overseas-bulter/v1/case?id=' + this.caseId,
            {"emulateJson":false}
            ).then( res => {
                console.log('get case info', res.body);
                this.caseInfo =  convertCaseEntity(res.body);
                console.log('this.caseInfo', this.caseInfo);
            })
      },
      onSaveClick: function () {
        console.log('save case: ', this.caseInfo);
        this.caseInfo.price = parseInt(this.inputPrice);

        var executeFunc = null;
        var message = '';
        if(0 == this.caseId.length){
            /*add*/
            executeFunc = this.addNewCaseAsync;
            message = '添加案例成功!';
        }else{
            /*update*/
            executeFunc = this.updateCaseAsync;
            message = '修改案例成功!';
        }
        executeFunc(rspBody => {
            if(rspBody && rspBody.hasOwnProperty('uid')){
                console.log('response body: ', rspBody);
                this.caseId = rspBody.uid;
            }
            this.$message({
                message: message,
                type: 'success'
            }); 
        });
      },
      addNewCaseAsync: function(callback) {
        this.$http.post(
            preUrl + '/overseas-bulter/v1/case',
            convertCaseObject(this.caseInfo),
            {"emulateJson":false}
            ).then( res => {
                console.log(res.body) 
                if(callback){
                    callback(res.body);
                }
            })
      },
      updateCaseAsync: function(callback) {
        this.$http.put(
            preUrl + '/overseas-bulter/v1/case',
            convertCaseObject(this.caseInfo),
            {"emulateJson":false}
            ).then( data => {
                console.log(data) 
                if(callback){
                    callback();
                }
            })
      },
      handleAvatarSuccess(res, file) {
        console.log(res, file);
        this.caseInfo.imageUrl = res.path;
        console.log(this.caseInfo.imageUrl);
      },
      onRecommendedChange(value) {
          console.log(value);
      },
      beforeAvatarUpload(file) {
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
    align-items: center;
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

.scroll-container {
    width: 100%;
    height: 100px;
    flex-grow: 1;
    // background: red;
}

.scroll {
    width: 100%;
    height: 100%;
    overflow: scroll;
}

.scroll-content {
    width: 100%;
    height:auto!important;
    // background: orange;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title-container {
    width: 600px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 20px;
    font-size: 20px;
    font-family: "Microsoft YaHei";
}

.title-input {
    width: 600px;
    margin-top: 20px;
}

.input-container {
    width: 600px;
    margin-top: 10px;
}

.recommended-switch {
    height: 40px;
    margin-left: -480px;
}

.button-container {
    width: 600px;
    height: 50px;
    // background: gray;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 40px;
}

.button-common {
    width: 120px;
}

.avatar-uploader .el-upload {
    border: 1px dashed red;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.uploader-container {
    height: 178px;
    width: 178px;
    // background: blue;
    border: 2px dashed gray;
    border-radius: 4px;
    margin-top: 10px;
}

</style>
