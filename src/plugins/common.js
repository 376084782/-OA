// 引入自定义组件
import pagination from 'components/pagination'
const Common = {
  install: function (Vue) {
    Vue.component('Pagination', pagination)
  }
}
// 导出
export default Common
