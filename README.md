###webpack config 学习
node v13.1.0
npm v6.12.1
webpack-dev-server 不能使用本地hosts 域名的问题  通过 disableHostCheck 选项解决 这种做法不太安全
目标
  github  actions ci 打通
  接入vue *
  实现单页面 vue-router *
  webpack-dev-server 编译文件在内存中 不能再磁盘看见的问题 * writeToDisk
  实现多页面
  pug 文件编译后 图片等资源地址问题
  接入 简单的单元测试 vue-test-util
  webpack-dev-server  不能使用本机ip 访问