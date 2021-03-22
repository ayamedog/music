<template>
  <div class="vue-audio" :class="{'audioshow': $store.state.audioShow}">
    <audio ref="audio" :src="curSong | getUrl" controls="controls"  class="audio-primeval" autoplay="autoplay"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @ended="ended"
    ></audio>
    <div class="audio">
      <!--暂停和开始 上一首/下一首-->
      <div class="audio-left">
        <div class="audio-info" style="float: left" >
          <el-avatar :src="avatar" shape="square" class="audio-avatar"></el-avatar>
          <p>{{ name }}</p>
          <div class="ar">
            <span v-for="(item, index) in ar">{{item.name}}</span>
          </div>
        </div>
        <div class="audio-left-button">
          <i class="fa fa-step-backward" @click="backward"></i>
          <i class="fa fa-pause-circle-o" v-if="audio.playing" @click="startPlayOrPause"></i>
          <i class="fa fa-play-circle-o" v-else  @click="startPlayOrPause"></i>
          <i class="fa fa-step-forward" @click="forward"></i>
        </div>
      </div>
      <!--播放时间和进度条-->
      <div class="audio-center">
        <div class="time">{{ audio.currentTime | formatSecond }}</div>
        <div class="slider-box">
          <el-slider v-model="sliderTime" class="slider"
                     @change="changeCurrentTime" :format-tooltip="formatProcessToolTip"></el-slider>
        </div>
        <div class="time">{{ audio.maxTime| formatSecond }}</div>
        <!--音量-->
        <div class="volume">
        <div class="volume-ico" @click="changeMute">
          <i class="fa fa-volume-up" v-if="volume >50"></i>
          <i class="fa fa-volume-down" v-else-if="volume > 0 "></i>
          <i class="fa fa-volume-off" v-else></i>
        </div>
        <el-slider
            class="volume-slider"
            v-model="volume"
            @change="changeVolume">
        </el-slider>
      </div>
      </div>
      <!--歌词按钮 播放顺序-->
      <div class="audio-right">
          <div class="lrc-button">
            <img src="~assets/images/lrc.png" v-if="!isShow" @click="changeShow">
            <img src="~assets/images/lrcActive.png" v-else @click="changeShow">
          </div>
      </div>
      <!--歌词 -->
      <div class="lyric" :class="{'is-show': isShow}">
        <div ref="lrc">
          <ul v-if="lyric.length !== 0">
            <li v-for="(item, index) in lyric" :class="{'cur-lyric' : lrcActive(index)}">{{item.text}}{{scrollLRC(index)}}</li>
          </ul>
          <h3 v-else>暂无歌词</h3>
        </div>
      </div>
    </div>
    <div class="show" @click="audioshow">
      <i class="fa fa-chevron-up" v-if="$store.state.audioShow"></i>
      <i class="fa fa-chevron-down" v-else></i>
    </div>
  </div>
</template>

