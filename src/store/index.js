import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mvid: '',
    isShow: true,
    // playList: [], //播放列表
    // playContent: {},   //当前播放的歌曲信息
    // current: "",  //当前歌曲的播放进度
    songs: '', //获取歌曲
    curSongIndex: 0,//当前播放的歌曲index
    audioShow: true, //播放器是否显示,
    audioEvent: ''
  },
  mutations: {
    searchClick(state) {
      let searchBar = document.getElementById('search-bar');
      let searchCont = document.getElementById('search-cont')
      if(searchBar.className === 'search-hide'){
        searchBar.className = 'search-show'
        searchCont.className = 'search-show'
        console.log(searchBar.className)
      }else {
        searchBar.className= 'search-hide'
        searchCont.className= 'search-hide'
      }
    },


    mvidUpdate(state,mvid) {
      state.mvid = mvid
    },
    changeFalse(state){
      state.isShow = false
    },
    changeTrue(state) {
      state.isShow = true
    },
    getSongs(state,songs) {
      state.songs = songs
    },
    getSongsIndex(state,index) {
      state.curSongIndex = index
    },
    changeIndex(state) {
      state.curSongIndex = 0
    },
    indexAdd(state) {
      state.curSongIndex++
    },
    indexEnd(state,index){
      state.curSongIndex = index
    },
    indexCut(state) {
      state.curSongIndex--
    },
    changeAudio(state) {
      state.audioShow = !state.audioShow
    },
    showAudio(state) {
      state.audioShow = false
    },
    hideAudio(state) {
      state.audioShow = true
    }
  },
  actions: {
  },
  modules: {

  },
  getters: {
    playCount(state) {
      return function (pc) {
        if(pc < 9999){
          return pc
        }else if(pc<99999999){
          return (pc / 10000).toFixed(1) + '万'
        }else{
          return (pc / 100000000).toFixed(1) + '亿'
        }
      }
    }
  }
})
