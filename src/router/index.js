import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const hello = () => import('@/components/content/hello')
const login = () => import('@/components/common/login/login')
const home = () => import('@/components/content/home/Home')
const mv = () => import('@/components/content/mv/mv')
const playlist = () => import('@/components/content/playlist/playlist')

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
    path: '/playlist',
    component: playlist
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
