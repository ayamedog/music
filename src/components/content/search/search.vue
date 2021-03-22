<template>
  <div class="search">
   <div class="search-top">
     <el-input
         class="search-input"
         placeholder="请输入内容"
         suffix-icon="el-icon-search"
         clearable
         v-model="input1"
         @input="search"
     >
     </el-input>
   </div>
    <div class="search-bottom">
      <h4 class="link">
        <router-link :to="{path: '/search/songs',query:{'keywords':input1}}">单曲</router-link>
        <router-link :to="{path: '/search/playlist',query:{'keywords':input1}}">歌单</router-link>
        <router-link :to="{path: '/search/mv',query:{'keywords':input1}}">MV</router-link>
      </h4>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: "search",
    created() {
      this.input1 = this.$route.query.keywords
    },
    watch: {
      $route() {
        this.input1 = this.$route.query.keywords
      }
    },
    data() {
      return {
        input1: ''
      }
    },
    methods: {
      search() {
        setTimeout( () =>{
          if(this.input1 === ''){

          }else{
            this.$router.push({
              query:{keywords:this.input1}
            }).catch(err => err)
            console.log('success')
          }
        },500)

      }
    }

  }
</script>

<style scoped>
  .search{
    margin-top: 20px;
  }
  .search-top{
    height: 250px;
    width: 100%;
    position: relative;
  }
  .search-input{
    width: 650px;
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    position: absolute;
    left: 50%;
    bottom: 60px;
    transform: translateX(-50%);
  }
  ::v-deep .el-input__inner{
    height: 55px;
  }

  .search-bottom{
    width: 100%;
    background: rgba(255,255,255,0.6);
    border-radius: 15px;
    padding: 15px;
    margin-bottom: 20px;
  }
  .search-bottom .link{
    text-align: center;
    color: #000;
    width: 600px;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
  }
  .link a.router-link-active{
    color: #e82c07;
  }
</style>