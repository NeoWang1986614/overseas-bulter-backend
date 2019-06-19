<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/house-deal-manager' }">出租出售列表</el-breadcrumb-item>
            <el-breadcrumb-item>出租出售编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="content-scroll-container">
        <div class="content-container">
            <div class="icon-uploader-container">
                <el-upload
                    class="image-uploader"
                    :action="imgUploadUrl"
                    :show-file-list="false"
                    :on-success="onImageUploadSuccess"
                    :before-upload="beforeImageUpload">
                        <i v-if="'' == carouselFigure.imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                        <img v-if="'' != carouselFigure.imageUrl" class="icon-img" :src="carouselFigure.imageUrl"/>
                </el-upload>
            </div>
            <el-input 
                class="input-container" 
                v-model="carouselFigure.desc" 
                type="text"
                resize="none"
                placeholder="请输入简短描述">
                    <template slot="prepend">描述:</template>
            </el-input>
            <el-input 
                class="input-container" 
                v-model="carouselFigure.location"
                type="text"
                resize="none"
                placeholder="请输入排序位置">
                    <template slot="prepend">排序位置:</template>
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
    addCarouselFigureAsync,
    queryCarouselFigureAsync,
    updateCarouselFigureAsync,
    deleteCarouselFigureAsync,
    querySearchCarouselFigureAsync,

    queryHouseDealAsync
} from '../../common/utils.js';
import {preUrl} from '../../config/http.js'

export default {
  name: 'HouseDealEditor',
  created: function(){
      if(this.$route.params.hasOwnProperty('uid')){
        console.log(this.$route.params['uid']);
        this.houseDealId = this.$route.params['uid'];
        this.isEdit = true;
        queryHouseDealAsync(this.houseDealId, res=>{
            console.log('query house deal = ',res);
            this.houseDeal = res;
        });  
    }
  },
  data () {
    return {
        imgUploadUrl: preUrl + '/overseas-bulter/v1/image',
        isEdit: false,
        houseDealId: '',
        houseDeal: {},
        carouselFigureUid: '',
        carouselFigure: {
            imageUrl: ''
        }
    }
  },
  methods:{
    onSaveClick: function(){
        if(this.isEdit){
            this.updateAction();
        }else{
            this.addAction();
        }
    },
    onCancelClick: function(){
        this.$router.back(-1);
    },
    addAction: function(){
        console.log('add carousel figure = ', this.carouselFigure);
        addCarouselFigureAsync(this.carouselFigure, res=>{
            this.addSuccessWithRes(res);
        });
    },
    updateAction: function(){
        console.log('update carousel figure = ', this.carouselFigure);
        updateCarouselFigureAsync(this.carouselFigure, res=>{
            this.updateSuccessWithRes(res);
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
    addSuccessWithRes: function(res){
        console.log('add carousel figure res=', res);
        if(0==res.code){
            this.notifyMessage('保存成功');
            setTimeout(_=>{
                this.$router.back(-1);
            },1500);
        }else{
            this.warningMessage('保存出错!');
        }
    },
    updateSuccessWithRes: function(res){
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
    onImageUploadSuccess(res, file){
      console.log('upload image success url = ', res.path);
      this.carouselFigure.imageUrl = res.path;
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

.avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 300px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    // background: pink;
}

.icon-uploader-container {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    // background: lightblue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: gray;
}

.image-uploader {
    width: 300px;
    height: 150px;
    border: 2px dashed gray;
}

.icon-img {
    width: 300px;
    height: 150px;
    background: lightblue;
}

</style>
