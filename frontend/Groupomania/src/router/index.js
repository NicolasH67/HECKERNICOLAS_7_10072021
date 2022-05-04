import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import ProfilDetail from '../views/ProfilDetail.vue'
import Post from '../views/Post.vue'
import PostModify from '../views/PostModify.vue'
import ProfilModify from '../views/ProfilModify.vue'
import Message from '../views/Message.vue'
import Admin from '../views/Admin.vue'
import AdminUser from '../views/AdminUser.vue'
import AdminPost from '../views/AdminPost.vue'

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
    path: '/PostModify/:id',
    name: 'PostModify',
    component: PostModify
  },
  {
    path: '/Message/:id',
    name: 'Message',
    component: Message
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/Admin/User',
    name: 'AdminUser',
    component: AdminUser
  },
  {
    path: '/Admin/Post',
    name: 'AdminPost',
    component: AdminPost
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
