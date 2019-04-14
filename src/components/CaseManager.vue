<template>
  <div class="wrap">
    <div class="scroll-container">
        <div class="block" v-for="(item, index) in cases">
            <div class="item-container" @click="onItemClick(item)">
                <img class="item-sub-image" :src="item.imageUrl">
                    <div v-if="0 == item.level" class="remmonded-flag">推荐</div>
                </img>
                <div class="item-sub-info">
                    <div class="item-title">{{item.title}}</div>
                    <div class="item-content">{{item.content}}</div>
                    <div class="item-price">¥ {{item.price}}</div>
                </div>
            </div>
            <div class="operate-container">
                <el-button class="delete-button" type="danger" icon="el-icon-delete" @click="onItemDeleteClick(index)"></el-button>
            </div>
        </div>
        <div class="add-new-container" @click="onItemAddNew">
            <el-button class="el-icon-plus add-new-button"></el-button>
        </div>
    </div>
  </div>
</template>

<script>
import {convertCaseEntities} from '../entity/case.js'
import {preUrl} from '../../config/http.js'

export default {
  name: 'CaseManager',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '标题',
      cases: [],
      readyToDeleteIndex: 0
    }
  },
  created: function() {
        console.log('case manager is created');
        this.updateCases();
  },
  methods: {
      getCasesByLevelAsync: function(level, callback){
        this.$http.post(
            preUrl + '/overseas-bulter/v1/case/search',
            {
                offset: 0,
                length: 10000,
                level: level
            },
            {"emulateJson":false}
            ).then( res => {
                // console.log(res); 
                console.log(res.body); 
                var convertedArr = convertCaseEntities(res.body);
                // this.cases = convertedArr
                if(callback){
                    callback(convertedArr);
                }
            })
      },
      updateCases: function() {

        var zeroPro = new Promise((resolve, reject)=>{
            this.getCasesByLevelAsync(0, rsp => {
                console.log('zero: ', rsp)
                resolve(rsp)
            })
        });
        
        var onePro = new Promise((resolve, reject)=>{
            this.getCasesByLevelAsync(1, rsp => {
                console.log('one: ', rsp)
                resolve(rsp)
            })
        });

        Promise.all([zeroPro, onePro]).then(res => {
            console.log('update all cases success !!', res);
            this.cases = res[0].concat(res[1]);
        });

      },
      onItemClick: function(item) {
          this.$router.push({name: 'CaseEditor', params: {id: item.uid}});
      },
      onItemDeleteClick: function(index) {
          console.log(index);
          this.$alert('确定删除案例?', '删除', {
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(action);
                        if(action == 'confirm'){
                            console.log('确定删除');
                            this.$http.delete(
                            preUrl + '/overseas-bulter/v1/case?id=' + this.cases[index].uid,
                            {},
                            {"emulateJson":false}
                            ).then( data => {
                                console.log(data) 
                                this.updateCases();
                                this.$message({
                                    message: '删除成功!',
                                    type: 'success'
                                    });
                            })
                        }
                    }
                }); 
      },
      onItemAddNew: function() {
          this.$router.push({name: 'CaseEditor'});
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: whitesmoke;
}

.scroll-container {
    width: 100%;
    height:auto!important;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    padding: 30px;
}

.scroll-content {
    width: 100%;
}

.block {
    width: 300px;
    min-height: 130px;
    // background: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.item-container {
    width: 98%;
    height: 70%;
    background: white;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    // border: 2px solid gray;
}

.item-container:hover {
    background: rgb(250,250,250);
}

.item-sub-image {
    width: 70px;
    height: 70px;
    flex-shrink: 0;
    margin-left: 10px;
}

.remmonded-flag {
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: 0;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 12px;
    color: red;
    border: 1px solid red;
}

.item-sub-info {
    width: 190px;
    height: 70px;
    // background: green;
    margin-right: 14px;
}

.item-title {
    line-height: 20px;
    font-size: 12px;
    color: black;
    font-weight: bold;
    font-family: "Microsoft YaHei";
}

.item-content {
    height: 30px;
    line-height: 15px;
    font-size: 10px;
    color: gray;
    // background: skyblue;
    display: -webkit-box;    
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 2;    
    overflow: hidden;
}

.item-price {
    height: 20px;
    line-height: 20px;
    font-size: 10px;
    color: black;
    font-family: "PMingLiU";
    font-weight: bold;
}

.operate-container {
    width: 98%;
    height: 20%;
    background: white;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.delete-button {
    height: 20px;
    width: 30px;
    padding: 0;
    margin: 0;
    margin-right: 10px;
}

.add-new-container {
    width: 300px;
    height: 130px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px dashed gray;
    border-radius: 6px;
    cursor: pointer;
}

.add-new-button {
    
}

</style>