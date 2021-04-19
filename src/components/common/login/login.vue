<template>
<div id="login-bg">
  <div id="login-bg2"></div>
  <div id="login-cont">
    <div class="logo">
      <img src="~assets/images/logo.png" alt="">
    </div>
    <div class="input-box">
      <input type="text" class="phone" maxlength="11" v-model="phone" placeholder="请输入手机号">
      <input type="password" class="user-pass" v-model="password" placeholder="请输入密码">
    </div>
    <div class="login-button">
      <!--<button @click="login" @keydown.enter="login">登录</button>-->
      <input type="button" class="button" @click="login" @keydown.enter="login" value="登录">
    </div>
  </div>
</div>
</template>

<script>
import {login,existence} from "@/network/request";
export default {
  name: "login",
  data() {
    return {
      phone: 16600202744,
      password: '123ayame'
    }
  },
  methods: {
    login() {
      let phone = this.phone
      let pass = this.password
      //手机号验证是否正确
      let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if(!reg_tel.test(phone)) {
        alert('请输入正确手机号')
        this.phone = ''
        this.password = ''
        return
      }else if(pass === ''){
        alert('请输入密码')
        return
      }
      //监测手机号是否注册
      existence(parseInt(phone)).then(res => {
        if(res.data.exist !== 1) {
          alert('当前手机号未被注册')
          return
        }
      }).catch(err => {
        console.log(err);
      })
      //登录
      let data = {phone: phone,password: pass}
      login(data).then(res => {
       if(res.data.code !== 200) {
         alert('密码错误')
         this.password = ''
         return
       }else{
         console.log(res);
         document.cookie = res.data.cookie
         if(this.$cookies.isKey('MUSIC_U')){
           this.$store.commit('changeLogin',true)
         }else {
           this.$store.commit('changeLogin',false)
         }
         this.$router.push('/my')
       }
      }).catch(err => {
        console.log(err);
      })
    }
    // axios.post('http://localhost:3000/login/status',{
    //   cookie: this.cookie
    // }).then(res => {
    //   console.log(this.cookie);
    //   console.log(res);
    // })
  }
}
</script>

<style scoped>
  #login-bg{
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("~assets/images/loginbg.jpg") center no-repeat;
    background-size: cover;
  }
  #login-bg2{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
  }

  #login-cont{
    width: 360px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    overflow: hidden;
    border-radius: 14px;
  }
  #login-cont .logo{
    width: 100%;
    margin-top: 30px;
    height: 150px;
    margin-bottom: 20px;
    text-align: center;
  }
  #login-cont .logo img{
    height: 100px;
    width: 100px;
    margin-top: 15px;
  }
  #login-cont .input-box input{
    width: 290px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin-left: 35px;
    margin-bottom: 30px;
    border: 1px solid #5c6b77;

    border-radius: 14px;
    outline: none;
    padding: 0 20px;
    text-align: center;
  }
  #login-cont .input-box input[type='number']{
    letter-spacing: 0.5em;
  }
  #login-cont .input-box input::-webkit-outer-spin-button,
  #login-cont .input-box input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }

  #login-cont .login-button .button{
    width: 290px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    margin-left: 35px;
    border-radius: 14px;
    outline: none;
    border: none;
    text-align: center;
    cursor: pointer;
    background: #0fbcf9;
  }
  #login-cont .login-button .button:hover{
    background: #00adff;
  }
</style>