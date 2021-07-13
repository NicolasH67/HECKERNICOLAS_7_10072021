import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import signup from '../views/signup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
