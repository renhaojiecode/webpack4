const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // 一切都启用 gzip压缩
    writeToDisk: true, // 将文件写入磁盘
    publicPath: '/',
    port: 8018,
    // hot: true, // 模块热替换HotModuleReplacementPlugin 不能使用chunkhash 和 contenthash
    // host: '0.0.0.0',
    disableHostCheck: true, // 绕过主机 host 检查 不知道为什么今天不行了
    // useLocalIp: true, // 允许使用本地ip  未成功原因不明
    proxy: {
      '/rest/parentrest': {
        target: 'http://renhaojie.vipkid.com.cn:8077',
        // pathRewrite: {'^/api/parentrest' : ''}
      }
    },
  },
  optimization: {
    minimize: true, //压缩bundle文件
    // runtimeChunk: 'single',
    namedChunks: true, // 防止chunk id 根据自增而改变
    // splitChunks: {
    //   cacheGroups: {
    //     homeStyles: {
    //       name: 'home',
    //       test: (m,c,entry = 'foo') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
    //       chunks: 'all',
    //       enforce: true,
    //     }
    //   }
    // }
  },
})