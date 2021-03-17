<template>
  <div class="playlist-hot">
    <h3 class="hot-title">精彩评论</h3>
    <ul v-if="comments.length !==0">
      <li v-for="(item, index) in comments">
        <el-avatar :src="item.user.avatarUrl+'?param=40y40'" class="hot-avatar"></el-avatar>
        <p class="hot-name">{{item.user.nickname}}<span>{{formatMsgTime(item.time)}}</span></p>
        <p class="hot-cont">{{item.content}}</p>
      </li>
    </ul>
    <div class="none" v-else>
     <h3>暂无评论</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlistHot",
  props: {
    comments: [String,Object,Array]
  },
  computed: {
    formatMsgTime() {
      return function (dateTimeStamp) {
        var result = ''
        var minute = 1000 * 60
        var hour = minute * 60
        var day = hour * 24
        var month = day * 30
        var now = new Date().getTime()
        var diffValue = now - dateTimeStamp
        if (diffValue < 0) return
        var monthC = diffValue / month
        var weekC = diffValue / (7 * day)
        var dayC = diffValue / day
        var hourC = diffValue / hour
        var minC = diffValue / minute
        if (monthC >= 1) {
          result = '' + parseInt(monthC) + '月前'
        } else if (weekC >= 1) {
          result = '' + parseInt(weekC) + '周前'
        } else if (dayC >= 1) {
          result = '' + parseInt(dayC) + '天前'
        } else if (hourC >= 1) {
          result = '' + parseInt(hourC) + '小时前'
        } else if (minC >= 1) {
          result = '' + parseInt(minC) + '分钟前'
        } else {
          result = '刚刚'
        }
        return result
      }
    }
  }
}
</script>

<style scoped>
  .hot-title{
    padding-left: 10px;
    border-left: solid 5px #e82c07;
    color: #000;
  }
  li{
    list-style: none;
    position: relative;
    padding-left: 45px;
    margin-top: 15px;
  }
  .hot-avatar{
    position: absolute;
    top: 0;
    left: 0;
  }
  .hot-name{
    color: #000;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .hot-name span{
    font-size: 14px;
    color: #666666;
    margin-left: 10px;
    font-weight: normal;
  }
  .hot-cont{
    background: #e0e0e0;
    border-radius: 5px;
    padding: 5px;
    font-size: 14px;
    color: #666;
  }

  .none{
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
  }
</style>