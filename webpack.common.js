const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserJSPlugin = require("terser-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    home: './src/home/index.js',
    homecopy: './src/homecopy/index.js',
    vuerouter: './src/vuerouter/index.js',
  },
  output: {
    filename: '[name]/bundle-[chunkhash:18].js',
    chunkFilename: '[name]/bundle-[chunkhash:18].js',
    path: path.resolve(__dirname, './dist'),
    sourceMapFilename: '[file].map',
    publicPath: '/'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components/')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              hotReload: false, // 禁止hot
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
        }]
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.css$/,
        sideEffects: true, //有副作用代码 避免引入被删除
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  // 开启 CSS Modules
                  modules: true,
                  // 自定义生成的类名
                  // localIdentName: '[hash:base64:8]'
                }
              }
            ]
          },
          {
            resourceQuery: /\.vue$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader'
            ]
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        sideEffects: true,
        oneOf: [
          {
            resourceQuery: /\.vue$/,
            use: [
              'vue-style-loader',
              'css-loader',
              'stylus-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'stylus-loader'
            ]
          }
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 清理ouput文件夹
    new webpack.ProgressPlugin(), // 报告编译进度
    new HtmlWebpackPlugin({
      // minify: { // 压缩HTML文件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true, // 删除空白符与换行符
      //   minifyCSS: true// 压缩内联css
      // },
      template: './src/home/index.pug',
      filename: 'home/index.html',
      chunks: ['home'], // 该插件默认把所有入口文件全部引入html 所以限定引入模块
      favicon: './5th-two.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/home/base.html',
      filename: 'home/base.html',
      chunks: ['home'],
      favicon: './5th-two.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/homecopy/index.html',
      filename: 'homecopy/index.html',
      chunks: ['homecopy'],
      favicon: './5th-two.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/vuerouter/index.html',
      filename: 'vuerouter/index.html',
      chunks: ['vuerouter'],
      favicon: './5th-two.png'
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/style-[contenthash:18].css",
      chunkFilename: '[name]/style-[contenthash:18].css',
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({ //全局变量
      'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV)
    }),
  ],
  // optimization: {
    // minimizer: [ 
    //   // devMode ? new TerserJSPlugin() : '', //压缩js代码
    //   new OptimizeCssAssetsPlugin({
    //     assetNameRegExp: /\.css$/g,
    //     cssProcessorOptions: {
    //       safe: true,
    //       autoprefixer: { disable: true }, //禁用掉cssnano对于浏览器前缀的
    //       mergeLonghand: false,
    //       discardComments: {
    //         removeAll: true // 移除注释
    //       }
    //     },
    //     canPrint: true
    //   }),
    // ],
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
  // },
}
