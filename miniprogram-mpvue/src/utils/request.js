// import store from '@/store'
// import { getToken } from '@/utils/auth'
var Fly = require('flyio/dist/npm/wx')
var service = new Fly()
const whiteList = ['tenant/sign_in']
if (mpvuePlatform === 'wx') {
  Fly = require('flyio/dist/npm/wx')
  service = new Fly()
} else {
  service = null
}

service.config.timeout = 600000
// 设置请求基地址
service.config.baseURL = 'https://www.qietuniu.com'

// 添加请求拦截器
service.interceptors.request.use(
  request => {
    request.headers['Content-Type'] = 'application/json; charset=UTF-8'

    request.headers['X-Tag'] = 'flyio'
    if (whiteList.indexOf(request.url) !== -1) {
      return request
    }
    if (wx.getStorageSync('token')) {
      console.log(wx.getStorageSync('token'))
      request.headers['accessToken'] = wx.getStorageSync('token')
    } else {
      wx.redirectTo({
        url: '/pages/login/main'
      })
    }
    return request
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
service.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.status.code !== 0) {
    //   handleError(res.status.message)
    //   return Promise.reject(res)
    // } else {
    //   return res
    // }
    return res
  },
  _error => {
    handleError()
    Promise.reject(new Error(_error))
  }
)

function handleError(msg) {
  wx.showToast({
    title: msg || '网络超时错误!',
    icon: 'none',
    duration: 2000
  })
}

export default service
