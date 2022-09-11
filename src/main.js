import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'

import {
  NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, List,
  PullRefresh, ActionSheet, Overlay, Col, Row, Badge, Search, Cell, Divider,
  Tag, CellGroup, Dialog, Image, Popup, DatetimePicker
} from 'vant'

Vue.config.productionTip = false

Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Overlay)
Vue.use(Col)
Vue.use(Row)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Cell)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(Popup)
Vue.use(DatetimePicker)
// 获取焦点自定义指令
Vue.directive('focus', {
  inserted (el) {
    if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
      el.focus()
    } else {
      const theInput = el.querySelector('input')
      const theTextArea = el.querySelector('textarea')
      if (theInput) theInput.focus()
      if (theTextArea) theTextArea.focus()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
