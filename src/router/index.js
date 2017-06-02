import Vue from 'vue'
import Router from 'vue-router'
import initialize from '@/components/initialize'
import world from '@/components/world'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'initialize',
      component: initialize
    },
    {
      path: '/world',
      name: 'world',
      component: world
    }
  ]
})
