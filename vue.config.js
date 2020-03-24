const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path')
// node文件路径解析方法  __dirname 文件路劲
function resolve(dir) {
    return path.join(__dirname, './', dir)
}
module.exports = {
  publicPath: '/wx/',
  outputDir: 'dist',
  lintOnSave: false,
  css: {
    // modules: true,
    loaderOptions: {
      stylus: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件, 其他styl文件自动@import 该文件
        // data: `@import "@/stylus/variables.styl"`
      },
      // px 转 rem  开发设计稿按照750  然后给ps量的宽度除以 2  插件自己转
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: [] // 'van-'
          })
        ]
      }
    }
  },
  devServer: {
    // eslint
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8888, // 端口号
    host: '0.0.0.0',
    https: false,
    open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'https://adm.goshare-jsd.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api': ''
        }
      },
    }   // 可以配置多个代理
  },
  // 处理图标
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
