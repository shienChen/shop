import Vue from 'vue'
import Router from 'vue-router' 
import Welcome from './components/Welcome.vue'
import User from './components/user/user.vue'
import Rights from './components/Power/Rights.vue'
import Roles from './components/Power/Roles.vue'
import Cate from './components/goods/Cate.vue'
import Params from './components/goods/Params.vue'
import GoodList from './components/goods/List.vue'
import Add from './components/goods/Add.vue'
import Order from './components/Order/order.vue' 
import Report from './components/report/Report.vue'


Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
       
    },
    {
      path: '/home',
      name: 'home',
      redirect:'/welcome',
      component: () => import( './views/Home.vue'),
      children: [
        {
          path:'/welcome',
          name: 'welcome',
          component: Welcome 
        },
        {
          path:'/users',
          name: 'users',
          component: User 
        },
        {
          path:'/rights',
          name: 'rights',
          component: Rights
        },
        {
          path:'/roles',
          name: 'roles',
          component: Roles
        },
        {
          path:'/categories',
          name: 'cate',
          component: Cate
        },
        {
          path:'/params', 
          name: 'params',
          component: Params
        },
        {
          path:'/goods',
          name: 'list',
          component: GoodList
        },
        {
          path:'/goods/add',
          name: 'add',
          component: Add
        },
        {
          path:'/orders',
          name: 'order',
          component: Order  
        },
        {
          path:'/reports',
          name: 'report',
          component: Report 
        },
    ]
    },
    {
      path: '/blogs',
      name: 'blogs',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Blogs.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/Login.vue')
    },
  ]
})

router.beforeEach((to,from,next) => {
  if(to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()

})

export default router