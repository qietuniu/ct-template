import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { Button, Row, Col, Icon } from 'vant'
Vue.use(Button)
  .use(Row)
  .use(Col)
  .use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
