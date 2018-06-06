import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import First from '@/views/first'
import Friends from '@/views/friends'
import Chat_room from '@/views/chat_room'
import My from '@/views/my'
import Goods_car from '@/views/goods_car'
import Login from '@/views/login'
import My_detail from '@/views/my_detail'
import New from '@/views/new'
import Community from '@/views/community'
import Recommend from '@/views/recommend'
import Share from '@/views/share'
import Search_friends from '@/views/Search_friends'
import Friends_detail from '@/views/friends_detail'
Vue.use(Router)

export default new Router({
  // mode: 'history',
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
        },
        // 跳转到发表文章页面
        {
          path: '/goods_car',
          name: 'goods_car',
          component: Goods_car
        },
        // 跳转到登录页面
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        // 跳转到 个人信息详情页面
        {
          path: 'my_detail',
          name: 'my_detail',
          component: My_detail
        },
        // 跳转到社区页面
        {
          path: '/community',
          name: 'community',
          component: Community
        },
        // 跳转到推荐页面
        {
          path: 'recommend',
          name: 'recommend',
          component: Recommend
        },
        // 跳转到分享页面
        {
          path: 'share',
          name: 'share',
          component: Share
        },
        // 跳转到 最新页面
        {
          path: 'new',
          name: 'new',
          component: New
        },
        // 跳轉到 搜索好友頁面
        {
          path: 'search_friends',
          name: 'search_friends',
          component: Search_friends
        },
        // 跳轉到 好友詳情頁面
        {
          path: 'friends_detail',
          name: 'friends_detail',
          component: Friends_detail
        }
      ]
    },
  ]
})
