import {
  login
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import Cookies from 'js-cookie'
const user = {
  state: {
    token: getToken(),
    currentTab: 0
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CURRENT_TAB: (state, currentTab) => {
      state.currentTab = currentTab
    }
  },
  actions: {
    // user login
    Login({
      commit
    }, userInfo) {
      const {
        username,
        password
      } = userInfo
      return new Promise((resolve) => {
        commit('SET_TOKEN', new Date().getTime())
        Cookies.set('userName', username.trim())
        setToken(new Date().getTime())
        console.log('password', password)
        resolve()
        // login({
        //   account: username.trim(),
        //   password: password
        // }).then(response => {
        //   const {
        //     data
        //   } = response
        //   commit('SET_TOKEN', data)
        //   Cookies.set('userName', username.trim())
        //   setToken(data)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },
    // user logout
    Logout({
      commit
    }) {
      return new Promise((resolve) => {
        removeToken() 
        Cookies.remove('userName')
        commit('SET_TOKEN', '')
        resolve()
      })
    },
    // user logout
    ClickTab({
      commit
    }, currentTab) {
      return new Promise((resolve) => {
        commit('SET_CURRENT_TAB', currentTab)
        resolve()
      })
    }
  }
}

export default user