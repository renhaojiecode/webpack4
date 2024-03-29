const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const TerserJSPlugin = require("terser-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    home: './src/home/index.js',
    homecopy: './src/homecopy/index.js',
    vuerouter: './src/vuerouter/index.js',
    interview: './src/interview/index.js',
    mobilephone: './src/mobilephone/index.js',
    video: './src/video/index.js',
    webcomponents: './src/webcomponents/index.js',
    vuedev: './src/vuedev/index.js',
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
      '@components': path.resolve(__dirname, './src/components/'),
      '@common': path.resolve(__dirname, './src/common/')
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
        test: /\.(jpg|png|jpeg|gif|svg|ico|eot|ttf|otf|woff|woff2|webp)$/,
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          }
        ]
      },
      {
        enforce: 'pre', // 只对源文件检查 不用担心 babel-loader 等的修改
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        include: /src/,
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
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require("./dll/manifest.json"),
    // }),
    new HtmlWebpackPlugin({
      // minify: { // 压缩HTML文件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true, // 删除空白符与换行符
      //   minifyCSS: true// 压缩内联css
      // },
      template: './src/home/index.pug',
      filename: 'home/index.html',
      chunks: ['home'], // 该插件默认把所有入口文件全部引入html 所以限定引入模块
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/home/base.html',
      filename: 'home/base.html',
      chunks: ['home'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/homecopy/index.html',
      filename: 'homecopy/index.html',
      chunks: ['homecopy'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/vuerouter/index.html',
      filename: 'vuerouter/index.html',
      chunks: ['vuerouter'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/interview/index.html',
      filename: 'interview/index.html',
      chunks: ['interview'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/mobilephone/index.html',
      filename: 'mobilephone/index.html',
      chunks: ['mobilephone'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/video/index.html',
      filename: 'video/index.html',
      chunks: ['video'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/webcomponents/index.html',
      filename: 'webcomponents/index.html',
      chunks: ['webcomponents'],
      favicon: './favicon.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/vuedev/index.html',
      filename: 'vuedev/index.html',
      chunks: ['vuedev'],
      favicon: './favicon.png'
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./dll/dllvendor.dll.js'),
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
  optimization: {
    // runtimeChunk: {
    //   name: "_manifest"
    // },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        vendors: false,
        // defaults1: { // 自己开发的并且需要打到每个页面里的脚本，都放在这里
        //   name: 'parents/_defaults1',
        //   test: /(gt\.js|_loadTrack\.js)/,
        //   chunks: 'initial',
        //   minChunks: 1,
        //   minSize: 1,
        //   enforce: true,
        //   priority: 20,
        // },
        vendor: { // node_modules里面的需要打到每个页面里的脚本，都放在这里
          name: '_vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minChunks: 10,
          enforce: true,
          priority: 10,
        },
        common: { //  自己开发的组件，符合minChunks: 10的，都放在这里面
          name: '_common',
          test: /\.js/,
          chunks: "all",
          minChunks: 10,
          enforce: true,
          priority: 5
        }
      },
    }
  },
}
