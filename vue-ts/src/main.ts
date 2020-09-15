import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/rem";

import "vant/lib/index.less";
import "@/assets/style/index.less";
import "@/assets/font_1636142_wso4f6hvq4s/iconfont.css";
import Vant, { Lazyload } from "vant";
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
