/* 如果使用了组件库不建议使用重置样式 */
// import 'assets/css/reset.scss';
import 'plugins/element-ui';
import 'plugins/viser';
import 'plugins/ajax';
import Common from 'plugins/common'
import 'assets/css/index.js';
import Vue from 'vue';
import Router from 'router';
import store from 'store';
import LayoutDefault from 'layouts/default';
import filter from 'plugins/filter';

import $ from 'jquery';
window.$ = $;
filter(Vue);

store.dispatch('login/login');

var vue = new Vue();
Vue.use(Common)
var eventBus = {
  install(Vue, options) {
    Vue.prototype.$bus = vue;
  }
};
Vue.use(eventBus);

/* eslint-disable */
new Vue({
  el: '#app',
  router: Router,
  store,
  render: h => h(LayoutDefault)
});
