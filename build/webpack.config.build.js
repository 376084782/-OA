const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const path = require('path');
const baseConfig = require('./webpack.config.base');
const utils = require('./utils');
const config = require('../config');

const buildConfig = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[hash:6].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].min.js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin(utils.assetsPath('css/[name].[chunkhash].css')),
    // 剥离公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
                path.join(__dirname, '../node_modules')
            ) === 0
        )
      }
    }),
    // 剥离webpack运行代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

const spinner = ora({
  text: '开始打包',
  color: 'green',
  spinner: 'bouncingBar'
});
spinner.start();
const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
shell.rm('-rf', config.build.assetsRoot);
shell.mkdir('-p', assetsPath);
shell.cp('-R', 'static/*', assetsPath);

webpack(buildConfig, function (err, stats) {
  spinner.succeed('打包完成。');
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
  console.log('\n');
  console.log(chalk.cyan('  项目构建完成，请在dist目录查看。\n'));
})