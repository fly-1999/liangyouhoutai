import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
// import i18n from '@/locale'
import config from '@/config'
import "@/assets/js/typedarray.js"
// import importDirective from '@/directive'
// import { directive as clickOutside } from 'v-click-outside-x'
import './index.less'
// import 'v-org-tree/dist/v-org-tree.css'
import axios from 'axios'
import api from './api'	// 导入api接口
import Print from './libs/print'
import directive from './directive/index'

import './util/rem' //适配
Vue.use(iView)
Vue.use(Print)
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
// importDirective(Vue)
directive(Vue)
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
