// 引入自定义组件
import Pagination from "components/pagination";
import Step from "components/step";
import DynamicForm from "components/dynamicForm";
const Common = {
  install: function(Vue) {
    Vue.component("Pagination", Pagination);
    Vue.component("Step", Step);
    Vue.component("DynamicForm", DynamicForm);
  }
};
// 导出
export default Common;
