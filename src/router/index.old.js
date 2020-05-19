import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/Splash'
import Events from '@/components/Events'
import noAuthEvents from '@/components/noAuthEvents'
import About from '@/components/About'
import Splash from '@/components/Splash'
import Profile from '@/components/Profile'

import store from '../store' 

Vue.use(Router)


export default new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'Sign-In',
      component: SignIn,
    },
    {
      path: '/main',
      name: 'Main',
      component: Events,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/altmain',
      name: 'altMain',
      component: noAuthEvents,
    },
  ]
})


// export default new Router({
//   mode: 'hash',
//   base: __dirname,
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: Splash,
//       children: [
//         {
//             path: '',
//             components: {
//               main: HelloWorld
//           }
//         },
//         {
//             path: '/about',
//             components: {
//               main: About
//           }
//         },
//       ]
//     }
//   ]
// })
