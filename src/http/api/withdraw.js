/*
  提现模块
*/
import request from '@/http/request'

const defaultPath = '/sharecharger-manager'

// 登录
export function ppLogin(data) {
  return request({
    url: `${defaultPath}/api/manager/admin/ppLogin`,
    method: 'post',
    data
  })
}

// 提现
export function withdraw(data) {
  return request({
    url: `${defaultPath}/api/order-withdraw-detail/admin/order`,
    method: 'post',
    data
  })
}

// 可提现余额
export function getCashRequestBalance(params) {
  return request({
    url: `${defaultPath}/api/order-withdraw/admin/getCashRequestBalance`,
    params
  })
}

// 修改密码
export function updatePwd(params) {
  return request({
    url: `${defaultPath}/api/manager/admin/updatePwd`,
    method: 'put',
    params
  })
}

// 获取用户信息
export function getUserInfo(params) {
  return request({
    url: `${defaultPath}/api/manager/admin/get`,
    params
  })
}
