import Vue from 'vue'
import Router from 'vue-router'
import Authenticated from '../sections/core/Authenticated.vue'
import Home from '../sections/core/Home.vue'
import Login from '../sections/core/Login.vue'
import Configurations from '../sections/configurations/Configurations.vue'
import menusRoutes from './menus'
import categoriesRoutes from './categories'
import assetsRoutes from './assets'
import postsRoutes from './posts'
import usersRoutes from './users'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'authenticated',
      component: Authenticated,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/configurations',
          name: 'configurations',
          component: Configurations
        },
        menusRoutes,
        categoriesRoutes,
        assetsRoutes,
        postsRoutes,
        usersRoutes
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.guest || localStorage.access_token) {
    return next()
  }
  next({
    name: 'login'
  })
})

export default router
