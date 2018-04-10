import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tree from '@/components/tree/index'
import Img from '@/components/img/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
