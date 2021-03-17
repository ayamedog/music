<template>
  <div class="mv-comment">
    <h3 class="title"><slot name="title"></slot></h3>
    <ul class="comment-box">
      <li v-for="(item, index) in data">
        <div class="avatar">
          <el-avatar :src="item.user.avatarUrl"
                     :size="50"
          ></el-avatar>
        </div>
        <div class="user-info">
          <span class="nickname">{{item.user.nickname}}</span>
          <span class="time">{{ formatMsgTime(item.time) }}</span>
          <span class="likes"><i class="fa fa-thumbs-o-up"></i> {{$store.getters.playCount(item.likedCount)}}</span>
        </div>
        <div class="com">
            <div class="content">{{item.content}}
<!--              <div class="replied" v-if="item.beReplied.length !== 0">-->
              <div class="replied" v-for="(item2, index) in item.beReplied">
                <span class="replied-name">@{{item.beReplied[0].user.nickname}}:</span>
                {{item.beReplied[0].content}}
              </div>
            </div>
        </div>
      </li>
    </ul>
    <slot name="page"></slot>
  </div>
</template>

<script>
export default {
  name: "mvComment",
  props: {
    data: [String,Object,Array,Number]
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
  .mv-comment{
    border-top: 1px solid #6d7685;
    padding-top: 20px;
  }
  .mv-comment .title{
    color: #000;
    padding-left: 10px;
    border-left: 5px solid #e82c07;
    margin-bottom: 15px;
  }
  .comment-box li{
    list-style: none;
    width: 100%;
    padding-top: 3px;
    padding-left: 60px;
    position: relative;
    margin-bottom: 20px;
  }

  .avatar{
    position: absolute;
    top: 0;
    left: 0;
  }
  .user-info{
    margin-bottom: 8px;
  }
  .user-info .nickname{
    color: #000;
    font-weight: bold;
    font-size: 18px;
  }
  .user-info .time{
    font-size: 14px;
    margin-left: 15px;
  }
  .user-info .likes{
    float: right;
    margin-right: 10px;
  }
  .com{
    background: #dcdcdc;
    margin-top: 3px;border-radius: 5px;
  }
  .com .content{
    padding: 8px 10px;
    color: #474747;
    font-size: 14px;

  }
  .com .replied{
    border-radius: 5px;
    margin-top: 5px;
    background: #fff;
    padding: 8px 10px;
  }
  .replied .replied-name{
    color: #e82c07;
  }
</style>