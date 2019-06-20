import Vue from 'vue'
import App from './views/index.vue'

import '@/styles/normalize.scss'
import '@/styles/base.scss'
import '@/styles/flex.css'

import 'babel-polyfill'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
