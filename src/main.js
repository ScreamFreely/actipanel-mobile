// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'

import  jwt_decode from 'jwt-decode'
import Vuex from 'vuex'

import store from './store'



Vue.use(ElementUI, { locale })
Vue.use(require('vue-moment'))
// Vue.use(resource)

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(VueAxios, axios)

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common['Authorization'] = 'JWT ' + token
}


/* eslint-disable no-new */
new Vue({
  store,
  router,
  // components: { App },
  template: '<router-view />'
}).$mount('#app')
