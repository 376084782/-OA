import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './layout';

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

export default config;
