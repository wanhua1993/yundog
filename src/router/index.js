import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import First from '@/views/first'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'first',
          component: First,
        }
      ]
    },
  ]
})
