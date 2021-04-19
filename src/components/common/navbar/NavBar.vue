<template>
  <div id="nav-bar">
   <div class="nav-bg">
      <!-- Logo-->
      <div id="nav-logo">
       <slot name="logo"></slot>
     </div>
      <!--导航-->
      <ul id="nav-cont">
        <li><router-link to="/home" tag="a">首页</router-link></li>
        <li><router-link to="/ranking" tag="a">排行榜</router-link></li>
        <li><router-link to="/playlist" tag="a">歌单</router-link></li>
        <li><router-link to="/mv" tag="a">M V</router-link></li>
        <li><router-link :to="$store.state.isLogin?'/my':'/login'" tag="a">我的音乐</router-link></li>
        <!--<li>我的音乐</li>-->
      </ul>
      <!--搜索按钮和登录按钮-->
      <div class="nav-right">
        <input type="submit" name="search" value="" title="搜索" @click="$store.commit('searchClick')">
        <router-link to="/login" v-if="!$store.state.isLogin">登录</router-link>
        <router-link to="/login" v-if="$store.state.isLogin"><span @click="myLogout">退出</span></router-link>
      </div>
   </div>

  </div>
</template>

<script>
import {logout} from "@/network/request";
export default {
  name: "Navbar",
  data() {
    return {
      keyword: '',
      isActive: true
    }
  },
  created() {
    if(this.$cookies.isKey('MUSIC_U')){
      this.$store.commit('changeLogin',true)
    }else {
      this.$store.commit('changeLogin',false)
    }
  },
  methods: {
    myLogout() {
      logout().then(res=>{
        console.log(res);
       console.log('13ce66.');
     })
      this.$cookies.remove("MUSIC_U")
      this.$store.commit('changeLogin',false)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  #nav-bar {
    height: 70px;
    background: #F2F6FC;
    width: 100%;
    position: fixed;
    z-index: 890;
    top: 0;
    left: 0;
  }
  .nav-bg{
    margin: 0 auto;
    width: 1350px;
    height: 100%;
    padding: 0 15px;
  }

  /*logo设计*/
  #nav-logo{
    float: left;
    height: 70px;
  }
  #nav-logo img {
    margin-top: 10px;
    margin-right: 20px;
    height: 50px;
  }

  /*导航内容*/
  #nav-cont{
    float: left;
    margin-left: 20px;
  }
  #nav-cont li{
    list-style: none;
    float: left;
    height: 70px;
    padding: 0 15px;
    line-height: 70px;
  }
  #nav-cont li a{
    color: #303133;
    position: relative;
  }
  #nav-cont li a:hover{
    color: #fa2800;
  }
  #nav-cont li a.router-link-active{
    color: #fa2800;
  }
  #nav-cont li a.router-link-active::after{
    content: '';
    position: absolute;
    display: block;
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    bottom: -17px;
    right: 0;
    margin: auto;
    left: 0;
  }

  /*nav右侧 搜索 登录*/
  .nav-right{
    float: right;
    height: 50px;
    margin-top: 10px;
    display: flex;
  }
  .nav-right input{
    border: none;
    outline: none;
    display: block;
    cursor: pointer;
    height: 30px;
    width: 30px;
    background: url("~assets/images/Search.png") no-repeat;
    background-size: cover;
    margin-right: 30px;
    margin-top: 10px;
  }
  .nav-right a{
    line-height: 30px;
    margin-top: 10px;
    display: block;
    height: 30px;
    padding-left: 20px;
    border-left: 2px solid #666;
  }
</style>