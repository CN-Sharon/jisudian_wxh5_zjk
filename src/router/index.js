import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import { Toast, CellGroup } from 'vant'
import { urlParse } from '@/utils'
import testStore from '@/store/modules/test'
import withdrawStore from '@/store/modules/withdraw'
import { updateUrl,initWxConfig} from "./util";
import { setToken } from '@/utils/auth'
Vue.use(Router)
const router = new Router({
  mode: 'history',       // 路由模式 一律采用history
  base: '/wx/',     // 应用的根路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  routes,
  //点击浏览器导航返回按钮滚动条滚回跳转之前的位置
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  // if (process.env.NODE_ENV == 'development') {
  //   setToken('user', 'eyJMaXVKaWVCYW5nIjoiSnd0VXRpbCIsImFsZyI6IkhTNTEyIn0.eyJtYW5hZ2VySWQiOiJNQU4wMDAwMDAwMDAwMDIiLCJpc3MiOiJyZXN0YXBpYXV0aHRpY2F0aW9uIiwiYXVkIjoiMjM4OXJmanNrZGZoMjM4aHNqZmhzams4MjM0ZXVmaHNnZGZnajgzaCIsImV4cCI6MTU4MDQ2MTA4NSwibmJmIjoxNTgwMjAxODg1fQ.dVJB0HmCQa7tzt4-zYzTgWcREm_CXafbhtlld8nC-bQ3MhL3wht42-3v9pPjV1Y3CnNwSO6rnwdsQWHK9Qp9fA')
  // }
  const { title,wxsdk,white } = to.meta
  if (title) {
    document.title = title
  }
  // const isTab = to.matched.filter(route => route.meta && route.meta.isTab)
  const userTypeRoute = to.matched.filter(route => route.meta && route.meta.userType)
  const requiredUserInfo = to.matched.some(route => route.meta && route.meta.requiredUserInfo)
  const userType = userTypeRoute.length ? userTypeRoute[0].meta.userType : 1
  if (userType && !store.state.user) {
    let dynamicStore
    switch (userType) {
      case 2:
        dynamicStore = withdrawStore
        break;
      default:
        dynamicStore = testStore
        break;
    }
    dynamicStore = testStore
    store.registerModule('user', dynamicStore)
  }
  console.log("22--userType---",userType)
  if(userType === 1){
    // 测试模块
    const { user } = store.state
    const { token, userInfo } = user
    console.log("22--wxsdk---",wxsdk)
    console.log("22--wxsdk---",to.fullPath)
    wxsdk && updateUrl(to.fullPath)
    if (!token) {
      if (requiredUserInfo) {
        Toast('请从公众号先登录')
      }
      next()
    } else {
      if (requiredUserInfo) {
        if (userInfo) {
          next()
        } else {
          store.dispatch('getUserInfo').then(() => {
            next()
          }).catch(err => {
            if (err && err.response && err.response.status == 500 || err.data && err.data.code == 500) {
              if (name === 'error-500') {
                  next()
              } else {
                  next({
                    name: 'error-500'
                  })
              }
            } else {
              next()
            }
          })
        }
      } else {
        next()
      }
    }
  }else if(userType === 2){
    // 提现模块
    const { Authorization } = urlParse(document.URL)
    Authorization && store.commit('SET_TOKEN', Authorization)
    wxsdk && updateUrl(to.fullPath)
    const {
      token
    } = store.state.user
    // 白名单直接放行
    if (white) {
      next()
    } else {
      if (!token) {
        next({
          name: 'withdrawLogin',
        })
        // todo:::
        // window.location.replace(`${QUAH_RIDERECT_URL}${to.fullPath}`)
        // next()
      } else {
        next()
        // if (requiredUserInfo) {
        //   try {
        //     await getUserInfo()
        //     next()
        //   } catch (err) {
        //     next({ name: 'error-500' })
        //   }
        // } else {
        //   next()
        // }
      }
    }
  }

})

router.afterEach((to, from) => {
  console.log("after router !!!---",to.fullPath)
  to.meta.wxsdk && updateUrl(to.fullPath)
  //const { wxsdk } = to.meta
  //if (wxsdk) {
  //  updateUrl().then(() => {
  //    initWxConfig()
  //  })
  //} else {
  //  updateUrl()
  //}
})
export default router
