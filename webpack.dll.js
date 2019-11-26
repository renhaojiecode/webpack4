const path = require('path');
const webpack = require('webpack');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');// 多线程代码压缩

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    dllvendor: [
      'vue',
      'axios',
    ]
  },
  output: {
    path: path.join(__dirname, './dll'),
    filename: '[name].dll.js',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, "./dll/manifest.json"),
    }),
    new webpack.DefinePlugin({ //全局变量
      'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV)
    }),
  ]
}