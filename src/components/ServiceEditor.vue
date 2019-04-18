<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/service-manager' }">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{textMap[serviceType]}}服务编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="scroll-container">
        <div class="scroll">
            <div class="scroll-content">
                <div class="layout-dropdown" v-if="isHomeDecoration">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{textMap[layoutOptions[layoutSelect]]}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in layoutOptions" 
                            :key="item" 
                            :disabled="'all' == item"
                            @click.native="onDropdownItemSelect(index)">
                                {{textMap[item]}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="title-container">{{textMap[serviceType]}}服务编辑-{{textMap[layoutOptions[layoutSelect]]}}户型</div>
                <el-input 
                    class="input-container" 
                    v-model="service.content" 
                    type="textarea"
                    :rows="20"
                    resize="none"
                    placeholder="请输入服务内容">
                        <template slot="prepend">内容:</template>
                </el-input>
                <el-input
                    class="input-container"
                    v-model.number="service.price" 
                    placeholder="请输入价格">
                        <template slot="prepend">价格:</template>
                </el-input>
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
import {textMap} from '../../common/map.js'
import {getServicesByTypeLayoutAsync, addServiceAsync, modifyServiceAsync} from '../../common/utils.js'
import {convertServiceEntities, convertServiceObject} from '../entity/service.js'

export default {
  name: 'ServiceEditor',
  created: function() {
    console.log(this.$route.params.type);
    this.textMap = textMap;
    this.serviceType = this.$route.params.type;
    this.isHomeDecoration = 'home-decoration' == this.serviceType;
    if(this.isHomeDecoration){
        this.layoutSelect = 1;
    }
    this.updateServicesAsync(res=>{
        this.setServiceFromServices();
    });
  },
  data () {
    return {
      serviceType: '',
      services: [{}],
      service: {},
      currentServiceIndex: 0,
      isHomeDecoration: true,
      textMap: {},
      /*dropdown*/
      layoutOptions:['all', 'studio','one-bedroom','two-bedroom'],
      layoutSelect: 0
    }
  },
  methods: {
      updateServicesAsync: function(callback){
        this.getServicesAsync(this.serviceType, this.layoutOptions[this.layoutSelect], data => {
                console.log(data);
                this.services = convertServiceEntities(data);
                if(callback){
                    callback();
                }
            });
      },
      setServiceFromServices: function() {
          if(0==this.services.length){
              this.service = {};
          }else{
              this.service = this.services[0];
          }
      },
      getServiceIndexByLayout: function(layout) {
          var result = null;
          this.services.forEach((item, index) =>{
              if(layout == item.layout){
                  result=index;
                  return;
              }
          });
          return result;
      },
      onDropdownItemSelect: function(value) {
          console.log(value);
          this.layoutSelect = value;
          this.updateServicesAsync(res=>{
                this.setServiceFromServices();
            });
      },
      udateLayoutSelect: function(){
        this.currentLayoutText = textMap[this.currentLayoutSelect];
      },
      onSaveClick: function(value) {
          console.log('save');
          if(0 == this.services.length){
              this.addServiceAsync();
          }else{
              this.modifyServiceAsync();
          }
      },
      getServicesAsync: function(type, layout, callback){
          getServicesByTypeLayoutAsync(type, layout, callback);
      },
      addServiceAsync(){
        this.service.type = this.serviceType;
        this.service.layout = this.layoutOptions[this.layoutSelect];
        addServiceAsync(convertServiceObject(this.service), res => {
            console.log('add success!');
            this.notifyMessage('保存服务成功!');
            this.updateServicesAsync(res=>{
                this.setServiceFromServices();
            });
        })
      },
      modifyServiceAsync(){
          console.log('modifyServiceAsync:',this.service);
        modifyServiceAsync(convertServiceObject(this.service), res => {
            console.log('modify success!');
            this.notifyMessage('修改服务成功!');
            this.updateServicesAsync(res=>{
                this.setServiceFromServices();
            });
        })
      },
      notifyMessage: function(msg){
          this.$message({
                message: msg,
                type: 'success'
            });
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

.input-container {
    width: 600px;
    margin-top: 10px;
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
    margin-top: 30px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
font-size: 12px;
}

.layout-dropdown {
    height: 20px;
    width: 580px;
    display: flex;
    margin-top: 10px;
    justify-content: flex-start;
    align-items: center;
    // background: lightblue;
}

.button-container {
    width: 600px;
    height: 50px;
    // background: gray;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
}

.button-common {
    width: 120px;
}

</style>
