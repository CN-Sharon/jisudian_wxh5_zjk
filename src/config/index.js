const env = process.env.NODE_ENV
export default {
  file: {
    url: 'https://smart.cloudjoin.cn/'
  },
  auth: {
    TokenKey: 'authorization-app',  // 本地存储的token key值
    expires: 2                  // token过期时间
  },
  request: {
    apiURL: 'https://smart.cloudjoin.cn/', // 项目线上域名, 本地开发环境不要改这里
    timeout: 100000,                                // 请求超时时间
    env: 'java'
  },
  websocket: {
    dev: 'wss://smart.cloudjoin.cn/websocket/',
    pro: 'wss://192.168.1.61:9148/websocket/',
    url: env === 'production' ? 'wss://smart.cloudjoin.cn/websocket/' : 'wss://192.168.1.61:9148/websocket/'
  }
}
