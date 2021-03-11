<template>
  <div id="app">
    <div class="app">
      <nav-bar>
        <div slot="logo">
          <img src="~assets/images/logo.png" alt="music">
          <img src="~assets/images/logotext.png" alt="MUSIC">
        </div>
      </nav-bar>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <search-bar></search-bar>
    </div>
    <vuefooter></vuefooter>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/common/navbar/NavBar";
import SearchBar from "@/components/content/SearchBar";
import login from "@/components/common/login/login";
import vuefooter from "@/components/common/footer/vuefooter";
export default {
  name: 'app',
  components: {
    SearchBar,
    NavBar,
    vuefooter
  }
}
</script>

<style>
@import "assets/css/base.css";
body{
  padding-top: 70px;
  background: #ababab;
  background: url("~assets/images/bg.jpg") fixed no-repeat;
  background-size: cover;
}
.app{
  width: 1350px;
  margin: 0 auto;
}
</style>
