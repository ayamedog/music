<template>
<div id="home">
  <banner></banner>
  <recommend-songs></recommend-songs>
</div>
</template>

<script>
import Banner from "@/components/content/home/Banner";
import RecommendSongs from "@/components/content/home/RecommendSongs";

export default {
  name: "Home",
  components: {
    RecommendSongs,
    Banner
  }
}
</script>

<style scoped>
#home{
  width: 1350px;
  padding: 20px 15px 30px 15px;
  margin: 0 auto;
  color: #000;
}
</style>