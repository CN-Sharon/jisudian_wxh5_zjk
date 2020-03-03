import { systemType } from '@/utils/system'
import { filterRouteByKey } from '@/router/util';
import routes from '@/router/routes';
const app = {
  state: {
    sdkUrl: '',  // 存放获取js-sdk 所需url,安卓每次调用sdk取最新的url, ios取第一次进入公众号的url
    system: systemType(),  // 0 为ios 1 为安卓
    shareUrl: '',
    tabbarActiveIndex: 0
  },
  getters: {
    whiteList (state) {
      return filterRouteByKey(routes, 'requiredUserInfo')
    },
    cachViews () {
      return filterRouteByKey(routes, 'cache') || []
    }
  },
  mutations: {
    SET_SDK_URL (state, url) {
      state.sdkUrl = url
    },
    SET_SHARE_URL (state, url) {
      state.shareUrl = url
    },
    SET_INDEX (state, index) {
      state.tabbarActiveIndex = index
    }
  },
  actions: {
    set_sdk_url ({commit}, url) {
      commit('SET_SDK_URL', url)
    },
    set_tabbar_index ({commit}, index) {
      commit('SET_INDEX', index)
    }
  }
}

export default app
