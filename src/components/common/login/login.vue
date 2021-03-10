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
      <button>登录</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      phone: '',
      password: '',
    }
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

  #login-cont .login-button button{
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
  #login-cont .login-button button:hover{
    background: #00adff;
  }
</style>