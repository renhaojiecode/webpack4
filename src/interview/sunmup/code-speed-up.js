export default {
  title: '性能优化',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: '模块作用 副标题',
      jsCode: `let a = null;
a = function () {return 123};`, // code  代码行最好用;结尾 以便copy运行
      desc: [
        '一些规则介绍 描述等 以数组形式 分成多条',
      ],
      img: [
        // '<img src="' + require('../img/async-await.jpg') + '"/>',
      ]
    },
    {
      title: '性能优化：',
      jsCode: ``,
      desc: [
        '静态资源多域名部署、可以解决  \
        <br>&nbsp;&nbsp; 首先是使用不同域名可以再访问资源时不携带cookie 加快访问速度， \
        <br>&nbsp;&nbsp; 浏览器对于同域名资源访问数量的限制， \
        <br>&nbsp;&nbsp; 同时可以对这些域名做DNS预解析',
        '非首页展示资源 懒加载',
        '开启 gzip压缩  content-encoding: gzip',
        'http 升级 1.1可以进行长连接 Connection: keep-alive； HTTP2.0 可以进行多路复用',
        '开启缓存 Cache-Control 强缓存  If-None-Match/E-tag 协商缓存',
        '代码层面可以： \
        <br>&nbsp;&nbsp; js外链资源放在body底部 \
        <br>&nbsp;&nbsp; 修改样式是最好 定义class进行修改 避免多次渲染 \
        <br>&nbsp;&nbsp; 缓存一些获取的值 比如offsetTop等 \
        <br>&nbsp;&nbsp; 采用虚拟dom',
      ],
    },
    {
      title: '服务端渲染：SSR',
      jsCode: ``,
      desc: [
        '框架 nuxt.js',
        '更快 一个方面是 服务器内网访问没有带宽限制速度快，并且可以进行缓存',
        '更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。',
        '两套页面、如果服务端渲染资源获取失败  就要切换客户端渲染。',
        'ssr 缓存 对于多用户访问 相同的部分只渲染一次 不同的用户信息重新获取。',
      ],
    },
  ]
}