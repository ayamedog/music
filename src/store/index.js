import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    searchClick() {
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
    }
  },
  actions: {
  },
  modules: {
  }
})
