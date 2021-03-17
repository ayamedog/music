<template>
  <div class="detailsLeft">
    <div class="cover-img">
      <img :src="coverImgUrl" alt="">
    </div>
    <div class="list-info">
      <h2 class="list-name">{{name}}</h2>
      <div class="user">
        <el-avatar :src="userAvatar" class="user-avatar"></el-avatar>
        <div class="user-cont">
          <span class="user-name">{{userName}}</span>
          <span class="create-time">{{createTime | getTime}} 创建</span>
        </div>
        
      </div>
      <div class="tags">
          标签: <span class="tag" v-for="(item, index) in tags">{{item}}</span>
       </div>
      <div class="desc">
        <p class="desc-title">简介</p>
        <p class="desc-cont" v-if="description !== ''">{{description}}</p>
        <p class="desc-cont" v-else>暂无简介</p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "detailsLeft",
  props: {
    data: [String,Array,Object,Number],
    id: [String,Number],
    userName: [String,Number],
    coverImgUrl: [String,Number],
    name: [String,Number],
    createTime: [String,Number],
    userAvatar: [String,Number],
    tags: [Object,Array,String],
    description: [String]
  },
  filters: {
    getTime(timestamp) {
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
  },
}
</script>

<style scoped>
  .detailsLeft{
    position: relative;
    /*height:280px;*/
    margin-bottom: 35px;
  }
  .cover-img{
    width: 200px;
    display: inline-block;
    height: 200px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: #6d7685 4px 4px 2px;
  }
  .cover-img img{
    width: 100%;
    height: 100%;
  }

  .list-info{
    float: right;
    width: 75%;
    margin-top: 10px;
  }
  .list-info .list-name{
    overflow: hidden;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user{
    margin-top: 10px;
    height: 55px;
  }
  .user span{
    margin-right: 10px;
    font-size: 16px;
    color: #000;
  }
  .user .user-avatar{
    float: left;
  }
  .user .user-cont{
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }
  .user-cont .create-time{
    font-size: 14px;
    color: #666666;
  }
  .user-cont .user-name:hover{
    color: #e82c07;
  }

  .tags{
    color: #000;
    margin-bottom: 10px;
  }
  .tags .tag{
    padding: 2px 10px;
    background: #e82c07;
    color: #fff;
    border-radius: 10px;
    margin-left: 10px;
  }

  .desc .desc-title{
    color: #000;
    padding-left: 10px;
    border-left: 5px solid #e82c07;
    margin-bottom: 10px;
  }
  .desc .desc-cont{
    color: #000;
    clear: both;
    display: -webkit-box;     /* 弹性盒旧式语法 */
    -webkit-box-orient: vertical;    /* 经过个人实测，vertical或horizontal都没问题，只是必须设置该属性 */
    -webkit-line-clamp: 3;    /* 限制两行 */
    overflow: hidden;
  }
</style>