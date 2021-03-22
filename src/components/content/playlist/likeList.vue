<template>
  <div class="like-list">
    <h3 class="like-title">喜欢这个歌单的人</h3>
    <div class="like-avatar">
      <img v-for="(item, index) in subscribers" :src="item.avatarUrl +'?param=50y50y'" :alt="item.nickname" :title="item.nickname">
    </div>
  </div>
</template>

<script>
export default {
  name: "likeList",
  props:{
    subscribers: [String,Array,Object]
  }
}
</script>

<style scoped>
  .like-title{
    border-left: 5px solid #e82c07;
    padding-left: 10px;
    color: #000;
  }
  .like-avatar{
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }
  .like-avatar img{
    margin-top: 8px;
    width: 50px;
    height: 50px;
    margin-left: 14px;
  }
</style>