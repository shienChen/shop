import Vue from 'vue'
import App from './App.vue'
import router from './router'


import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入全国省市县三级联动的数据
import {provinceAndCityData,regionData,provinceAndCityDataPlus,regionDataPlus,CodeToText,TextCode} from 'element-china-area-data'

// 导入 NProgress 包对应的JS和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import '@/assets/css/styles.css'

import axios from 'axios'

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// 在 request 拦截器中展示进度条 NProgress.start()
NProgress.start()
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 request 拦截器中展示进度条 NProgress.done()

axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function(originVal){
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