<script>
  // 将整数转换成 时：分：秒的格式
  function realFormatSecond(second) {
    var secondType = typeof second

    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)

      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60

      if(hours === 0 ){
        return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      }else{
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      }
    } else {
      return '0:00:00'
    }
  }


  import {songDetail,songLyric} from "@/network/request";

  export default {
    name: "vueAudio",
    created() {
      songDetail(1828102809).then(res => {
        this.name = res.data.songs[0].name
        this.ar = res.data.songs[0].ar
        this.avatar = res.data.songs[0].al.picUrl+'?param=60y60'
        this.songs = res.data.privileges
        this.curSong = this.songs[0].id
        this.curSongIndex = this.$store.state.curSongIndex
        this.getLyric(this.curSong)
      }).catch(err => {
        console.log(err);
      })
    },
    mounted() {
      this.$store.state.audioEvent = this.$refs.audio
    },
    methods: {
      getLyric(id) {
        return songLyric(id).then(res => {
          this.lyric = []
          this.formatLyric(res.data.lrc.lyric)
          // console.log(this.lyric);
        }).catch(err => {
          console.log(err);
        })
      },
      startPlayOrPause() {
        return this.audio.playing ? this.pausePlay() : this.startPlay()
      },
      // 开始播放
      startPlay() {
        this.$refs.audio.play()
      },
      // 暂停
      pausePlay() {
        this.$refs.audio.pause()
      },
      onPlay() {
        this.audio.playing = true
      },
      onPause() {
        this.audio.playing = false
      },
      //每秒更新当前播放时间
      onTimeupdate(res) {
        this.audio.currentTime = res.target.currentTime
        //进度条跟随时间增长
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)

      },
      //获取总时长
      onLoadedmetadata(res) {
        this.audio.maxTime = parseInt(res.target.duration)
      },
      // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
      changeCurrentTime(index) {
        this.$refs.audio.play()
        this.audio.playing = true
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
      },
      //进度条提示
      formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
      },
      // 音量改变
      changeVolume(index = 0) {
        this.$refs.audio.volume = index / 100
        this.volume = index
        this.volumeM = index
        this.$refs.audio.muted = false
        this.audio.muted = false
      },
      //是否静音
      changeMute() {
        this.$refs.audio.muted = !this.$refs.audio.muted
        this.audio.muted = this.$refs.audio.muted
        if(this.$refs.audio.muted) {
          this.volume = 0
        }else{
          this.volume = this.volumeM
        }
      },
      //处理歌词文本
      //传入初始歌词文本text
      formatLyric(text) {
        let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
        let row = arr.length; //获取歌词行数
        for (let i = 0; i < row; i++) {
          let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
          let temp_arr = temp_row.split("]");//我们可以通过“]”对时间和文本进行分离
          let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
          //再对剩下的歌词时间进行处理
          temp_arr.forEach(element => {
            let obj = {};
            let time_arr = element.substr(1, element.length - 1).split(":");//先把多余的“[”去掉，再分离出分、秒
            let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
            obj.time = s;
            obj.text = text;
            this.lyric.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
          });
        }
        this.lyric.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
        // this.$store.commit("setLyric", this.lyric); //把歌词提交到store里，为了重新进入该组件时还能再次渲染
      },
      //设置一下排序规则
      sortRule(a, b) {
        return a.time - b.time;
      },
      //歌词滚动
      lrcActive(index) {
        if(index === this.lyric.length-1){
          return this.audio.currentTime >= this.lyric[index].time
        }else{
          return this.audio.currentTime >= this.lyric[index].time && this.audio.currentTime < this.lyric[index+1].time
        }
      },
      scrollLRC(index) {
        if(index === this.lyric.length-1){
          if(this.audio.currentTime >=this.lyric[index].time) {
            let top = 50 * index;
            if(top > 300){
              this.$refs.lrc.scrollTop= top-250
            }else{
              this.$refs.lrc.scrollTop= 0
            }
          }
        }else  {
          if (this.audio.currentTime >= this.lyric[index].time && this.audio.currentTime < this.lyric[index+1].time){
            // let top = 50 * index;
            // if(top >300){
            //   this.$refs.lrc.style.top = 0+'px'
            // }else{
            //   this.$refs.lrc.style.top = -(50 * index)+'px'
            // }
            let top = 50 * index;
            if(top > 300){
              this.$refs.lrc.scrollTop= top-250
            }else{
              this.$refs.lrc.scrollTop= 0
            }
          }
        }
      },
      //切换歌词显示
      changeShow() {
        this.isShow = !this.isShow
      },
      //播放结束
      ended() {
        if(this.curSongIndex > this.songs.length-1) {
          this.curSongIndex = 0
          this.curSong = this.songs[this.curSongIndex].id
          this.getLyric(this.curSong)
        } else {
          this.curSongIndex = this.curSongIndex + 1
          this.curSong = this.songs[this.curSongIndex].id
          this.getLyric(this.curSong)
        }
        // i++
        // this.curSong = this.songs[i].id
        // console.log(this.curSong)
      },
      //上一首
      backward() {
        if(this.$store.state.curSongIndex ===0) {
          alert('已经是第一首了')
          this.$store.commit('changeIndex')
        } else {
          this.curSongIndex = this.$store.commit('indexCut')
          let s = this.$store.state.songs
          this.curSong = this.songs[this.$store.state.curSongIndex].id
          this.avatar = s[this.$store.state.curSongIndex].al.picUrl + '?param=60y60'
          this.name = s[this.$store.state.curSongIndex].name
          this.ar = s[this.$store.state.curSongIndex].ar
          this.getLyric(this.curSong)
        }
      },
      //下一首
      forward() {
        let index =this.songs.length-1;
        if(this.$store.state.curSongIndex >= this.songs.length-1) {
          alert('已经是最后一首了')
          // this.$store.commit
          this.$store.commit('indexEnd',index)
        } else {
          let s = this.$store.state.songs
          this.curSongIndex = this.$store.commit('indexAdd')
          this.curSong = this.songs[this.$store.state.curSongIndex].id
          this.avatar = s[this.$store.state.curSongIndex].al.picUrl + '?param=60y60'
          this.name = s[this.$store.state.curSongIndex].name
          this.ar = s[this.$store.state.curSongIndex].ar
          this.getLyric(this.curSong)
        }
      },
      audioshow() {
        this.$store.commit('changeAudio')
      }
    },
    data() {
      return {
        name: '', //歌曲名
        ar: '', //作者
        avatar: '',//头像
        songs: '',//歌曲列表
        curSong: '',//当前播放音乐
        curSongIndex: 0,//当前播放音乐的index
        lyric: [],//歌词,
        audio: {
          //是否播放/暂停
          playing: false,
          //当前播放时长
          currentTime: 0,
          //歌曲总时长
          maxTime: 0,
          //是否静音
          isMute: false
        },

        sliderTime: 0,//进度条时间
        volume: 100,
        volumeM: 100,
        isShow: false,
      }
    },
    filters: {
      getUrl(id) {
        return 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
      },
      //将秒转换为分秒
      formatSecond(second = 0) {
        return realFormatSecond(second)
      }
    },
    watch: {
      '$store.state.songs'() {
        let s =this.$store.state.songs
        this.songs = s
        this.curSong = this.songs[0].id
        this.getLyric(this.curSong)
        this.avatar = s[0].al.picUrl + '?param=60y60'
        this.name = s[0].name
        this.ar = s[0].ar
        // songDetail(1828102809).then(res => {
        //   this.name = res.data.songs[0].name
        //   this.ar = res.data.songs[0].ar
        //   this.avatar = res.data.songs[0].al.picUrl + '?param=60y60'
        // })
      },
      '$store.state.curSongIndex'() {
        let s = this.$store.state.songs,
            i = this.$store.state.curSongIndex
        this.songs = s
        this.curSong = this.songs[i].id
        this.avatar = s[i].al.picUrl + '?param=60y60'
        this.name = s[i].name
        this.ar = s[i].ar
        this.getLyric(this.curSong)
      }
    }
  }
