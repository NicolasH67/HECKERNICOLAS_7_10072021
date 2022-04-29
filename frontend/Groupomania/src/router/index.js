import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import ProfilDetail from '../views/ProfilDetail.vue'
import Post from '../views/Post.vue'
import ProfilModify from '../views/ProfilModify.vue'
import Message from '../views/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/Profil/:id',
    name: 'ProfilDetail',
    component: ProfilDetail
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post
  },
  {
    path: '/Message/:id',
    name: 'Message',
    component: Message
  },
  {
    path: '/ProfilModify',
    name: 'ProfilModify',
    component: ProfilModify
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
