import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index.vue'
import Tree from '@/components/tree/index'
import Img from '@/components/img/index'
import Prize from '@/components/prize/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tree',
      name: 'tree',
      component: Tree
    },
    {
      path: '/img',
      name: 'img',
      component: Img
    },
    {
      path: '/prize',
      name: 'prize',
      component: Prize
    }
  ]
})
