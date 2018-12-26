/**
 * 项目脚手架配置文件
 * 分为`生产环境配置`和`开发环境配置`
 * 
 */
const path = require('path');

module.exports = {
  // 入口文件配置
  entry: {
    'app': path.resolve(__dirname, '../src/main.js')
  },
  // 生产环境配置信息
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
  },
  // 开发环境配置信息
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 4321,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    cssSourceMap: false,
    // mock数据配置
    proxyTable: {
      // 所有以api开头的借口都会走yapi，当然你可以更改api的名称
      '/api': {
        target: 'http://yapi.imeete.com/mock/405',
        changeOrigin: true
      }
    },
  }
};
