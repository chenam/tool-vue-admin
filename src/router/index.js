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
      name: 'welcome~~~',
      component: Home,
      icon: '#icon-welcome'
    },
    {
      path: '/tree',
      name: '树操作',
      component: Tree,
      icon: '#icon-tree'
    },
    {
      path: '/img',
      name: '图片查看',
      component: Img,
      icon: '#icon-img'
    },
    {
      path: '/prize',
      name: '抽奖系列',
      component: Prize,
      icon: '#icon-choujiang'
    }
  ]
})
