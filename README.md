# webpack-pc-cli
适用于PC端

### 配置

1. 按开发需求配置 `config/index.js` 文件

### 开发

```code
// 安装依赖
yarn install 或者 npm install
// 开发模式
npm run dev
// 编译打包
npm run build
```
### 已集成http请求API

> utils/axios.js 可以更改插件内容以适应自定义需求

```javascript
ajax({
  url: '/api/userinfo',
  method: 'get | post | put | delete | head | patch',
  data: {
    id: 8
  },
  type: 'json | form | formData',
  timestamp: 'false | true',
  // catchError: Boolean 是否开启全局错误弹窗, 需要自己引入弹窗
}).then((response) => {
  
}).catch((error) => {

})
```

### 规范

- 首字母大写的变量代表组件，插件，构造函数

- [👉 Eslint 规范](https://hub.imeete.com/BF-FED/shield-standard/src/branch/master/Javascript.md)

- [👉 Css 规范](https://hub.imeete.com/BF-FED/shield-standard/src/branch/master/Css.md)

- [👉 Git 规范](https://hub.imeete.com/BF-FED/shield-standard/src/branch/master/Git.md)

### 额外说明

- 已集成`vuex`, `vue-router`, `axios`。
- 文件夹中有README说明
# -OA
