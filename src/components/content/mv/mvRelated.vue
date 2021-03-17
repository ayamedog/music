<template>
  <div class="mv-related">
    <div class="related-item" v-for="(item, index) in reData" @click="mvDetails(item.id)">
      <div class="related-pic">
        <i class="fa fa-youtube-play"></i>
        <img :src="item.cover" alt="">
      </div>
      <p class="title">{{item.name}}</p>
      <p class="artists">
        By 
        <span v-for="(item2, index2) in item.artists">{{item2.name}}<span v-if="index2 !== item.artists.length-1">/</span></span>
      </p>
    </div>
  </div>
</template>

<script>
import {mvRelated} from "@/network/request";
export default {
  name: "mvRelated",
  created() {
    mvRelated({
      params: {
        mvid: this.id
      }
    }).then(res => {
      this.reData = res.data.mvs

    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      id: this.$route.query.id,
      reData: ''
    }
  },
  watch:{
    $route() {
      let id = this.$route.query.id
      mvRelated({
        params: {
          mvid: id
        }
      }).then(res => {
        this.reData = res.data.mvs
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  methods: {
    mvDetails(id) {
      this.$store.commit('mvidUpdate',id)
      this.$router.push({
        path: '/mv-detail/url',
        query:{id: id}
      }).catch(err => err)
    }
  }
}
</script>

<style scoped>
  .related-item{
    position: relative;
    width: 320px;

    max-width: 320px;
    margin-top: 10px;
    cursor: pointer;
  }
  .related-item .related-pic{
    position: relative;
  }
  .related-item .related-pic .fa-youtube-play{
    position: absolute;
    top: 50%;
    left: 50%;
    color: #e82c07;
    font-size: 30px;
    opacity: 0;
    transform: translate(-50%,-50%);
    transition: all .3s;
    }
  .related-item:hover .related-pic .fa-youtube-play{
    font-size: 50px;
    opacity: 1;
  }
  .related-item .related-pic img{
    width: 320px;
    height: auto;
  }
  .related-item .title{
    width: 320px;
    color: #1e272e;
    font-size: 16px;
    font-weight: bold;
    max-height: 54px;
    margin-top: 5px;
    overflow: hidden;
  }
  .related-item p{
    margin-left: 10px;
  }
  .related-item .artists{
    font-size: 14px;
    margin-top: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>