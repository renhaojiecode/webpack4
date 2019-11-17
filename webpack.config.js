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

const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    home: './src/home/index.js',
    homecopy: './src/homecopy/index.js',
    print: './src/print.js',
  },
  output: {
    filename: '[name]/bundle-[contenthash:18].js', // devMode ? '[name]/bundle-[hash:18].js' : 
    path: path.resolve(__dirname, './dist'),
    sourceMapFilename: '[file].map',
    publicPath: '/'
  },
  devtool: devMode ? 'eval-source-map' : '',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // 一切都启用 gzip压缩
    writeToDisk: true, // 将文件写入磁盘
    publicPath: '/',
    port: 8018,
    //hot: true, // 模块热替换HotModuleReplacementPlugin 不能使用chunkhash 和 contenthash
    disableHostCheck: true, // 绕过主机 host 检查
    // useLocalIp: true, // 允许使用本地ip  未成功原因不明
    proxy: {
      '/rest/parentrest': {
        target: 'http://renhaojie.vipkid.com.cn:8077',
        // pathRewrite: {'^/api/parentrest' : ''}
      }
    },
  }, 
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components/')
    }
  },
  optimization: {
    namedModules: true,
    runtimeChunk: 'single',
    namedChunks: true, // 防止chunk id 根据自增而改变
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
          // 'style-loader',
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
  plugins: [],
};
const plugins = [
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
]
// devMode && plugins.push(
//   new webpack.HotModuleReplacementPlugin(), //dev环境 启用HMR module.hot
// )
webpackConfig.plugins = plugins
module.exports = webpackConfig;