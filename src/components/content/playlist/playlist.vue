<template>
  <div id="playlist">
    <div  id="playlist-nav">
      <div class="cur-cat" @click="isShow = !isShow">{{cat}}<i class="fa fa-chevron-down"></i></div>
      <div class="playlist-hot">
        <ul>
          <span>热门标签:</span>
          <li v-for="(item, index) in playlistHot" @click="listClick(item.name)" :class="{active: cat === item.name}">{{item.name}}</li>
        </ul>
      </div>
      <div class="hot-new">
        <button @click="hotClick" :class="{active: isActive1}">热门</button>
        <button @click="newClick" :class="{active: !isActive1}">最新</button>
      </div>
    </div>
    <div id="playlist-menu" @click="isShow = !isShow" :class="{show: isShow}">
      <ul class="categories">
        <li v-for="(item, index) in categories">{{item}}
          <ul class="sublist">
            <li v-for="(subitem,subindex) in sub" v-if="subFilter(subitem,index)" @click="listClick(subitem.name)" :class="{active: cat === subitem.name}">{{subitem.name}}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="playlist-cont">
      <get-playlists :playlists="playlists" :class="{isloading: isloading}"><div class="mv-page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="page*10"
            :current-page=currentPage
            @current-change="pageClick"
        >
        </el-pagination>
      </div></get-playlists>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {playlistHot,playlistGet,playlistCatlist} from "@/network/request";
import GetPlaylists from "@/components/content/GetPlaylists";

export default {
  name: "playlist",
  created() {
    playlistCatlist()
    .then(res => {
      this.categories = res.data.categories;
      this.sub= res.data.sub
      console.log(res);
    }).catch(err => {
      console.log(err);
    })

    playlistHot()
    .then(res => {
      this.playlistHot = res.data.tags
      console.log(res);
    }).catch(err => {
    console.log(err);
    })

    playlistGet({
      params: {
        cat: this.cat
      }
    })
    .then( res => {
      this.playlists = res.data.playlists
      this.page = Math.ceil( res.data.total / this.limit)
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      categories: '',
      sub: '',
      cat: '全部',
      playlistHot: '',
      order: 'hot',
      isActive1: true,
      isShow: false,
      playlists: '',
      page: '',
      currentPage: 1,
      limit: 40,
      isloading: false
    }
  },
  computed: {
    subFilter() {
      return function (subitem,index) {
        if(subitem.category == index) {
          return true
        }else{
          return false
        }
      }
    }
  },
  methods: {
    getPlaylists() {
      this.isloading = !this.isloading
      this.currentPage = 1
      playlistGet({
        params: {
          cat: this.cat,
          order: this.order
        }
      })
          .then( res => {
            this.isloading = !this.isloading
            this.playlists = res.data.playlists
            this.page = Math.ceil( res.data.total / this.limit)
            console.log(res);
          }).catch(err => {
        console.log(err);
      })
    },
    hotClick() {
      this.order = 'hot'
      this.isActive1 = true
      this.getPlaylists()
    },
    newClick() {
      this.order = 'new'
      this.isActive1 = false
      this.getPlaylists()
    },
    listClick(name) {
      this.cat = name
      this.getPlaylists()
    },
    pageClick(c) {
      this.currentPage = c
      this.isloading = !this.isloading
      playlistGet({
        params: {
          cat: this.cat,
          order: this.order,
          offset: (c-1) * 24
        }
      })
          .then( res => {
            this.isloading = !this.isloading
            this.playlists = res.data.playlists
            this.page = Math.ceil( res.data.total / this.limit)
            console.log(res);
          }).catch(err => {
        console.log(err);
      })
      window.scrollTo(0,0);
    }
  },
  components: {
    GetPlaylists
  }
}
</script>

<style scoped>
  #playlist{
    color: #000;
    position: relative;
  }
  #playlist-nav{
    width: 100%;
    height: 45px;
    background: #fff;
    margin: 30px 0;
    line-height: 45px;
    border-radius: 15px;
    overflow: hidden;
  }
  #playlist-nav .cur-cat{
    height: 100%;
    cursor: pointer;
    padding: 0 35px 0 25px;
    background: red;
    color: #fff;
    float: left;
    position: relative;
  }
  #playlist-nav .cur-cat .fa-chevron-down{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    transition: all .3s linear;
  }
  #playlist-nav .cur-cat .fa-chevron-down.active{
    transform: rotate(180deg);
  }

  #playlist-nav .playlist-hot{
    float: left;
    margin-left: 10px;
  }
  #playlist-nav .playlist-hot span{
    float: left;
  }
  #playlist-nav .playlist-hot li {
    float: left;
    list-style: none;
    padding: 0 15px;
    cursor: pointer;
    margin: 0 5px;
    transition: all .1s linear;
  }
  #playlist-nav .playlist-hot li:hover{
    color: #666666;
  }
  #playlist-nav .playlist-hot li.active{
    color: #e82c07;
  }

  #playlist-nav .hot-new{
    float: right;
    margin-right: 20px;
  }
  #playlist-nav .hot-new button{
    outline: none;
    border: none;
    padding: 0 15px;
    height: 30px;
    transition: all .4s linear;
    border-radius: 15px;
    margin-left: 15px;
    cursor: pointer;
  }
  #playlist-nav .hot-new button.active{
    background: #e82c07;
    color: #fff;
  }

  #playlist-menu{
    z-index: 50;
    pointer-events: none;
    transition: all .2s linear;
    position: absolute;
    background: #fff;
    top: 80px;
    left: 0;
    opacity: 0;
    padding: 20px;
    border-radius: 15px;
  }
  #playlist-menu.show{
    pointer-events: auto;
    opacity: 1;
    top: 55px;
  }
  #playlist-menu li {
    list-style: none;
  }

  .categories{
    max-height: 300px;
    max-width: 500px;
    overflow-x: hidden;
    overflow-y: scroll;
    /*火狐浏览器隐藏滚动条*/
    scrollbar-width:none;
    /*IE10+ 隐藏滚动条*/
    -ms-overflow-style:none;
  }
  /*chrome和Safari浏览器隐藏滚动条*/
  .categories::-webkit-scrollbar{
    display: none;
  }
  .categories>li{
    width: 500px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    cursor: default;
  }
  .sublist{
    display: flex;
    flex-wrap: wrap;
  }
  .sublist>li{
    cursor: pointer;
    font-weight: normal;
    font-size: 14px;
    padding: 5px 10px;
    margin: 10px 10px 0 10px;
    border-radius: 5px;
  }
  .sublist>li.active{
    background: #e82c07;
    color: #fff;
  }


  #playlist-cont{
    width: 100%;
    border-radius: 15px;
    margin-bottom: 30px;
  }

  .mv-page{
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: center;
  }
  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color:#fa2800;
    color: #fff;
  }

  ::v-deep .isloading .playlist-songs{
    display: none;
  }
</style>