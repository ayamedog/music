<template>
  <div class="search-songs">
    <h4>搜索"{{ keywords}}"，找到<span class="count">{{ count }}</span>首单曲</h4>
    <playlist-songs :songs="songs" v-if="!isShow"></playlist-songs>
    <loading v-if="isShow"></loading>
    <div class="page-box">
      <el-pagination
          class="page"
          slot="page"
          background
          layout="prev, pager, next"
          :current-page="curpage"
          @current-change="pageClick"
          :total="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PlaylistSongs from "@/components/content/playlist/playlistSongs";
import {search,songDetail} from "@/network/request";
import Loading from "@/components/common/loading/loading";

export default {
  name: "searchSongs",
  components: {Loading, PlaylistSongs},
  created() {
    this.keywords = this.$route.query.keywords
    this.searchInfo().then(res => {
      let count = res.data.result.songCount
      this.count = count
      this.page = Math.ceil(count / 30)*10
      let allSongs = res.data.result.songs
      let songs = []
      for (let songId of allSongs) {
        songs.push(songId.id)
      }
      let ids = songs.join()
      this.getSongs(ids)
    }).catch(err => err)
  },
  data() {
    return {
      songs: '',
      keywords: '',
      count: 0,
      curpage: 1,
      page: 0,
      isShow: false
    }
  },
  methods: {
    searchInfo() {
      return search({
        params: {
          keywords: this.keywords,
          limit: 30,
          type: 1, //歌单 1000
        }
      })
    },
    getSongs(ids) {
      return songDetail(ids).then(res => {
        this.songs = res.data.songs
      }).catch(err => {
        console.log(err);
      })
    },
    pageClick(c) {
      this.curpage = c
      this.isShow = !this.isShow
      window.scrollTo(0,0);
      search({
        params: {
          keywords: this.keywords,
          limit: 30,
          type: 1, //歌单 1000,
          offset: (this.curpage - 1) *30
        }
      }).then(res => {this.isShow = !this.isShow
        let allSongs = res.data.result.songs
        let songs = []
        for (let songId of allSongs) {
          songs.push(songId.id)
        }
        let ids = songs.join()
        this.getSongs(ids)
      })
    }
  },
  watch: {
    $route() {
      this.isShow = !this.isShow
      this.keywords = this.$route.query.keywords
      this.searchInfo().then(res => {
        this.isShow = !this.isShow
        this.curpage = 1
        let count = res.data.result.songCount
        this.count = count
        this.page = Math.ceil(count / 30)*10
        let allSongs = res.data.result.songs
        let songs = []
        for (let songId of allSongs) {
          songs.push(songId.id)
        }
        let ids = songs.join()
        this.getSongs(ids)
      }).catch(err => err)
    }
  }
}
</script>

<style scoped>
  ::v-deep .song-play-box{
    display: none;
  }
  .page-box{
    width: 100%;
    height: 40px;
    margin-top: 10px;
    position: relative;
  }
  .page{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .search-songs h4{
    margin-left: 38px;
    margin-bottom: 15px;
  }
  .search-songs h4 span{
    color: #e82c07;
  }
</style>