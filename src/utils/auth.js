import Cookies from 'js-cookie'
import config from '@/config'

const { TokenKey, expires: expireDay } = config.auth
/**
 *  获取token
 * @export fn
 * @returns String
 */
export function getToken(key = TokenKey) {
  return Cookies.get(key)
}
/**
 *
 * @export
 * @param {*} token 后台返回的token
 * @param {number} [expires=2]  过期时间
 * @returns
 */
export function setToken(key = TokenKey, token, expires = expireDay) {
  return Cookies.set(key, token, { expires })   // token 过期时间 设置2天 自己更改
}
export function setLocal(key,value) {
  return localStorage.setItem(key,JSON.stringify(value))   // 购物车信息
}
export function getLocal(key) {
  return JSON.parse(localStorage.getItem(key)) || [] // 购物车信息
}
/**
 * 清除token
 * @export fn
 * @returns null
 */
export function removeToken(key = TokenKey) {
  return Cookies.remove(key)
}

