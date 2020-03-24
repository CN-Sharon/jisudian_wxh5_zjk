const env = process.env.NODE_ENV
export default {
  file: {
    url: 'https://adm.goshare-jsd.com/'
  },
  auth: {
    TokenKey: 'authorization-app',  // 本地存储的token key值
    expires: 2                  // token过期时间
  },
  request: {
    apiURL: 'https://adm.goshare-jsd.com/', // 项目线上域名, 本地开发环境不要改这里
    timeout: 100000,                                // 请求超时时间
    env: 'java'
  },
  websocket: {
    dev: 'wss://adm.goshare-jsd.com/websocket/',
    pro: 'wss://192.168.1.61:9148/websocket/',
    url: env === 'production' ? 'wss://adm.goshare-jsd.com/websocket/' : 'wss://192.168.1.61:9148/websocket/'
  }
}
