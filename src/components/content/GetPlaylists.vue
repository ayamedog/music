<template>
  <div class="playlist-box1">
    <div class="playlist-cont">
      <div class="playlist-songs" v-for="(item, index) in playlists">
        <router-link to="/123" tag="a">
          <div class="playlist-song-pic">
            <span class="play-count">{{playCount(item.playCount)}}</span>
            <img :src='item.picUrl || item.coverImgUrl' alt="">
          </div>
          <p class="playlist-song-name">{{item.name}}</p>
        </router-link>
      </div>
      <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: "GetPlaylists",
  props: {
    playlists: ''
  },
  computed: {
    playCount() {
      return function (pc) {
        if(pc < 9999){
          return pc
        }else if(pc<99999999){
          return Math.round(pc / 10000) + '万'
        }else{
          return (pc / 100000000).toFixed(1) + '亿'
        }
      }
    }
  }
}
</script>

<style scoped>
  .playlist-cont{
    display: flex;
    flex-wrap: wrap;
    width: 1350px;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-left: 50px;
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
  }
  .playlist-cont a{
    display: inline-block;
  }
  .playlist-songs{
    flex: 0 0 16.66%;/*width 165px */
    width: 150px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .playlist-songs .playlist-song-pic{
    position: relative;
  }
  .playlist-songs .playlist-song-pic .play-count{
    position: absolute;
    top: 5px;
    right: 3px;
    padding: 2px 10px;
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0,0,0,1);
  }
  .playlist-songs .playlist-song-pic img{
    border-radius: 5px;
    width: 158px;
    height: 158px;
    margin: 0 auto;
    box-shadow: 5px 5px 3px #666666;
    transition: box-shadow .3s;
  }
  .playlist-songs .playlist-song-pic img:hover{
    box-shadow: 6px 6px 3px #e04040;
  }
  .playlist-song-name{
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