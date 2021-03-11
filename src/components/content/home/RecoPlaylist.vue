<template>
  <div id="playlist-songs">
    <div class="playlist-title"><h2>推荐歌单</h2></div>
    <get-playlists :playlists="playlists"></get-playlists>
  </div>
</template>

<script>
import axios from "axios";
import {recoPlaylists} from "@/network/request";
import GetPlaylists from "@/components/content/GetPlaylists";
export default {
  // playlistPlaylist.vue
  name: "playlistPlaylist",
  created() {
    recoPlaylists({
      params: {
          limit: 24
      }
    })
    .then(res => {
      this.playlists = res.data.result;
    })
    .catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      playlists: ''
    }
  },
  components: {
    GetPlaylists
  }
}
</script>

<style scoped>
  #playlist-songs{
    margin-top: 30px;
  }

  .playlist-title{
    height: 30px;
    margin-bottom: 40px;
  }
  .playlist-title h2{
    height: 50px;
    width: 250px;
    margin: 0 auto;
    text-align: center;
    line-height: 50px;
    letter-spacing: 20px;
    padding-left: 20px;
    border-radius: 15px;
    background: #fff;
  }
</style>