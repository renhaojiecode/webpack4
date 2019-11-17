const express = require('express')
const proxy = require('express-http-proxy')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const colors = require('colors')
const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)
const port = 2019
// 告诉 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))
app.use(require('webpack-hot-middleware')(compiler)) //启用HMR
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!\n`)
})
// proxy 转发代理，仅供开发时使用
let globalObj = typeof window !== 'undefined' ? window : global
function proxyDebuger(host) {
  return (proxyRes, proxyResData) => {
    globalObj.console.log('[PROXY]\t'.blue, colors.red(proxyRes.statusCode), host + proxyRes.req.path)
    return proxyResData
  }
}
const GATEWAY = {
  parentrest: {
    http: 'http://renhaojie.vipkid.com.cn:8077/rest/parentrest/',
    proxy: '/rest/parentrest/',
    path: '/rest/parentrest/'
  }
}
app.use((req, res, next) => {
  globalObj.console.log(colors.gray(`[GET] \t ${req.originalUrl}`))
  next()
})
for (let key in GATEWAY) {
  app.use(GATEWAY[key].proxy, proxy(GATEWAY[key].http, {
    proxyReqPathResolver: (req) => {
      return GATEWAY[key].path + require('url').parse(req.url).path
    },
    userResDecorator: proxyDebuger(GATEWAY[key].http)
  }))
}
