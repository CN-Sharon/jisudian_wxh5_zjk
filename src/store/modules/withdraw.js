
import { getToken, setToken, removeToken} from '@/utils/auth'
const user = {
  state: {
    token: getToken('user'),    // 用户token
    userInfo: null,       // 用户信息
    isFreeze: false,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken('user', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      if (userInfo.mobile) {
        window.localStorage.setItem('isBind', 1)
      }
    },
    REMOVE_TOKEN (state) {
      state.token = null
      removeToken('user')
    },
  },
  actions: {
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('REMOVE_TOKEN')
        resolve()
      })
    },
  }
}

export default user
