import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mvid: '',
    isShow: true
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
