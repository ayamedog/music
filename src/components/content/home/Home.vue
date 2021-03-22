<template>
<div id="home">
  <banner></banner>
  <reco-playlist></reco-playlist>
  <div class="mv-title"><h2>推荐MV</h2></div>
  <mv-count :mv-data="mvData"></mv-count>
</div>
</template>

<script>
import Banner from "@/components/content/home/Banner";
import RecoPlaylist from "@/components/content/home/RecoPlaylist";
import mvCount from "@/components/content/mv/mvCount";
import {recoMv} from "@/network/request";

export default {
  name: "Home",
  components: {
    RecoPlaylist,
    Banner,
    mvCount
  },
  created() {
    recoMv()
    .then(res => {
      this.mvData = res.data.result
    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      mvData: ''
    }
  }
}
</script>

<style scoped>
#home{
  width: 1350px;
  padding: 20px 15px 30px 15px;
  margin: 0 auto;
  color: #000;
}

.mv-title{
  margin-top: 40px;
  width: 100%;
  height: 30px;
  margin-bottom: 40px;
}
.mv-title h2{
  height: 50px;
  width: 250px;
  margin: 0 auto;
  text-align: center;
  line-height: 50px;
  letter-spacing: 20px;
  padding-left: 20px;
  border-radius: 15px;
  background: #fff;
}
</style>