const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const vConsolePlugin = require('vconsole-webpack-plugin');
const config = require('../config');
const baseConfig = require('./webpack.config.base');
const address = require('./ip');
const opn = require('opn');
let isFirst = true;

module.exports = merge(baseConfig, {
  devServer: {
    contentBase: path.join(__dirname, '../'),
    overlay: { warnings: false, errors: true },
    inline: true,
    hot: true,
    quiet: true,
    progress: false,
    headers: {},
    host: '0.0.0.0',
    port: config.dev.port,
    proxy: config.dev.proxyTable,
  },
  devtool: '#eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        // use: [{
        //   loader: 'eslint-loader',
        //   options: {
        //     formatter: require('eslint-friendly-formatter')
        //   }
        // }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new FriendlyErrorsPlugin(),
    new vConsolePlugin({enable: false}),
    new ProgressBarPlugin({
      callback: function () {
        console.log('\n');
        console.log(chalk.cyan(`服务器已启动，局域网可访问：${address}\n`));
        if (isFirst) {
          isFirst = false;
          opn(`http://127.0.0.1:${config.dev.port}`);
        }
      }
    }),
  ]
});
