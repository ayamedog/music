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
const search = () => import('@/components/content/search/search')
const searchSongs = () => import('@/components/content/search/searchSongs')
const searchPlaylist = () => import('@/components/content/search/searchPlaylist')
const searchMv = () => import('@/components/content/search/searchMv')
const my = () => import('@/components/content/my/my')
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    //redirect重定向
    redirect:'/home'
  },
  {
    path: '/my',
    component: my
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
  },
  {
    path: '/search',
    component: search,
    children: [
      {
        path: '',
        redirect: 'songs'
      },
      {
        path: 'songs',
        component: searchSongs
      },
      {
        path: 'playlist',
        component: searchPlaylist
      },
      {
        path: 'mv',
        component: searchMv
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
