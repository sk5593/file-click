import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import formCoupon from './views/formCoupon.vue'
import formAddress from './views/formAddress.vue'
import formSuccess from './views/formSuccess.vue'
import formCheckOrder from './views/formCheckOrder.vue'

import '@/styles/normalize.scss'
import '@/styles/base.scss'

import 'babel-polyfill'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: formCoupon },
    { path: '/formCoupon', component: formCoupon },
    { path: '/formAddress', component: formAddress },
    { path: '/formSuccess', component: formSuccess },
    { path: '/formCheckOrder', component: formCheckOrder }
  ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
