<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import {setCookie, delCookie, getCookie} from '../common/cookie.js'
export default {
  name: 'App',
  created: function() {
    console.log('app is created!');
    Vue.prototype.$cookieStore = {
      setCookie,
      getCookie,
      delCookie
    }
  },
  beforeMount () {
    
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 600px;
  background: orange;
}
</style>
