import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'


import 'materialize-css/dist/css/materialize.min.css'

// import 'material-design-icons/iconfont/material-icons.css'
import store from './store'

import router from './router'


Vue.config.productionTip = false

new Vue({
  Vuex,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
