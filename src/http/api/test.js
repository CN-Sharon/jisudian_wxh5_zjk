/*
  测试人员模块
*/
import request from '@/http/request'

const defaultPath = '/sharecharger-manager'

// 测试人员登陆，若有token返回，则直接进入公众号，反之则进行验证手机号
export function testerLogin (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/testerLogin`,
    method: 'post',
    data
  })
}
// 发送短信
export function sendSms (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/sendSms`,
    method: 'post',
    data
  })
}
// 验证手机号
export function verifyPhone (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/verifyPhone`,
    method: 'post',
    data
  })
}
// 获取人员信息
export function getUserInfo (params) {
  return request({
    url: `${defaultPath}/api/manager/admin/get`,
    method: 'get',
    params
  })
}
// 扫设备二维码
export function scanQR (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/scanQR`,
    method: 'post',
    data
  })
}
// 模拟用户扫一扫
export function simulateUseScanQR (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/simulateUseScanQR`,
    method: 'post',
    data
  })
}
// 模拟用户借宝
export function simulateUserHandle (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/simulateUserHandle`,
    method: 'post',
    data
  })
}
// 根据槽口弹充电宝
export function popOne (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/popOne`,
    method: 'post',
    data
  })
}
// 一键弹充电宝（持续时长至少2 * 8秒以上）
export function popAll (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/popAll`,
    method: 'post',
    data
  })
}
// 重启设备
export function rebootDevice (data) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/rebootDevice`,
    method: 'post',
    data
  })
}
// 重启设备
export function getCustomerPhone (params) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/getCustomerPhone`,
    method: 'get',
    params
  })
}
// 重新绑定
export function bindSn (params) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/bindSn`,
    method: 'get',
    params
  })
}
// 模拟测试记录
export function testList (params) {
  return request({
    url: `${defaultPath}/api/iotDevice/admin/testList`,
    method: 'get',
    params
  })
}
