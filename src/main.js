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
import {store} from './store/store'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router,
  components: {App},
  template: '<App/>'
});
