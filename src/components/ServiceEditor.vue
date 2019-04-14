<template>
  <div class="wrap">
    <div class="indicator-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/service-manager' }">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item>服务编辑</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="scroll-container">
        <div class="scroll">
            <div class="scroll-content">
                <div class="title-container">编辑{{textMap[services[currentServiceIndex].type]}}服务内容</div>

                <div class="layout-dropdown" v-if="isHomeDecoration">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            {{textMap[services[currentServiceIndex].layout]}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in services" :key="item.uid" @click.native="onDropdownItemSelect(item.layout)">
                                {{textMap[item.layout]}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-input 
                    class="input-container" 
                    v-model="services[currentServiceIndex].content" 
                    type="textarea"
                    :rows="30"
                    placeholder="请输入服务内容">
                        <template slot="prepend">内容:</template>
                </el-input>
                <el-input
                    class="input-container"
                    v-model.number="services[currentServiceIndex].price" 
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
import {convertServiceEntities, convertServiceObject} from '../entity/service.js'

export default {
  name: 'ServiceEditor',
  created: function() {
    console.log(this.$route.params.type);
    this.textMap = textMap;
    this.serviceType = this.$route.params.type;
    this.isHomeDecoration = 'home-decoration' == this.serviceType;
    this.getServicesAsync(this.serviceType, data => {
        console.log(data);
        if(data.length)
        this.services = data;
    });
    
  },
  data () {
    return {
      serviceType: '',
      services: [{}],
      currentServiceIndex: 0,
      isHomeDecoration: true,
      textMap: {}
    }
  },
  methods: {
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
          this.currentServiceIndex = this.getServiceIndexByLayout(value);
          console.log(this.service);
      },
      udateLayoutSelect: function(){
        this.currentLayoutText = textMap[this.currentLayoutSelect];
      },
      onSaveClick: function(value) {
          console.log('save');
          this.saveAllServicesAsync(_ => {
              console.log('save success!');
              this.$message({
                  message: '保存成功!',
                  type: 'success'
                  });
          });
      },
      getServicesAsync: function(type, callback){
          this.$http.post(
            preUrl + '/overseas-bulter/v1/service/search',
            {
                type: this.serviceType
            },
            {"emulateJson":false}
            ).then( res => {
                console.log(res.body); 
                var convertedServies = convertServiceEntities(res.body);
                if(callback){
                    callback(convertedServies)
                }
            })
      },
      saveServiceAsync: function(service, callback){
          this.$http.put(
            preUrl + '/overseas-bulter/v1/service',
            convertServiceObject(service),
            {"emulateJson":false}
            ).then( res => {
                console.log(res.body); 
                if(callback){
                    callback()
                }
            })
      },
      saveAllServicesAsync: function(callback){
        if(0 == this.services.length){
            return;
        }
        var allPromise = [];
        for(let i=0 ; i < this.services.length; i++ ){
            let tempPromise = new Promise((resolve, reject) => {
            this.saveServiceAsync(this.services[i], _ => {
                    resolve()
            })
            allPromise.push(tempPromise);
        });

        Promise.all(allPromise).then(res => {
            console.log('save all services success !!');
            if(callback){
                callback();
            }
        });

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
