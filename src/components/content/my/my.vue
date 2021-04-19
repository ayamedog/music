<template>
  <div class="my">
    <el-container class="box">
      <!--左侧 侧边栏-->
      <el-aside class="aside" width="250px">
        <el-col :span="12">
          <el-menu
              router
              :default-openeds="['1','2']"
              active-text-color="#e82c07"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我创建的歌单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,index1) in createPlaylist" :index="'/my?list='+'1-'+ (index1+1)" @click="getListDetails(item.id)">{{ item.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>我收藏的歌单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(item,index2) in subscribePlaylist" :index="'/my?list='+'2-'+ (index2+1)" @click="getListDetails(item.id)">{{ item.name }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!--右侧内容-->
      <el-main class="main">
        <playlist-songs :songs="songs"></playlist-songs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {loginStatus, userPlaylist, getUserDetail, playlistInfo, songDetail} from "@/network/request";
import PlaylistSongs from "@/components/content/playlist/playlistSongs";

export default {
  name: "my",
  components: {PlaylistSongs},
  data() {
    return {
      username: '',
      uid: '',
      createPlaylist: [],
      subscribePlaylist: [],
      id: '',
      songs: '',
    }
  },
  methods: {
    getS() {
      //获取登录状态
      loginStatus().then(res => {
        console.log(res);
        console.log('获取用户状态');
        this.username = res.data.data.profile.nickname
        this.uid = parseInt(res.data.data.profile.userId)
        //获取用户信息
        getUserDetail(this.uid).then(res => {
          console.log(res);
        })
        //获取用户歌单
        userPlaylist(this.uid).then(res => {
          console.log(res);
          //将创建歌单和收藏歌单分类
          for (let data of res.data.playlist) {
            console.log(data);
            if(!data.subscribed) {
              this.createPlaylist.push(data)
            }else {
              this.subscribePlaylist.push(data)
            }
          }
        })
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getListDetails(id) {
      this.id = id;
      playlistInfo({
        params: {
          id: this.id,
          s: 28
        }
      }).then(res => {
        let songId= res.data.playlist.trackIds
        let songs =[];
        for (let songIdElement of songId) {
          // console.log(songIdElement.id)
          songs.push(songIdElement.id)
        }
        let ids = songs.join()
        this.getSongs(ids)
      }).catch(err => {
        console.log(err);
      })
    },
    getSongs(ids) {
      return songDetail(ids).then(res => {
        this.songs = res.data.songs
        console.log(this.songs);
      }).catch(err => {
        console.log(err);
      })
    },
  },
  created() {
    this.getS()
  }
}
</script>

<style scoped>
  .my{
    background: #fff;
    overflow: hidden;
    border-radius: 15px;
    margin: 30px 0;
  }

  .aside{
    box-sizing: border-box;
  }
  ::v-deep .el-col-12{
    width: 99%;
  }
  ::v-deep .el-menu-item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>