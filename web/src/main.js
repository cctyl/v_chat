import Vue from 'vue'
import App from './App.vue'
// import MChat from '../../module/m-chat/lib-dist/m-chat.umd.min'
import MChat from 'D:\\temp\\m-chat-master\\lib-dist/m-chat.umd.min'
Vue.use(MChat)


import { Toast } from 'vant';
Vue.use(Toast);


import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