</script>

<style scoped>
  .vue-audio{
    height: 70px;
    width: 100%;
    min-width: 1500px;
    background: rgba(255,255,255,1);
    position: fixed;
    bottom: 0;
    transition: bottom .3s;
  }
  div.audioshow{
    bottom: -70px;
  }
  .audio-primeval{
    display: none;
  }
  .show{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #fff;
    border-radius: 5px 5px 0 0;
    position: absolute;
    top: -30px;
    right: 0;
  }

  .audio{
    width: 1500px;
    height: 70px;
    z-index: 9999;
    position: relative;
    margin: 0 auto;
  }

  .audio-left{
    height: 70px;
    line-height: 70px;
    float: left;
  }
  .audio-info{
    position: relative;
    height: 70px;
    width: 250px;
  }
  .audio-info .audio-avatar{
    width: 60px;
    height: 60px;
    position: absolute;
    left: 25px;
    top: 5px;
  }
  .audio-info p{
    color: #000;
    position: absolute;
    top: 2px;
    right: 0;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
    line-height: 30px;
  }
  .audio-info .ar{
    position: absolute;
    bottom: 5px;
    right: 0;
    width: 150px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .audio-left-button{
    float: left;
    position: relative;
    height: 70px;
    width: 120px;
    color: #4a4a4a;
  }
  .fa-play-circle-o,.fa-pause-circle-o{
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .fa-step-backward,.fa-step-forward{
    font-size: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .fa-step-backward{
    left: 0;
  }
  .fa-step-forward{
    right: 0;
  }
  .fa-pause-circle-o:hover{
    color: #e82c07;
  }
  .fa-play-circle-o:hover{
    color: #e82c07;
  }
  .fa-step-backward:hover{
    color: #e82c07;
  }
  .fa-step-forward:hover{
    color: #e82c07;
  }

  .audio-center{
    float: left;
    margin-left: 30px;
  }
  .audio-center div{
    float: left;
    height: 70px;
    line-height: 70px;
    margin-left: 10px;
  }
  .audio-center .slider-box{
    position: relative;
    overflow: hidden;
  }
  .audio-center .slider-box .slider{
    margin-top: 15px;
    height: 70px;
  }
  .audio-center .volume{
    width: 270px;
  }
  .audio-center .volume-ico{
    font-size: 30px;
    width: 30px;
    color: #4a4a4a;
    cursor: pointer;
    margin-right: 20px;
  }
  .audio-center .volume-slider{
    margin-top: 14px;
  }
  .volume-slider{
    width: 200px;
  }
  .slider{
    width: 500px;
    display: inline-block;
    margin: 0 10px;
  }

  .audio-right{
    float: left;
    height: 70px;
    width: 100px;
    margin-left: 30px;
    position: relative;
  }
  .audio-right .lrc-button{
    position: relative;
    height: 70px;
  }
  .audio-right .lrc-button img{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .lyric{
    z-index: 0;
    opacity: 0;
    pointer-events: none;
    transition: all .3s;
    position: absolute;
    bottom: -150px; /*70*/
    right: 0;
    overflow: hidden;
    height: 550px;
    width: 600px;
    text-align: center;
    background: #fff;
    border-radius: 15px 15px 0 0;
  }
  div.is-show{
    z-index: 888;
    opacity: 1;
    pointer-events: auto;
    bottom: 70px;
  }
  .lyric div{
    z-index: 889;
    position: absolute;
    top: 20px;
    width: 100%;
    height: 550px;
    max-height: 550px;
    max-width: 600px;
    overflow-x: hidden;
    overflow-y: scroll;
    /*滚动条效果*/
    scroll-behavior: smooth;
    /*火狐浏览器隐藏滚动条*/
    scrollbar-width:none;
    /*IE10+ 隐藏滚动条*/
    -ms-overflow-style:none;
  }
  .lyric div ul{
    z-index: 898;
    width: 100%;
    position: absolute;
    top: 0;
    transition: all .2s;
  }
  .lyric li{
    width: 100%;
    text-align: center;
    list-style: none;
    height: 50px;
  }
  /*chrome和Safari浏览器隐藏滚动条*/
  .lyric div::-webkit-scrollbar{
    display: none;
  }
  .cur-lyric{
    color: #e82c07;
  }
  ::v-deep .el-slider__bar{
    color: #e82c07;
    background: #e82c07;
  }
  ::v-deep .el-slider__button{
    border: 2px solid #e82c07;
  }
</style>