<template>
  <div class="related-list">
    <h3 class="re-title">相关歌单</h3>
    <ul>
      <li v-for="(item, index) in related">
        <router-link :to="{path: '/playlist-details/url',query:{id: item.id}}" tag="a">
          <el-avatar class="re-avatar" :src="item.coverImgUrl" shape="square" :size="60"></el-avatar>
          <p class="re-name">{{item.name}}</p>
          <p class="re-creatorl">By {{item.creator.nickname}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "relatedList",
  props: {
    related: [String,Object,Array]
  }
}
</script>

<style scoped>
  .re-title{
    padding-left: 10px;
    border-left: solid 5px #e82c07;
    color: #000;
  }
  li{
    list-style: none;
    margin-top: 10px;
    height: 80px;
    position: relative;
  }
  .re-avatar{
    float: left;
    margin-top: 10px;
  }
  .re-name{
    display: -webkit-box;     /* 弹性盒旧式语法 */
    -webkit-box-orient: vertical;    /* 经过个人实测，vertical或horizontal都没问题，只是必须设置该属性 */
    -webkit-line-clamp: 2;    /* 限制两行 */
    overflow: hidden;
    padding-top: 10px;
    padding-left: 5px;
    color: #000;
  }
  .related-list li:hover .re-name{
    color: #e82c07;
  }
  .re-creatorl{
    position: absolute;
    bottom: 10px;
    left: 70px;
  }
</style>