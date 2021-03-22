<template>
  <div class="search-mv">
    <h4>搜索"{{ keywords}}"，找到<span class="count">{{ count }}</span>个MV</h4>
    <mv-count :mvData="mvData">
      <el-pagination
          class="page"
          slot="mv-page"
          background
          layout="prev, pager, next"
          :current-page="curpage"
          @current-change="pageClick"
          :total="page">
      </el-pagination>
    </mv-count>
  </div>
</template>

<script>
import MvCount from "@/components/content/mv/mvCount";
import {search} from "@/network/request";

export default {
  name: "searchMv",
  components: {MvCount},
  created() {
    this.keywords = this.$route.query.keywords
    this.searchInfo().then(res => {
      let count = res.data.result.mvCount
      this.count = count
      this.mvData = res.data.result.mvs
      this.page = Math.ceil(count / 28)*10
      console.log(res);
    }).catch(err => err)
  },
  watch: {
    $route() {
      this.isShow =!this.isShow
      this.keywords = this.$route.query.keywords
      this.searchInfo().then(res => {
        this.isShow =!this.isShow
        let count = res.data.result.mvCount
        this.count = count
        this.curpage = 1
        this.mvData = res.data.result.mvs
        this.page = Math.ceil(count / 28)*10
        console.log(res)
      }).catch(err => err)
    }
  },
  data() {
    return {
      mvData: '',
      isShow: false,
      keywords: '',
      count: 0,
      page: 0,
      curpage: 1,
    }
  },
  methods: {
    searchInfo() {
      return search({
        params: {
          keywords: this.keywords,
          limit: 28,
          type: 1004, //歌单 1000
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
          limit:28,
          offset: (this.curpage - 1)*28,
          type:1004
        }
      }).then(res => {
        this.mvData = res.data.result.mvs
        this.isShow = !this.isShow
      }).catch(err => {
        console.log(err);
      })
    },

  }
}
</script>

<style scoped>
  .search-mv h4{
    margin-left: 38px;
  }
  .search-mv h4 span{
    color: #e82c07;
  }
  .page{
    margin: 0 auto;
  }
  ::v-deep .mv-box{
    background: none;
  }
</style>