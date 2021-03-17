<template>
  <div class="all-com">
    <mv-comment :data="data">
      <span slot="title">最新评论</span>
      <div slot="page" class="com-page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="page*10"
            :current-page=cur
            @current-change="pageClick"
            class="page1"
        >
        </el-pagination>
      </div>
    </mv-comment>
  </div>
</template>

<script>
import {mvAll, mvRelated} from "@/network/request";
import mvComment from "@/components/content/mv/mvComment";

export default {
  name: "allComment",
  components: {
    mvComment
  },
  created() {
    this.getMvAll()
    .then(res => {
      this.data= res.data.comments
      this.count = res.data.total
      console.log(res)
      console.log(this.count)
      this.page = Math.ceil(res.data.total / 20)
    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    getMvAll() {
      let id = this.$route.query.id
      return mvAll({
        params: {
          id: id,
          type: 1,
          limit: 20,
          offset: (this.cur - 1) * 25
        }
      })
    },
    pageClick(c) {
      this.cur = c
      if(this.cur!==1){
        this.$store.commit('changeFalse')
      }else{
        this.$store.commit('changeTrue')
      }
      this.getMvAll()
      .then(res => {
        this.data= res.data.comments
      })
    }
  },
  data() {
    return {
      data: '',
      cur: 1,
      page: '',
    }
  },
  watch:{
    $route() {
      let id = this.$route.query.id
      this.getMvAll()
          .then(res => {
            this.data= res.data.comments
            this.count = res.data.total
            console.log(res)
            console.log(this.count)
            this.page = Math.ceil(res.data.total / 20)
          }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style scoped>
.com-page{
  position: relative;
  height: 30px;
}
.com-page .page1{
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>