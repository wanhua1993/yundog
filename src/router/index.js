import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import First from '@/views/first'
import Friends from '@/views/friends'
import Chat_room from '@/views/chat_room'
import My from '@/views/my'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        // 首页
        {
          path: 'index',
          name: 'first',
          component: First,
        },
        // 好友页面
        {
          path: '/friends',
          name: 'friends',
          component: Friends
        },
        // 聊天页面
        {
          path: '/chat_room',
          name: 'chat_room',
          component: Chat_room
        },
        // 个人中心页面
        {
          path: '/my',
          name: 'my',
          component: My
        }
      ]
    },
  ]
})
