<template>
  <div class="wrap">
    <div class="service-item-container" v-for="item in services" @click="onServiceItemClick(item)">
      <img class="item-icon-container" v-bind:src="item.iconUrl"/>
      <div class="item-title-container">{{textMap[item.value]}}</div>
    </div>
  </div>
</template>

<script>
import {convertServiceEntities} from '../entity/service.js'
import {preUrl} from '../../config/http.js'
import {textMap} from '../../common/map.js'

export default {
  name: 'ServiceManager',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      services: [
        {
          value: 'home-decoration',
          iconUrl: '/static/home-decoration.png'
        },
        {
          value: 'house-maintain',
          iconUrl: '/static/house-maintain.png'
        },
        {
          value: 'house-rent',
          iconUrl: '/static/house-rent.png'
        },
        {
          value: 'others',
          iconUrl: '/static/other-service.png'
        }],
      textMap: null
    }
  },
  created: function() {
    this.textMap = textMap;
    console.log('service manager is created');
  },
  methods: {
    updateCases: function() {
        this.$http.get(
            preUrl + '/overseas-bulter/v1/case',
            {
                offset: 0,
                length: 10,
                level: 0
            },
            {"emulateJson":false}
            ).then( res => {
                // console.log(res); 
                console.log(res.body); 
                var convertedArr = convertCaseEntities(res.body);
                this.cases = convertedArr
            })
    },
    onServiceItemClick: function(item) {
      this.$router.push({name: 'ServiceEditor', params: {type: item.value}});
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
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.service-item-container {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  border: 4px solid coral;
  background: orange;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.service-item-container:hover {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  border: 4px solid gold;
  background: gold;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}

.item-icon-container {
  width: 70px;
  height: 70px;
  margin-top: 10px;
  // background: gray;
}

.item-title-container {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  // background: red;
  color: white;
  margin-bottom: 20px;
}

</style>
