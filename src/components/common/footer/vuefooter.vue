<template>
  <div id="footer">
    <div class="footer-box">
      <h3 class="footer-title">MUSIC</h3>
      <p class="footer-text">music</p>
      <a href="https://github.com/ayamedog/music" class="github"><i class="fa fa-github"></i></a>
    </div>
    <div class="footer-bottom">
      <p class="bottom-text">by <a href="https://github.com/ayamedog/music">臭DD</a></p>
      <vue-audio></vue-audio>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import vueAudio from "@/components/common/vueAudio";
export default {
  name: "vuefooter",
  data() {
    return {

    }
  },
  components: {
    vueAudio
  },
  created() {
    axios.post('http://localhost:3000/song/url',{
      id: 33894312
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
  #footer{
    height: 250px;
    min-width: 1380px;
    width: 100%;
    background: #161e27;
    position: relative;
  }
  .footer-box{
    width: 1380px;
    height: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 30px;
    position: relative;
  }

  .footer-title{
    color: #fff;
    letter-spacing: 5px;
    padding-left: 10px;
    border-left:  8px solid #d33a31;
  }
  .footer-text{
    margin-top: 10px;
    margin-bottom: 10px;
    color: #6d7685;
    font-size: 16px;
  }
  .github{
    margin-left: 10px;
    display: inline-block;
    font-size: 35px;
    margin-bottom: 10px;
  }
  .github:hover{
    color: #fff;
  }

  .footer-bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    border-top: 1px solid #f5f5f5;
  }
  .footer-bottom .bottom-text{
    width: 1380px;
    margin: 0 auto;
    line-height: 50px;
    font-size: 14px;
  }
</style>