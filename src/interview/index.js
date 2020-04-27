import './style.styl'
import '@common/monokai_sublime.css'
import Vue from 'vue'
import App from './app.vue'
// runtime
new Vue({
  el: '#app',
  render: h => {return h(App)},
})