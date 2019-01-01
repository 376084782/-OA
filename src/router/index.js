import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './layout';
import store from "store";

Vue.use(VueRouter);

const lists = {
  routes
};

let routers = [];
for (let i in lists) {
  routers = routers.concat(lists[i]);
}

const config = new VueRouter({
  routes: routers
});

import {
  getToken
} from "utils/assist";
const PATH_LOGIN = '/login'
config.beforeEach((to, from, next) => {
  const tokenConfig = getToken();
  let flagGetInfo = store.state.login.flagGetInfo;
  console.log(flagGetInfo, store)
  let token = tokenConfig.tokenSystem;
  let funcJump = () => {
    if (token && to.path === PATH_LOGIN) {
      // todo: 已登录且要跳转的页面是登录页,跳到首页
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  if (!token && to.meta.noLogin) {
    // 未登录且要跳转的页面不需要登录
    next() // 跳转
  } else if (!token) {
    // 未登陆且要跳转的页面需要登录
    next({
      path: PATH_LOGIN // 跳转到登录页
    })
  } else if (!flagGetInfo) {
    store.dispatch("userGetInfo").then(e => {
      funcJump()
    }).catch(e => {
    })
  } else {
    funcJump()
  }
})

export default config;
