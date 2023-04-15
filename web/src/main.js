import Vue from 'vue'
import App from './App.vue'
import MChat from '@maybecode/m-chat'
import router from './router'
Vue.use(MChat)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
