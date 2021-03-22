<template>
  <div class="details-songs">
    <div class="song-play-box">
      <h3 class="song-play" @click="getSongs"><img src="~assets/images/play.png">播放全部</h3>
    </div>
    <ul>
      <li class="d-title">
        <span class="d-index"></span>
        <span class="d-name">音乐标题</span>
        <span class="d-ar">歌手</span>
        <span class="d-al">专辑</span>
        <span class="d-dt">时长</span>
      </li>
      <li v-for="(item, index) in songs" class="d-cont">
        <span class="index-cont" @click="curSongs(index)"><span class="cont1">{{ index + 1 }}</span>
          <i class="fa fa-play-circle-o"></i>
        </span>
        <span class="name-cont">
          <el-avatar :src="item.al.picUrl+'?param=100y100'" shape="square" class="name-avatar"></el-avatar>
          <span class="name-text">{{item.name}}</span></span>
        <span class="ar-cont">{{item.ar[0].name}}</span>
        <span class="al-cont">{{item.al.name}}</span>
        <span class="dt-cont">{{item.dt | formatTime}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "playlistSongs",
  props: {
    songs: ''
  },
  filters: {
    //获取歌曲时间 毫秒转换分：秒
    formatTime(time) {
      // 取整
      time = ~~time
      var formatTime
      if (time < 10) {
        formatTime = '00:0' + time
      } else if (time < 60) {
        formatTime = '00:' + time
      } else {
        var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
        if (m < 10) {
          m = '0' + m
        }
        var s = ~~parseInt((time % (1000 * 60)) / 1000)
        if (s < 10) {
          s = '0' + s
        }
        formatTime = m + ':' + s
      }
      return formatTime
    },
  },
  methods: {
    getSongs() {
      this.$store.commit('getSongs','')
      this.$store.commit('getSongs',this.songs)
      this.$store.commit('showAudio')
      this.$store.commit('changeIndex')
      console.log(this.$store.state.songs)
    },
    curSongs(i) {
      this.$store.commit('getSongs','')
      this.$store.commit('getSongs',this.songs)
      this.$store.commit('getSongsIndex',i)
      this.$store.commit('showAudio')
    }
  }
}
</script>

<style scoped>
.details-songs ul{
  min-height: 700px;
}
  .details-songs li{
    list-style: none;
    height: 50px;
    line-height: 50px;
    display: flex;
  }
  li span{
    display: inline-block;
  }
  .details-songs li:nth-child(odd){
    background: rgba(205, 205, 205, 0.6);
  }

  .d-title{
    color: #6d7685;
  }
  .d-cont{
    color: #000;
    cursor: pointer;
    transition: all .3s;
  }
  .d-cont .index-cont .fa-play-circle-o{
    color: #e82c07;
    display: none;
    font-size: 20px;
    margin-top: 15px;
  }
  .d-cont .index-cont .cont1{
    display: block;
  }
  .d-cont:hover .index-cont .cont1{
    display: none;
  }
  .d-cont:hover .index-cont .fa-play-circle-o{
    display: block;
  }
  .details-songs .d-cont:hover{
    background: rgba(160, 160, 160, 0.6);
  }
  .d-title .d-index,.index-cont{
    width: 80px;
    text-align: center;
  }
  .d-title .d-name,.name-cont{
    width: 320px;
    position: relative;
  }
  .name-cont .name-avatar{
    position: absolute;
    top: 5px;
  }
  .name-cont .name-text{
    text-indent: 50px;
    padding-right: 30px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .d-title .d-ar,.ar-cont,.d-title .d-al,.al-cont{
    width: 225px;
    text-indent: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 30px;
  }
  .d-title .d-dt,.dt-cont{
    width: 70px;
  }

  .song-play-box{
    margin-bottom: 20px;
    height: 41px;
    position: relative;
  }
  .song-play{
    text-align: center;
    cursor: pointer;
    text-indent: 15px;
    border-radius: 15px;
    position: absolute;
    top: 0;
    right: 30px;
    padding: 10px 20px;
    width: 150px;
    color: #fff;
    background: #e82c07;
  }
  .song-play img{
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
  }
</style>