# 存放插件，用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件

并不是插件文件，而是如下的文件

```javascript
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Element, { locale })
}
```

```javascript
import Net from '../utils/net' // 网络请求封装插件
import UI from '../utils/ui' // 自定义ui插件

window.Util = {
  Net,
  UI
} ;
```