<template>
  <div id="mv">
    <h2 class="mv-title">M V</h2>
    <div class="mv-box">
      <div class="mv-options">
        <ul>
          <li v-for="(item, index) in area" @click="areaClick(item)" :class="{active: areaActive === item}">{{item}}</li>
        </ul>
        <ul>
          <li v-for="(item, index) in type" @click="typeClick(item)" :class="{active: typeActive === item}">{{item}}</li>
        </ul>
        <ul>
          <li v-for="(item, index) in order" @click="orderClick(item)" :class="{active: orderActive === item}">{{item}}</li>
        </ul>
      </div>
      <mv-count :mvData="mvData" v-if="isShow"></mv-count>
      <div class="loading" v-if="!isShow">
        <img src="~assets/images/loading.png" alt="">
      </div>
      <div class="mv-page">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="page*10"
            :current-page=currentPage
            @current-change="pageClick"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {mv} from "@/network/request";
import axios from "axios";
import mvCount from "@/components/content/mv/mvCount";
export default {
  name: "mv",
  created() {
    mv({
      params: {
        /*
        * 可选参数 :
          area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部

          order: 排序,可选值为上升最快,最热,最新,不填则为上升最快

          limit: 取出数量 , 默认为 30

          offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
          * */
        area: this.areaActive,
        type: this.typeActive,
        order: this.orderActive,
        limit: this.limit,
      }
    }).then(res => {
      this.mvCount = res.data.count
      this.page = Math.ceil( res.data.count / this.limit)
      this.mvData = res.data.data
    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      area: ['全部','内地','港台','欧美','日本','韩国'],
      areaActive: '全部',
      type: ['全部','官方版','原生','现场版','网易出品'],
      typeActive: '全部',
      order: ['上升最快','最热','最新'],
      orderActive: '上升最快',
      limit: 16,
      mvData: '',
      page: '',
      mvCount: '',
      isShow: true,
      currentPage: 1
    }
  },
  methods: {
    getMv(){
      this.isShow = !this.isShow
      this.currentPage=1
      mv({
        params: {
          area: this.areaActive,
          type: this.typeActive,
          order: this.orderActive,
          limit: this.limit,
        }
      }).then(res => {
        this.mvData = res.data.data
        this.isShow = !this.isShow
      }).catch(err => {
        console.log(err);
      })
    },
    areaClick(item) {
      this.areaActive = item
      this.getMv()
    },
    typeClick(item) {
      this.typeActive = item;
      this.getMv()
    },
    orderClick(item) {
      this.orderActive = item;
      this.getMv()
    },
    pageClick(c) {
      this.currentPage = c
      window.scrollTo(0,0);
      console.log(document.body.scrollTop)
      this.isShow = !this.isShow
      let limit = this.limit
      // if(c == this.page){
      //   offset = this.mvCount % (this.page -1)
      // }else{
      //   offset = this.limit
      // }
      mv({
        params: {
          area: this.areaActive,
          type: this.typeActive,
          order: this.orderActive,
          limit: limit,
          offset: (c-1)*limit
        }
      }).then(res => {
        this.mvData = res.data.data
        this.isShow = !this.isShow
      }).catch(err => {
        console.log(err);
      })
    }
  },
  components: {
    mvCount
  }
}
</script>

<style scoped>
  #mv{
    width: 100%;
    padding-top: 20px;
  }

  #mv .mv-title{
    color: #fff;
    background: #fa2800;
    padding: 10px 20px;
    border-radius: 15px;
    width: 150px;
    text-align: center;
    margin-bottom: 20px;
  }

  #mv .mv-box{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 20px 50px 50px 50px;
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
    margin-bottom: 30px;
  }

  .mv-options ul{
    width: 100%;
    height: 30px;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .mv-options li {
    list-style: none;
    float: left;
    color: #1e272e;
    line-height: 30px;
    margin-right: 20px;
    padding: 0 10px;
    cursor: pointer;
  }
  .mv-options li.active{
    color: #fff;
    background: #fa2800;
    border-radius: 15px;

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

  .loading{
    width: 100%;
    height: 400px;
    position: relative;
    margin: 0 auto;
  }
  .loading img{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%) rotate(0deg);
    margin: 0 auto;
    animation: loading-rotate 3s linear infinite;
  }
  @keyframes loading-rotate {
    0%{
      transform: translate(-50%,-50%) rotate(0deg);
    }
    100%{
      transform: translate(-50%,-50%) rotate(360deg);
    }
  }
</style>
<style>

</style>