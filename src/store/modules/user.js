
import { getUserInfo } from '@/http/api/test'
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
    // 获取用户信息
    getUserInfo({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          let { code, data } = response.data
          if (code == 1) {
            commit('SET_USERINFO', data)
            resolve(response.data)
          } else if (code == 9 || code == 3 || 403) {
            // commit('SET_FREEZE', true)
            reject(new Error('token异常'))
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
