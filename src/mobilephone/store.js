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
    increment(state, payload) {
      if (payload) {
        state.count = payload
      } else {
        state.count++
      }
    },
    decrement(state) {
      state.count--
    },
  },
  actions: {
    getData({commit}, payload = 10) {
      new Promise(resolve => {
        setTimeout(() => {
          resolve({data: {
            code: 200,
            data: payload
          }})
        }, 3000)
      }).then(res => {
        let data = res.data.data
        commit('increment', data)
      })
    }
  }
})
// store.commit('increment')
export default store