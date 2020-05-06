import axios from 'axios'
import { Toast  } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/': '/dev-api', // api 的 base_url
  timeout: 10000 // 请求超时时间
})


// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    if (store.getters.token) {
      config.headers['AccessId'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 'success') {
      if(res.msg.indexOf('AccessId') > -1) {
        store.dispatch('Logout').then(() => {})
      }
      // store.dispatch('Logout').then(() => {})
      if(response.request.responseURL.indexOf('login') > -1){
        return Promise.reject(res)
      }else {
        Toast.fail({
          message: res.msg || '网络错误'
        })
        return Promise.reject('error')
      }
    } else {
      return res
    }
  },
  error => {
    Toast.fail({
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default service
