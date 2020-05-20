import Vue from 'vue'
import Router from 'vue-router'
import Events from '@/components/Events'
import About from '@/components/About'

import store from '../store' 

Vue.use(Router)


export default new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Events,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
  ]
})
