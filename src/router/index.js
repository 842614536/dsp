import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home/Home'
import Plan from '@/views/Plan/Plan'
import Index from '@/views/Index/Index'
import Login from '@/views/Login/Login'
import Tools from '@/views/Tools/Tools'
import Creativity from '@/views/Creativity/Creativity'
import store from '@/vuex/store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hah',
      component: Home,
      redirect: '/index/index'
    },
    {
      path: '/index',
      name: 'Home',
      component: Home,
      children:[{
        path: '/index/plan',
        name: 'Plan',
        component: Plan
      },{
        path: '/index/index',
        name: 'Index',
        component: Index
      },{
        path: '/index/tools',
        name: 'Tools',
        component: Tools
      },{
        path: '/index/creativity',
        name: 'Creativity',
        component: Creativity
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (!localStorage.token) {
      next({ path: '/login' })
    } else {
      store.commit('updataUserInfo', Object.assign({}, {userInfo: {...JSON.parse(localStorage.userInfo)}}, {token: localStorage.token}))
      next()
    }
  }
})



export default router