import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.min.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
