import Vue from 'vue'
import { Toast, CellGroup } from 'vant'
import store from '@/store'
import config from '@/config';
import {
  getJSSDK
} from '@/http/api'
/**
 * 过滤路由表
 * @param {*} routes
 * @param {*} key
 */
export function filterRouteByKey (routes = [], key = '') {
  let res = []
  routes.forEach(route => {
      if (hasChild(route)){
        res = res.concat(filterRouteByKey(route.children, key))
      }
      if (isRouteHasKey(route, key)) {
        res.push(route.name)
      }
  })
  return res
}

export function isRouteHasKey (route = {}, key = '') {
  return route.meta && route.meta[key]
}

export function hasChild (item) {
  return item.children && item.children.length !== 0
}

// 获取微信js-sdk 参数 for php
function getWxjssdk () {
  return new Promise((resolve, reject) => {
    // todo:sdk
    console.log(1111,store.state.app.sdkUrl)
    getJSSDK({
      url: store.state.app.sdkUrl
    }).then(res => {
      console.log("res===",res);
      resolve(res.data.data)
    })
  })
}
// 初始化微信js-sdk
export function initWxConfig({
    debug = false,
    ready = () => {}, // 初始化成功回调
    error = () => {}  // 初始化失败回调
  } = {}) {
    // Toast.loading({
    //   mask: true,
    //   message: '加载中...'
    // });
    getWxjssdk().then(sdk => {
      console.log('sdk---',sdk);
      Vue.prototype.$wx.config({
        debug,
        ...sdk,
        jsApiList: [
        'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'onMenuShareAppMessage',
        'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice',
        'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage',
        'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu',
        'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow',
        'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
        ]
    })
    Vue.prototype.$wx.ready(() => {
      Toast.clear()
      ready && ready()
    })
    Vue.prototype.$wx.error(err => {
      console.log("wx.error======",err);
      // location.reload()
      Toast.clear()
      error && error(err)
    })
  })
}


// 更新url
export function updateUrl (url) {
     // 每次路由更新后初始化js-sdk 请求使用的url
    const system = store.state.app.system
    let host = `${window.location.protocol}//${document.domain}/wx${url}`
    // 如果是安卓用户，每次存最新的
    if (system == 1) {
      store.dispatch('set_sdk_url', host)
    } else {
      // ios进入 先判断是否存在，存在不操作，不存在再存入，因为ios只取第一次进入公众号的url，刷新页面相当于重新进入
      const sdkUrl = store.state.app.sdkUrl
      if (!sdkUrl) {
        store.dispatch('set_sdk_url', host)
      }
    }
}
// 获取用户信息
export async function getUserInfo () {
  if (store.state.user.userInfo) {
      return
  } else {
      try {
        await store.dispatch('getUserInfo')
        return
      } catch (error) {
        return Promise.reject(error)
      }
  }
}
