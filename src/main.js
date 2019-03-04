// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入这个才能用this.$http.get之类的
import VueResource from 'vue-resource'
//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//Vuex
import { store } from './store/store'
//Axios
import Axios from 'axios'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.config.devtools = true;//开发者模式,能使用chrome上的vue工具

//这里不用"application/json"的话,使用post请求后台时没参数就没有放在body里,所以请求不到
Axios.defaults.headers = {
  "Content-Type": "application/json"
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
});
