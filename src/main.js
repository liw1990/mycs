// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import {post,fetch,patch,put} from 'http'


Vue.prototype.$axios = axios
Vue.config.productionTip = false

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
