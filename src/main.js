// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from '@/store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FastClick from 'fastclick'
import NProgress from 'nprogress'
import { checkToken } from '@/common/js/utils'
import 'nprogress/nprogress.css'// Progress 进度条样式
import { AlertPlugin, AjaxPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin } from 'vux'
import "./common/stylus/index.styl"

// 调用微信jssdk
import { WechatPlugin } from 'vux'
Vue.use(WechatPlugin)

Vue.config.productionTip = false
FastClick.attach(document.body)

// 服务器地址
if (process.env.NODE_ENV === 'development') {
  global.serverHost = ''
} else {
  // 生产服务器
  // global.serverHost = "https://caomeng.me"
  // 测服务器
  global.serverHost = "https://ceshi100.caomeng.me"
}

// 临时token
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNTQ3MDAxOTI5LCJuYmYiOjE1NDcwMDE5MjksImV4cCI6MTU0Nzg2NTkyOX0.XtLttvbK_hbW5HOGq6WQeUQfyLMTpfZyPxGJ6hECiVQ'

// token
let url = window.location.href
checkToken(url)

// 全局配置axios
Vue.prototype.$axios = axios
const instance = axios.create()
instance.defaults.baseURL = ''
instance.defaults.timeout = 10000
instance.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  Vue.$vux.loading.show({
    text: '加载中'
  })
  // console.log(Vue.$vux)
  return config
}, err => {
  return Promise.reject(err)
})
axios.interceptors.response.use( response => {
  Vue.$vux.loading.hide()
  return response.data
})
instance.defaults.headers.common['x-access-token'] = global.token

// 获取用户信息
if (global.token) {
  Vue.prototype.$axios.get('/users/info').then((res) => {
    store.dispatch('saveUserInfo', res.data.userInfo)
    console.log(store)
  })
}

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)
Vue.use(VueAwesomeSwiper)

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
