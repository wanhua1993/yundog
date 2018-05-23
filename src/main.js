// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mUtils from './utils/utils'

Vue.config.productionTip = false
Vue.use(store)
router.beforeEach((to, from, next) => {
  var path = to.path;
  // 判断是否是登录状态 否则的话跳转到登录页面
  if (path == '/my' || path == '/friends') {
    var user = mUtils.getStore('user');
    if (user) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
