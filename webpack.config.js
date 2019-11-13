const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const devMode = process.env.NODE_ENV !== 'production'
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: './src/home/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name]/bundle.js',
    path: path.resolve(__dirname, './dist'),
    sourceMapFilename: '[fail].map'
  },
  devtool: devMode ? 'eval-source-map' : '',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // 一切都启用 gzip压缩
    port: 8018,
    // noInfo: false, //true 用来隐藏 bundle 的一些信息
    warnings: true,
    errors: true
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components/')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        homeStyles: {
          name: 'home',
          test: (m,c,entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|ico|eot|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:18].[ext]',
              context: './src'
            }
          }
        ]
      },
      {
        enforce: 'pre', // 只对源文件检查 不用担心 babel-loader 等的修改
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new webpack.ProgressPlugin(), // 报告编译进度
    new CleanWebpackPlugin(), // 清理ouput文件夹
    new HtmlWebpackPlugin({
      // minify: { // 压缩HTML文件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true, // 删除空白符与换行符
      //   minifyCSS: true// 压缩内联css
      // },
      template: './src/home/index.pug',
      filename: 'home/index.html',
      favicon: './5th-two.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/home/base.html',
      filename: 'home/base.html',
      favicon: './5th-two.png'
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/style-[contenthash:18].css",
      // chunkFilename: devMode ? '[id].css' : '[id].[contenthash:18].css',
    }),
    new webpack.ProvidePlugin({
      // 自动引入Vue
      Vue: ['vue/dist/vue.esm.js', 'default']
    }),
    new webpack.DefinePlugin({ //全局变量
      'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV)
    }),
  ],
};