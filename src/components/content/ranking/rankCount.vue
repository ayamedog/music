<template>
  <div class="rank-box">
    <div class="rank-item" v-for="(item, index) in rankData">
      <router-link :to="{path: '/playlist-details/url',query:{id: item.id}}">
        <div class="rank-pic">
          <img :src="item.coverImgUrl">
          <span class="play-count">{{playCount(item.playCount)}}</span>
          <span class="get-time">{{getTime(item.trackNumberUpdateTime)}} 更新</span>
          <i class="fa fa-play"></i>
        </div>
        <p class="rank-name">{{item.name}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankCount",
  props: {
    rankData: [String,Number,Array],
  },
  computed: {
    playCount() {
      return function (pc) {
        if(pc < 9999){
          return pc
        }else if(pc<99999999){
          return Math.round(pc / 10000) + '万'
        }else{
          return parseInt(pc / 100000000) + '亿'
        }
      }
    },
    getTime() {
      return  function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        // var h = date.getHours() + ':';
        // var m = date.getMinutes() + ':';
        // var s = date.getSeconds();
        // return Y + M + D + h + m + s;
        return Y + M + D;
      }
    }
  }
}
</script>

<style scoped>
  .rank-box{
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: left;
    padding-left: 30px;
    padding-top: 30px;
  }
  .rank-item{
    flex: 0 0 16.66%;
    width: 150px;
    overflow: hidden;
    position: relative;
  }
  .rank-item a{
    display: inline-block;
  }
  .rank-item .rank-pic{
    position: relative;
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 5px;
  }
  .rank-item .rank-pic img{
    width: 100%;
    height: 100%;
  }

  .rank-name{
    text-align: center;
    font-weight: bold;
    width: 150px;
    height: 37px;
    overflow: hidden;
    margin-top: 15px;
    color: #000;
  }

  .rank-item .play-count{
    position: absolute;
    top: 5px;
    right: 3px;
    padding: 2px 10px;
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0,0,0,0.6);
  }
  .rank-item .get-time{
    position: relative;
    bottom: 27px;
    left: 11%;
    padding: 2px 10px;
    font-size: 14px;
    border-radius: 5px;
    color: #fff;
    background: rgba(0,0,0,0.6);
  }
  .rank-item .fa-play{
    color: #e82c07;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(-180deg);
    font-size: 30px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    text-indent: 6px;
    line-height: 50px;
    background: rgba(255,255,255,0.6);
    opacity: 0;
    transition: all .3s;
  }
  .rank-pic:hover .fa-play{
    transform: translate(-50%,-50%) rotate(0deg);
    opacity: 1;
  }
</style>