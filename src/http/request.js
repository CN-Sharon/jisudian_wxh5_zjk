/*
  数据请求模块
*/
import axios from 'axios'
import store from '@/store'
import config from '@/config'
import { urlParse } from '@/utils';
import { Toast } from 'vant'
const {  apiURL, timeout } = config.request
const baseURL = process.env.NODE_ENV === 'production' ?  apiURL : '/api'
const service = axios.create({
  baseURL,
  timeout
})
// 请求拦截器
service.interceptors.request.use(config => {
  const { method } = config
  let noLoading
  if (method === 'get') {
    config.params = config.params ? config.params : {}
    noLoading = config.params.noLoading
  } else {
    config.data = config.data ? config.data :{}
    noLoading = config.data.noLoading
  }
  store.commit('Change_Loading', noLoading)  // 显示全局loading图
  const userStore = store.state.user
  if (userStore && userStore.token) {
    config.headers['Authorization'] = userStore.token
  }
  // 文件流采用formdata数据类型
  if (!(config.data instanceof FormData)) {
    if (config.json) {
      config.headers['Content-Type'] = "application/json"
    } else {
      config.headers['Content-Type'] = "application/x-www-form-urlencoded; charset=UTF-8"
      config.data = queryParse(config.data)
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 返回拦截器
service.interceptors.response.use(
    response => {
      let { method } = response.config
      let data = response.config.data
      let noToast
      if (method === 'get') {
        noToast = response.config.params.noToast || true
      } else {
        if (data instanceof FormData) {
          noToast = data.get('noToast')
        } else {
          noToast = urlParse(data).noToast || true
        }
      }
      store.commit('Change_Loading', false)
      let errorMesg = ''
      switch (response.status) {
        case 200:
        {let { code, msg } = response.data
          if (code !== 1) {
            if (code === 403) {
              // store.commit('REMOVE_TOKEN')
            }
            if (code == 500) {
              return Promise.reject(response)
            }
            if (noToast) {

              Toast(msg)
            }
          }
        }
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorMesg = '服务器出错'
          break
      }
      return response
    },
    error => {
      store.commit('Change_Loading', false)
      console.log('err', error)// for debug
      Toast('网络连接超时');
      return Promise.reject(error)
    })
/*
  如果前端传给后端的输类型是  application/x-www-form-urlencoded， 需要自己把数据拼接成
*/
function queryParse (query) {
  let res = []
  for (let k in query) {
    res.push(`${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
  }
  return res.join('&')
}

export default service

