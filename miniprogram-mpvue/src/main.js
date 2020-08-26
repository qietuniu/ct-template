import Vue from 'vue'
import App from './App'
import store from './store'
import MpvueRouterPatch from 'mpvue-router-patch'
import '@/style/index.scss'
import globalMixin from './mixins/global'
Vue.mixin(globalMixin)

Vue.prototype.$store = store
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
