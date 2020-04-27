export default {
  title: '文件作用 标题',
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
      title: '',
      jsCode: ``,
      desc: [
        '',
      ],
      img: []
    },
  ]
}