/* eslint-disable no-new */

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'// 引入elementui
import 'element-ui/lib/theme-chalk/index.css'// 引入elementui所需要的css
import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueResource)// this.$http挂载到vue的实例上  请求后端接口的时候用,插件提供api,get,head,delete,jsonp,post,put,patch等7种请求api,headers参数有可能在请求第三方网站的时候可能会用到,timeout如果接口请求几秒没结果,自动终止请求
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
