<template>
  <div class="wrap">
    <div class="header-container">
        <div class="user-info">
            <img :src="userAvatarUrl" class="user-avatar"/>
            <div class="user-name">{{userName}}</div>
        </div>
    </div>
    <div class="body-container">
        <div class="nav-container">
            <el-menu
                router
                default-active="/carousel-figure-manager"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item index="/carousel-figure-manager">
                    <i class="el-icon-document"></i>
                    <span slot="title">首页轮播图</span>
                </el-menu-item>
                <el-menu-item index="/order-manager">
                    <i class="el-icon-menu"></i>
                    <span slot="title">订单</span>
                </el-menu-item>
                <el-menu-item index="/service-primary-manager">
                    <i class="el-icon-setting"></i>
                    <span slot="title">服务</span>
                </el-menu-item>
                <el-menu-item index="/layout-manager">
                    <i class="el-icon-setting"></i>
                    <span slot="title">户型</span>
                </el-menu-item>
                <el-menu-item index="/price-params-manager">
                    <i class="el-icon-setting"></i>
                    <span slot="title">价格参数</span>
                </el-menu-item>
                <el-menu-item index="/house-deal-manager">
                    <i class="el-icon-setting"></i>
                    <span slot="title">出租出售</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content-container">
            <router-view/>
        </div>
    </div>
  <!--
    
  -->  
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userAvatarUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1671789140,435698588&fm=26&gp=0.jpg',
      userName: '赵可爱'
    }
  },
  created: function() {
          console.log('home is created');
  },
  methods: {
      handleSelect (index) {
      console.log('press button',index);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    height: 800px;
    background: blue;
    display: flex;
    flex-direction: column;
}

.header-container {
    width: 100%;
    height: 80px;
    background: lightblue;
    display: flex;
    align-items: center;
}

.user-info {
    width: 200px;
    height: 60px;
    // background: white;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.user-avatar {
    width: 60px;
    height: 60px;
    background: red;
    border-radius: 50%;
}

.user-name {
    width: 130px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: white;
    // background: blue;
}

.body-container {
    width: 100%;
    height: 300px;
    background: green;
    flex-grow: 1;
    display:flex;
    flex-direction: row;
}

.nav-container {
    width: 200px;
    flex-shrink: 0;
    height: 100%;
    background: gray;
}

.content-container {
    flex-grow: 1;
    height: 100%;
    background: whitesmoke;
    overflow: hidden;
}

</style>
