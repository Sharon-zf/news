import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userImag: '',
    userName: ''
  },
  getters: {
  },
  mutations: {
    setImag (state, imagUrl) {
      state.userImag = imagUrl
    },
    setName (state, name) {
      state.userName = name
    }
  },
  actions: {
  },
  modules: {
  }
})
