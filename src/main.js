import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import 'amfe-flexible'   // 手淘rem适配方案
import Vant  from 'vant'
import 'vant/lib/index.css';
import wx from 'weixin-js-sdk'
import { VueSpinners } from '@saeris/vue-spinners'
import 'animate.css';
import "./registerServiceWorker"
import * as filters from './filters'  // 全局过滤器
import './stylus/index.styl'
import config from './config';
import './stylus/quill.css';

//  注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// loading组件
Vue.use(VueSpinners)

Vue.prototype.$imgUrl = config.file.url

Vue.use(Vant);

Vue.prototype.$wx = wx
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
