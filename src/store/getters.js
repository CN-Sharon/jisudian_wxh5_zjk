const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  sdkUrl: state => state.app.sdkUrl,
  isBind: state => {  // 用户是否绑定手机，配合本地缓存，不需要绑定用户信息的页面不调getUserInfo接口
    return window.localStorage.getItem('isBind') ||  state.user.userInfo && state.user.userInfo.mobile
  },
}
export default getters
