import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import index from './views/index.vue'
import check from './views/check.vue'
import verify from './views/verify.vue'
import success from './views/success.vue'
import track from './views/track.vue'

import '@/styles/normalize.scss'
import '@/styles/base.scss'

import 'babel-polyfill'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component:  index },
    { path: '/check', component: check },
    { path: '/verify', component: verify },
    { path: '/success', component: success },
    { path: '/track', component: track }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
