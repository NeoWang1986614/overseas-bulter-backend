<template>
  <div class="wrap">
    <div class="up-container" :style="{backgroundImage:`url(${img})`}">
        <span class="title-container">菲洋管家后台管理系统</span>
        <div class="operate-container">
            <div class="welcome-container">
                <div class="line"></div><span>欢迎登录</span><div class="line"></div>
            </div>
            <el-input 
                class="user-input" 
                v-model="userName" 
                type="text"
                @keyup.enter.native="onLoginClick"
                placeholder="请输入用户名">
            </el-input>
            <el-input 
                class="user-input"
                style="margin-top: 10px;" 
                v-model="password" 
                type="text"
                @keyup.enter.native="onLoginClick"
                placeholder="请输入密码">
            </el-input>
            <el-button class="login-button" type="primary" @click="onLoginClick" >登 录</el-button>
            <div class="register-button" @click="onRegisterClick" >注册帐号</div>
        </div>
    </div>
  </div>
</template>

<script>
import {employeeCheckAsync} from '../../common/utils.js'

export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      img: require('../../static/login-bg.jpg'),
      userName: '',
      password: ''
    }
  },
  methods:{
      onLoginClick: function(){
          if(this.checkInputValid()){
            employeeCheckAsync(this.userName, this.password, res => {
                console.log('employee check :', res);
                if(1001 == res.code || 1002 == res.code){
                    this.$message(
                    {
                        message: '用户名或者密码不对!',
                        type: 'warning'
                    });   
                }else if(0 == res.code){
                    this.$message(
                    {
                        message: '登录成功!',
                        type: 'success'
                    }); 
                    // setCookie('isLoginSuccess', true, 0.5);
                    this.$cookieStore.setCookie( 'isLoginSuccess' , 'success');
                    this.$router.push({path: '/carousel-figure-manager'});
                }
            });
          }
      },
      checkInputValid: function(){
          var toastTitle = '';
          var result = true;
          if(0==this.userName.length){
            toastTitle = '用户名不能为空!';
            result = false;
          }else if(0==this.password.length){
            toastTitle = '密码不能为空!';
            result = false;
          }
          if(!result){
              this.$message({
                  message: toastTitle,
                  type: 'warning'
              });
          }
          return result;
      },
      onRegisterClick: function(){
          console.log('register');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
    width: 100%;
    height: 600px;
    // background: blue;
    display: flex;
    flex-direction: column;
}

.up-container {
    height: 100%;
    width: 100%;
    // background: lightblue;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title-container {
    font-size: 30px;
    color: white;
}

.down-container {
    height: 10px;
    flex-grow: 1;
    background: red;
}

.main-scene {
    height: 100%;
    width: 70%;
    background: purple;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}

.operate-container {
    height: 300px;
    width: 300px;
    margin-top: 40px;
    background: white;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px lightgray;
}

.user-input {
    margin-top: 10px;
    width: 80%;
    // height: 80px;
}

.welcome-container {
    height: 40px;
    width: 80%;
    // background: lightblue;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: lightgray;
}

.login-button {
    margin-top: 10px;
    width: 80%;
}

.line {
    height: 1px;
    width: 80px;
    background: lightgray;
}

.register-button {
    padding: 0;
    margin-left: -170px;
    border: none;
    height: 40px;
    width: 60px;
    line-height: 40px;
    color: gray;
    font-size: 12px;
    cursor: pointer;
    // background: blue;
}

</style>
