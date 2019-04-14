<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function() {
    console.log('app is created!');
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
