<template>
  <div id="reco-songs">
    <div class="reco-title"><h2>推荐歌单</h2></div>
    <div class="reco-cont">
<!--      TODO 这里之后要做歌单页面 -->
        <div class="reco-songs" v-for="(item, index) in recosongs">
          <router-link to="/123" tag="a">
            <div class="reco-song-pic">
              <span class="play-count">{{playCount(item.playCount)}}</span>
              <img :src='item.picUrl' alt="">
            </div>
            <p class="reco-song-name">{{item.name}}</p>
          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RecommendSongs",
  created() {
    axios.get('http://localhost:3000/personalized?limit=24')
    .then(res => {
      this.recosongs = res.data.result;
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      recosongs: ''
    }
  },
  computed: {
    playCount() {
      return function (pc) {
        return Math.round(pc / 10000) + '万'
      }
    }
  }
}
</script>

<style scoped>
  #reco-songs{
    margin-top: 30px;
  }

  .reco-title{
    height: 30px;
    margin-bottom: 40px;
  }
  .reco-title h2{
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

  .reco-cont{
    display: flex;
    flex-wrap: wrap;
    width: 1350px;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 50px;
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
  }
  .reco-cont a{
    display: inline-block;
  }
  .reco-songs{
    flex: 0 0 16.66%;/*width 165px */
    width: 150px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .reco-songs .reco-song-pic{
    position: relative;
  }
  .reco-songs .reco-song-pic .play-count{
    position: absolute;
    top: 5px;
    right: 3px;
    padding: 2px 10px;
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0,0,0,1);
  }
  .reco-songs .reco-song-pic img{
    border-radius: 5px;
    width: 158px;
    height: 158px;
    margin: 0 auto;
    box-shadow: 5px 5px 3px #666666;
    transition: box-shadow .3s;
  }
  .reco-songs .reco-song-pic img:hover{
    box-shadow: 6px 6px 3px #e04040;
  }
  .reco-song-name{
    padding-left: 4px;
    margin-top: 7px;
    width: 158px;
    font-size: 14px;
    color: #1e272e;
    letter-spacing: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient:vertical;
    font-weight: bold;
  }
</style>