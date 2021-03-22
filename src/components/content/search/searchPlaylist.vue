<template>
  <div class="search-playlsit">
    <h4>搜索"{{ keywords}}"，找到<span class="count">{{ count }}</span>个歌单</h4>
    <get-playlists :playlists="playlist" class="playlist" :class="{isloading:isShow}">
      <loading :class="{isloading:!isShow}" slot="loading"></loading>
      <el-pagination
          class="page"
          slot="page"
          background
          layout="prev, pager, next"
          :current-page="curpage"
          @current-change="pageClick"
          :total="page">
      </el-pagination>
    </get-playlists>
  </div>
</template>

<script>
import {search} from "@/network/request";
import GetPlaylists from "@/components/content/GetPlaylists";
import Loading from "@/components/common/loading/loading";
export default {
  name: "searchPlaylist",
  components: {Loading, GetPlaylists},
  created() {
    this.keywords = this.$route.query.keywords
    this.searchInfo().then(res => {
      let count = res.data.result.playlistCount
      this.count = count
      this.playlist = res.data.result.playlists
      this.page = Math.ceil(count / 30)*10
    }).catch(err => err)
  },
  watch: {
    $route() {
      this.isShow =!this.isShow
      this.keywords = this.$route.query.keywords
      this.searchInfo().then(res => {this.isShow =!this.isShow
        let count = res.data.result.playlistCount
        this.count = count
        this.curpage = 1
        this.playlist = res.data.result.playlists
        this.page = Math.ceil(count / 30)*10
        console.log(res)
      }).catch(err => err)
    }
  },
  data() {
    return {
      playlist: '',
      keywords: '',
      page: 0,
      curpage: 1,
      isShow: false,
      count: ''
    }
  },
  methods: {
    searchInfo() {
      return search({
        params: {
          keywords: this.keywords,
          limit: 30,
          type: 1000, //歌单 1000
        }
      })
    },
    pageClick(c) {
      this.curpage = c
      this.isShow = !this.isShow
      window.scrollTo(0,0);
      search({
        params: {
          keywords: this.keywords,
          limit:30,
          offset: (this.curpage - 1)*30,
          type:1000
        }
      }).then(res => {
        this.playlist = res.data.result.playlists
        this.isShow = !this.isShow
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
  .search-playlsit h4{
    margin-left: 38px;
  }
  .search-playlsit h4 span{
    color: #e82c07;
  }
  .playlist{
    margin-left: -13px;
  }
  .page{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }
  ::v-deep .playlist-cont{
    background: none;
    padding-top: 20px;
  }
  ::v-deep .isloading .playlist-songs{
    display: none;
  }
  ::v-deep #loading.isloading{
    display: none;
  }
</style>