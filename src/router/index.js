import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const hello = () => import('@/components/content/hello')
const login = () => import('@/components/common/login/login')
const home = () => import('@/components/content/home/Home')
const mv = () => import('@/components/content/mv/mv')

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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
