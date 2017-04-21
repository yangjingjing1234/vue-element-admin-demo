// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'
import store from './vuex/store'

import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)



router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
  }

  let user = JSON.parse(sessionStorage.getItem('user'))||JSON.parse(localStorage.getItem('user'));

  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
