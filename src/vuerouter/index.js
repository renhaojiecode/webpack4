import './style.styl'
import Vue from 'vue'
import App from './app.vue'
import router from './router.js'
// runtime
new Vue({
  el: '#app',
  router,
  render: h => {return h(App)},
})