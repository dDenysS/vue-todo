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
    path: '/notes/create',
    name: 'NoteCreate',
    component: () => import('../views/Note')
  },
  {
    path: '/notes/:id',
    name: 'Note',
    component: () => import('../views/Note')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound')
  },
  {
    path: '*',
    redirect: { name: 'NotFound' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
