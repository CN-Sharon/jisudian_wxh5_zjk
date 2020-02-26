import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false,
    userType: -1
  },
  modules: {
    app,
  },
  mutations: {
    Change_Loading (state, loading = true) {
      state.loading = loading
    },
    set_userType (state, userType) {
      state.userType = userType
    }
  },
  getters,
})

export default store
