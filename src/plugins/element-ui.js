import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

if (ElementUI) {
  Vue.use(ElementUI);
  window.$message = ElementUI.Message;
} else {
  console.warn('请加载ElementUI');
}
