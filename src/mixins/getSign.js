
import config from '@/config';
import {
  getJSSDK
} from '@/api'
export default {
  methods: {
    // 获取微信js-sdk 参数
    getSign () {
      return new Promise((resolve, reject) => {
        getJSSDK({
          url: this.$store.state.app.sdkUrl
        }).then(res => {
          resolve(res.data.data)
        })
      })
    },
    // 初始化微信js-sdk
    initWxConfig({
      debug = false,
      ready = () => {}, // 初始化成功回调
      error = () => {}  // 初始化失败回调
    } = {}) {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      });
      this.getSign().then(sdk => {
        this.$wx.config({
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
        this.$wx.ready(() => {
          this.$toast.clear()
          ready && ready()
        })
        this.$wx.error(err => {
          this.$toast.clear()
          error && error(err)
        })
      })
    }
  }
}
