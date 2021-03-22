<template>
  <div class="mv-box">
    <slot name="mv-options"></slot>
    <div class="mv-cont">
      <div class="mv-item" v-if="isshow" v-for="(item, index) in mvData" @click="mvDetails(item.id)">
        <div class="mv-pic">
          <img :src='item.cover || item.picUrl' alt="">
          <div class="mv-info">
            <span class="mv-artist">{{item.artistName}}</span>
            <span class="mv-duration">{{mvDuration(item.duration)}}</span>
          </div>
          <i class="fa fa-youtube-play"></i>
        </div>
        <span class="mv-playcount"><i class="fa fa-youtube-play"></i>{{mvPlayCount(item.playCount)}}</span>
        <div class="mv-name"><p>{{item.name}}</p></div>
      </div>
    </div>
    <slot name="mv-loading"></slot>
    <slot name="mv-page"></slot>
  </div>
</template>

<script>
export default {
  name: "mvCount",
  computed: {
    mvPlayCount() {
      return function (pc) {
        if(pc < 9999) {
          return pc
        }else{
          return Math.round(pc / 10000) + '万'
        }
      }
    },
    mvDuration() {
      return function (d) {
        let min = parseInt(d / 1000 / 60);
        let sec = parseInt((d / 1000) % 60);
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        return `${min} : ${sec}`
      }
    },
  },
  props: {
    mvData: [String,Number,Array],
    isshow: {
      default: true
    }
  },
  methods: {
    mvDetails(id) {
      this.$store.commit('mvidUpdate',id)
      this.$store.commit('hideAudio')
      let e = this.$store.state.audioEvent
      e.pause()
      this.$router.push({
        path: '/mv-detail/url',
        query:{id: id}
      }).catch(err => err)
    }
  }
}
</script>

<style scoped>
.mv-box{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 30px 50px 20px 50px;
  background: rgba(255,255,255,0.6);
  border-radius: 15px;
  margin-bottom: 30px;
}

.mv-options ul{
  width: 100%;
  height: 30px;
  padding-left: 20px;
  margin-bottom: 20px;
}
.mv-options li {
  list-style: none;
  float: left;
  color: #1e272e;
  line-height: 30px;
  margin-right: 20px;
  padding: 0 10px;
  cursor: pointer;
}
.mv-options li.active{
  color: #fff;
  background: #fa2800;
  border-radius: 15px;

}
.mv-cont{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.mv-cont .mv-item{
  max-width: 24%;
  width: 24%;
  overflow: hidden;
  margin-left: 11px;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;
}

.mv-cont .mv-item .mv-pic{
  position: relative;
  width: 300px;
  height: 173px;
}
.mv-cont .mv-item .mv-pic .fa-youtube-play{
  font-size: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fa2800;
  opacity: 0;
  transition: all .3s;
}
.mv-cont .mv-item:hover .mv-pic .fa-youtube-play{
  opacity: 1;
  font-size: 50px;
}

.mv-cont .mv-item .mv-pic .mv-info{
  position: absolute;
  bottom: 4px;
  left: 0;
  height: 30px;
  width: 100%;
  background: rgba(0,0,0,0.5);
}
.mv-cont .mv-item .mv-pic .mv-info span{
  line-height: 30px;
}
.mv-cont .mv-item .mv-pic .mv-info .mv-artist{
  float: left;
  margin-left: 8px;
  color: #fff;
}
.mv-cont .mv-item .mv-pic .mv-info .mv-duration{
  float: right;
  margin-right: 8px;
  color: #fff;
}
.mv-cont .mv-item .mv-pic img{
  width: 100%;
  height: auto;
}

.mv-cont .mv-item .mv-playcount{
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 10px;
  font-size: 14px;
  border-radius: 5px;
  color: #fff;
  background: rgba(0,0,0,0.6);
}
.mv-cont .mv-item .mv-playcount .fa-youtube-play{
  margin-right: 5px;
}
.mv-cont .mv-item .mv-name p{
  margin-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #4a4a4a;
}
</style>