import Vue from 'vue';
import Viser from 'viser-vue';

if (Viser) {
  Vue.use(Viser);
} else {
  console.warn('请加载Viser文件');
}
