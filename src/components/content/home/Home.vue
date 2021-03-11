<template>
<div id="home">
  <banner></banner>
  <reco-playlist></reco-playlist>
</div>
</template>

<script>
import Banner from "@/components/content/home/Banner";
import RecoPlaylist from "@/components/content/home/RecoPlaylist";

export default {
  name: "Home",
  components: {
    RecoPlaylist,
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