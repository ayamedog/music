import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const hello = () => import('@/components/content/hello')
const login = () => import('@/components/common/login/login')
const home = () => import('@/components/content/home/Home')
const mv = () => import('@/components/content/mv/mv')
const playlist = () => import('@/components/content/playlist/playlist')
const ranking = () => import('@/components/content/ranking/ranking')
const mvDetails = () => import('@/components/content/mv/mvDetails')
const playlistDetails = () =>import('@/components/content/playlist/playlistDetails')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    //redirect重定向
    redirect:'/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/mv',
    component: mv
  },
  {
    path: '/mv-detail/url',
    component: mvDetails
  },
  {
    path: '/playlist',
    component: playlist
  },
  {
    path: '/playlist-details/url',
    component: playlistDetails
  },
  {
    path: '/ranking',
    component: ranking
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
