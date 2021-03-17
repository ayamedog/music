<template>
  <div id="mv-url">
<!--    <video :src="src" controls autoplay="autoplay"></video>-->
    <Xgplayer id="vs" :config="config"/>
    <div class="mv-info">
      <h2 class="mv-name">{{name}}</h2>
      <div class="group"><span v-for="(item, index) in mvGroup">#{{item.name}}</span></div>
      <div class="info2">
        <span class="play-count">播放: {{ $store.getters.playCount(playCount) }}</span>
        <span class="publish-time">发布时间: {{publishTime}}</span>
      </div>
      <div class="desc">
        <span>简介: </span>
        <p class="desc">{{desc==''?'暂无':desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mvUrl,mvInfo} from "@/network/request";
import Xgplayer from 'xgplayer-vue';
export default {
  name: "mvUrl",
  created() {
    mvUrl({
      params:{
        id :this.id
      }
    })
    .then(res => {
      this.src = res.data.data.url;
      this.config = {
        id: 'vs',
        url: this.src,
        width: 950,
        height: 535,
        autoplay: true
      }
      // console.log(this.config.url);
    }).catch(err => {
      console.log(err);
    })
    mvInfo({
      params: {
        mvid: this.id
      }
    })
    .then(res => {
      let data = res.data.data
      this.name = data.name
      this.mvGroup = data.videoGroup
      this.playCount = data.playCount
      this.publishTime = data.publishTime
      this.desc = data.desc
      console.log(data);
    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      src: '',
      id: this.$route.query.id,
      config: {},
      name: '',
      mvGroup: '',
      playCount: '',
      publishTime: '',
      desc: ''
  }
  },
  components: {
    Xgplayer
  }
}
</script>

<style scoped>
  .mv-info{
    margin-left: 5px;
  }
  .mv-info div,.mv-info h2{
    margin-bottom: 5px;
  }
  .mv-name{
    color:#1e272e;
    margin-top: 10px;
  }
  .group span{
    color: #e82c07;
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
  }
  .info2 span{
    margin-right: 20px;
  }

  .desc span{
    color: #e82c07;
    font-size: 16px;
    border-left: 5px solid #e82c07;
    padding-left: 10px;
  }
  .desc{
    margin-top: 10px;
  }
  .desc p{
    margin-top: 10px;
  }
</style>