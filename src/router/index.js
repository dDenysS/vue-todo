import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notes',
    redirect: { name: 'Home' }
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: () => import('../views/Note')
  },
  {
    path: '*',
    component: () => import('../views/NotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
