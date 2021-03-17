<template>
  <div class="hot-com">
    <mv-comment v-if="total !== 0" :data="data">
      <slot slot="title">精彩评论</slot>
    </mv-comment>
  </div>
</template>

<script>
import {mvHot} from "@/network/request";
import mvComment from "@/components/content/mv/mvComment";
export default {
name: "hotComment",
  components: {
    mvComment
  },
  data() {
    return {
      data: '',
      total: ''
    }
  },
  created() {
    this.getMvHot()
    .then(res => {
      this.data = res.data.hotComments
      this.total = res.data.total

    }).catch(err => {
      console.log(err);
    })
  },
  methods: {
    getMvHot() {
      let id = this.$route.query.id
      return mvHot({
        params: {
          id: id,
          type: 1,
          limit: 15
        }
      })
    }
  },
  watch:{
    $route() {
      this.getMvHot()
          .then(res => {
            this.data = res.data.hotComments
            this.total = res.data.total

          }).catch(err => {
        console.log(err);
      })
    }
  },

}
</script>

<style scoped>

</style>