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
