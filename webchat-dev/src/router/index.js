import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Start from '../components/Start.vue'
import Index from '../components/Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      // children: [
      //   {
      //     path: '/index/page1',
      //     name: 'page1',
      //     component: page1
      //   }
      // ]
    }
  ]
})
