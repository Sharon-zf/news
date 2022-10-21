import Vue from 'vue'
import VueRouter from 'vue-router'

import loginIn from '../views/login/loginIn.vue'
import layOut from '../views/layout/layOut.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layOut'
  },
  {
    path: '/login',
    component: loginIn
  },
  {
    path: '/layOut',
    redirect: '/layOut/home',
    component: layOut,
    children: [
      {
        path: 'home',
        component: () => import('../views/home/myHome.vue')
      },
      {
        path: 'mine',
        component: () => import('../views/mine/mySelf.vue')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('../components/homeSearch.vue')
  },
  {
    path: '/searchRe/:keywords',
    component: () => import('../components/searchResult.vue')
  },
  {
    path: '/articleDetails',
    component: () => import('../views/articleDetails/articleDetails.vue')
  },
  {
    path: '/userInfo',
    component: () => import('../views/mine/components/userInfomation.vue')
  },
  {
    path: '/chatWindow',
    component: () => import('../views/chat/chatWindow.vue')
  },
  {
    path: '/showart/:key',
    component: () => import('../components/showArticle.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('heheNews')
  if (!token && to.path !== '/login') { // 没有token且去其他页面
    next({ path: '/login' })
  } else if (token && to.path === '/login') { // 有token且去登录页面
    next(false)
  } else {
    next()
  }
})

export default router
