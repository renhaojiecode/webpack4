import './style.styl'
import Vue from 'vue'
import App from './app.vue'
import store from './store.js'
new Vue({
  el: '#app',
  store,
  render: h => {return h(App)},
})