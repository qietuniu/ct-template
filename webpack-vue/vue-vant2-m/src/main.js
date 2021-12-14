import Vue from 'vue';
import App from './App';
import { router } from './router';
import store from './store'
import '@/utils/rem';
import { Button, NavBar, Toast, Step, Steps, Field,Checkbox, CheckboxGroup, Uploader, Cell, CellGroup, Dialog,Popup, Picker, TreeSelect, Area,Row, Col,Icon,DatetimePicker, Loading, Tab, Tabs, Sticky, Swipe, SwipeItem, Lazyload, NoticeBar, DropdownMenu, DropdownItem, Collapse, CollapseItem, Search, Overlay, List, Rate } from 'vant';
import '@/assect/style/vant.less'
import '@/assect/font_1636142_wso4f6hvq4s/iconfont.css'

Vue.use(Button).use(NavBar).use(Toast).use(Step).use(Steps).use(Field).use(Checkbox).use(CheckboxGroup).use(Uploader).use(Cell).use(CellGroup).use(Dialog).use(Popup).use(Picker).use(TreeSelect).use(Area).use(Row).use(Col).use(Icon).use(DatetimePicker).use(Loading).use(Tab).use(Tabs).use(Sticky).use(Swipe).use(SwipeItem).use(Lazyload, {lazyComponent: true}).use(NoticeBar).use(DropdownMenu).use(DropdownItem).use(Collapse).use(CollapseItem).use(Search).use(Overlay).use(List).use(Rate).use(Row)

// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});