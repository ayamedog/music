<template>
  <div class="list-details">
    <div class="list-left">
      <details-left :data="data" :id="id" :user-name="userName" :cover-img-url="coverImgUrl" :name="name" :create-time="createTime" :user-avatar="userAvatar"
      :tags="tags" :description="description"></details-left>
      <playlist-songs :songs="songs"></playlist-songs>
    </div>
    <div class="list-right">
      <div class="right-top">
        <like-list :subscribers="subscribers"></like-list>
      </div>
      <div class="right-center">
        <related-list :related="related"></related-list>
      </div>
      <div class="right-bottom">
        <playlist-hot :comments="comments"></playlist-hot>
      </div>
    </div>
  </div>
</template>

<script>
  import {playlistInfo, userDetail,songDetail,playlistRe,playlistAll} from "@/network/request";
  import detailsLeft from "@/components/content/playlist/detailsLeft";
  import playlistSongs from "@/components/content/playlist/playlistSongs";
  import likeList from "@/components/content/playlist/likeList";
  import relatedList from "@/components/content/playlist/relatedList";
  import playlistHot from "@/components/content/playlist/playlistHot";

  export default {
    name: "playlistDetails",
    created() {
      window.scrollTo(0,0);
      this.id = this.$route.query.id;
      this.getListDetails();
    },
    watch: {
      $route() {
        this.id=this.$route.query.id;
        this.getListDetails();
      }
    },
    methods: {
      getListDetails() {
        return playlistInfo({
            params: {
              id: this.id,
              s: 28
            }
          }).then(res => {
            this.data = res.data.playlist
            this.userId = res.data.playlist.userId
            this.coverImgUrl = res.data.playlist.coverImgUrl
            this.name = res.data.playlist.name
            this.createTime = res.data.playlist.createTime
            this.userName = res.data.playlist.creator.nickname
            this.userAvatar = res.data.playlist.creator.avatarUrl
            this.tags = res.data.playlist.tags
            this.description = res.data.playlist.description
            this.subscribers = res.data.playlist.subscribers
            let songId= res.data.playlist.trackIds
            let songs =[];
            for (let songIdElement of songId) {
                // console.log(songIdElement.id)
                songs.push(songIdElement.id)
              }
            let ids = songs.join()
            this.getSongs(ids)
            this.getRelatedList(this.id)
            this.getHotComment(this.id)
          }).catch(err => {
            console.log(err);
          })
      },
      getSongs(ids) {
        return songDetail(ids).then(res => {
          this.songs = res.data.songs
        }).catch(err => {
          console.log(err);
        })
      },
      getRelatedList(id) {
        return playlistRe(id).then(res => {
          this.related = res.data.playlists
        }).catch(err => {
          console.log(err);
        })
      },
      getHotComment(id) {
        return playlistAll(id).then(res => {
          this.comments = res.data.hotComments
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      }
    },
    data() {
      return {
        data: '',
        id: '',
        userId: '',
        userAvatar: '',
        userName: '',
        coverImgUrl: '',
        name: '',
        createTime: '',
        tags: '',
        description: '',
        songs: '',
        subscribers: '',
        related: '',
        comments: ''
      }
    },
    components: {
      detailsLeft,
      playlistSongs,
      likeList,
      relatedList,
      playlistHot
    }
  }
</script>

<style scoped>
  .list-details{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .list-left{
    background: rgba(255,255,255,0.6);
    padding: 15px;
    border-radius: 15px;
    display: inline-block;
    width: 950px;
  }

  .list-right{
    float: right;
    width: 380px;
  }
  .right-top,.right-center,.right-bottom{
    margin-bottom: 20px;
    background: rgba(255,255,255,0.6);
    padding: 15px;
    width: 360px;
    border-radius: 15px;
    display: inline-block;
  }

</style>