<template>
  <div id="mv-details">
    <div class="mv-left">
      <div class="url-box">
        <mv-url></mv-url>
        <div>
          <hot-comment v-if="$store.state.isShow"></hot-comment>
          <all-comment></all-comment>
        </div>
      </div>
    </div>
    <div class="mv-right">
      <h3>相关推荐</h3>
      <mv-related></mv-related>
    </div>
  </div>
</template>

<script>
import mvUrl from "@/components/content/mv/mvUrl";
import mvRelated from "@/components/content/mv/mvRelated";
import hotComment from "@/components/content/mv/hotComment";
import allComment from "@/components/content/mv/allComment";
export default {
  name: "mvDetails",
  components: {
    mvUrl,
    mvRelated,
    hotComment,
    allComment
  },
  created() {
    window.scrollTo(0,0);
  }
}
</script>

<style scoped>
  #mv-details{
    width: 100%;
    margin-top: 30px;
  }
  .mv-left{
    width: 980px;
    min-height: 1335px;
    padding: 15px;
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
    display: inline-block;
    margin-bottom: 30px;
  }
  .mv-right{
    float: right;
    /*display: inline-block;*/
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
    padding: 15px;
  }
  .mv-right h3{
    color: #e82c07;
    padding-left: 10px;
    border-left: 5px solid #e82c07;
  }

</style>