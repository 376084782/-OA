import Vue from 'vue';
import Vuex from 'vuex';
import root from './root';
import login from './root/login';
import menu from './root/menu';
import dictionary from './root/dictionary';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    root,
    login,
    menu,
    dictionary
  }
});
