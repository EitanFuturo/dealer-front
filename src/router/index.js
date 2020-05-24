/* eslint-disable */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '@/components/Signin.vue'
import Signup from '@/components/Signup.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin 
    },
    {
      path: '/signup',
        name: 'Signup',
      component: Signup
    }
  ]
})
