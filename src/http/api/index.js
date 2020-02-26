/*
  主要模块
*/
import request from '@/http/request'
const defaultPath = '/sharecharger-manager'

export function getJSSDK (data) {
  return request({
    url: `${defaultPath}/api/weChat/wxChatScan`,
    method: 'post',
    data
  })
}

// export function send (params) {
//   return request({
//     url: '/api/sms/send',
//     params
//   })
// }

// // 获取多个系统参数
// export function getSystemparameterList () {
//   return request({
//     url: '/api/sys-systemparameter/getSystemparameterList',
//   })
// }

// // 获取单个系统参数
// export function getSystemparameter (params) {
//   return request({
//     url: '/api/sys-systemparameter/getSystemparameter',
//     params
//   })
// }
