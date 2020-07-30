import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    touchCount: 0,
  },
  getters: {
    allCount(state) {
      return state.touchCount + state.count
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
  }
})
// store.commit('increment')
export default store