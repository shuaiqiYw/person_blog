import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path:'/article',
    name:'Article',
    component: () => import('../views/Article.vue')
  },
  {
    path:'/article/:id',
    name:'ArticleManagement',
    component: () => import('../components/ArticleBase/ArticleManagement.vue')
  },
  {
    path:'/leaveWord',
    name:'LeaveWord',
    component: () => import('../views/LeaveWord.vue')
  },
  {
    path:'/friendshipLink',
    name:'FriendshipLink',
    component: () => import('../views/FriendshipLink.vue')
  },
  {
    path:'/amendPersonalData',
    name:'AmendPersonalData',
    beforeEnter:add,
    component: () => import('../views/AmendPersonalData.vue')
  },
  {
    path:'/admin',
    name:'Admin',
    beforeEnter:root,
    component: () => import('../views/Admin.vue')
  },
  {
    path:'/amendArticle/:id',
    name:'AmendArticle',
    component: () => import('../components/ArticleBase/AmendArticle.vue')
  },
]

function add(to,from,next){
  let id = router.app.$store?.state.userInfo._id
  if(id){
    next()
  }else{
    next({path:"/"})
  }
}

function root(to,from,next){
  let rootAccount = router.app.$store?.state.rootAccount
  if(rootAccount){
    next()
  }else{
    next({path:"/"})
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
