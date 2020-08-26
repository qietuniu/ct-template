// import { login } from '@/api/user'
// import Cookies from 'js-cookie'

const user = {
  state: {
    token: wx.getStorageSync('token')
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      wx.setStorageSync('token', token)
    }
  },

  actions: {
    async Login({ commit }, userInfo) {
      // const account = userInfo.account.trim()
      // const res = await login({ account: account, password: userInfo.password })
      // commit('SET_TOKEN', res.accessToken)
      // return res
      commit('SET_TOKEN', '0000')
      return {
        status: {
          code: 0
        }
      }
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        wx.removeStorageSync('token')
        resolve()
      })
    }
  }
}

export default user
