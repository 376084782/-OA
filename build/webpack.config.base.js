const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const utils = require('./utils');
const config = require('../config');

module.exports = {
  entry: config.entry,
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      static: path.resolve('static'),
      src: path.resolve('src'),
      api: path.resolve('src/api'),
      assets: path.resolve('src/assets'),
      components: path.resolve('src/components'),
      layouts: path.resolve('src/layouts'),
      plugins: path.resolve('src/plugins'),
      router: path.resolve('src/router'),
      store: path.resolve('src/store'),
      view: path.resolve('src/view'),
      utils: path.resolve('src/utils'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: utils.assetsPath('medias/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
