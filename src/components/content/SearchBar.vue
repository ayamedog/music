<template>
  <div id="search-bar" @click="$store.commit('searchClick')" class="search-hide">
    <div id="search-cont" @click="noBub($event)">
      <div id="search-top">
        <div id="search-top-bg"></div>
      </div>
      <div id="search-top-cont">
        <input type="text" placeholder="海阔天空">
        <router-link to="/search" tag="button"><img src="~assets/images/Search.png" alt="">搜索</router-link>
      </div>
      <div id="search-bottom"></div>
      <div class="close" @click="$store.commit('searchClick')"><img src="~assets/images/Close.png" alt=""></div>
    </div>
  </div>
</template>

<script>
export default {
name: "SearchBar",
  methods: {
    noBub(e) {
      e.stopPropagation();
    },

  }
}
</script>

<style scoped>
  #search-bar{
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 920;
    /*display: none;*/
    transition: all .2s ease-in-out;
    /*为元素背后的元素添加图形效果*/
    backdrop-filter: blur(5px);
  }
  #search-cont{
    z-index: 930;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 800px;
    height: 400px;
    background: rgba(255,255,255,0.3);
    transition: all .2s;
  }
  #search-top{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 800px;
    overflow: hidden;
    height: 240px;
    border-radius: 5px 5px 0 0;
  }
  #search-top-cont{
    position: absolute;

    left: 0;
    right: 0;
    width: 800px;
    height: 240px;
  }
  #search-top #search-top-bg{
    width: 100%;
    height: 100%;
    background: url("~assets/images/searchbg.jpg") 0 -50px;
    background-size: cover;
    box-sizing: border-box;
    filter: blur(4px);
  }
  #search-bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 40%;
    background: #fff;
    border-radius: 0 0 5px 5px;
  }
  /*搜索详细内容*/
  #search-top-cont input{
    width: 550px;
    height: 40px;
    padding: 0 25px;
    outline: none;
    line-height: 40px;
    border: none;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
  }
  #search-top-cont button{
    display: block;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    height: 40px;
    padding: 5px 15px;
    border: none;
    border-radius: 10px;
    outline: none;
    line-height: 35px;
    color: #fff;
    font-size: 20px;
    background: #0fbcf9;
    cursor: pointer;
  }
  #search-top-cont button:hover{
    background: #7abcff;
  }
  #search-top-cont button img{
    height: 30px;
    width: 30px;
    margin-right: 10px;
    float: left;
  }

  /*动画*/
  #search-bar.search-hide{
    opacity: 0;
    top: 100%;
  }
  #search-cont.search-hide{
    opacity: 0;
    top: 100%;
  }
  #search-bar.search-show{
    top: 0;
    opacity: 1;
  }
  #search-cont.search-show{
    top: 50%;
    opacity: 1;
  }
  /*关闭按钮*/
  #search-cont .close{
    position: absolute;
    top: 105%;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    z-index: 999;
    cursor: pointer;
  }
  #search-cont .close img{
    width: 50px;
    height: 50px;
  }
</style>