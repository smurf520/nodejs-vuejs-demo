import Vue from 'vue'
import Router from 'vue-router'
// vuejs前端路由
import register from '../components/register.vue'
import login from '../components/login.vue'
import home from '../components/home.vue'
import adminHome from '../components/adminHome.vue'
Vue.use(Router)// 引入并注册vue-router
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/adminHome',
      name: 'adminHome',
      component: adminHome
    }
  ]
})
