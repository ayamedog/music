<template>
  <div id="ranking">
    <h2 class="rank-title">
      官方榜
    </h2>
    <rank-count class="rank-count" :rankData="rankData1"></rank-count>
    <h2 class="rank-title">
      全球榜
    </h2>
    <rank-count class="rank-count" :rankData="rankData2"></rank-count>
  </div>
</template>

<script>

import {ranking} from "@/network/request";
import rankCount from "@/components/content/ranking/rankCount";
export default {
  name: "ranking",
  created() {
    ranking()
    .then(res => {
      this.rankData1 = res.data.list.slice(0,4);
      this.rankData2 = res.data.list.slice(4);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      rankData1: '',
      rankData2: ''
    }
  },
  components: {
    rankCount
  }
}
</script>

<style scoped>
  #ranking{
    padding-top: 10px;
    margin-top: 30px;
    position: relative;
    width: 100%;
  }

  .rank-count{
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
  }

  .rank-title{
    color: #fff;
    background: #fa2800;
    padding: 10px 20px;
    border-radius: 15px;
    width: 150px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>