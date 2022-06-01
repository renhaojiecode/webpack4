export default {
  title: '移动端兼容性问题总结',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: 'ios 圆角不生效的问题',
      jsCode: `let a = null;
a = function () {return 123};`, // code  代码行最好用;结尾 以便copy运行
      desc: [
        '问题原因：圆角元素内部有子节点使用了CSS3动画，导致父元素overflow: hidden; 失效',
        '给带有圆角的元素设置transform: rotate(0deg)即可解决该问题;(也可以使用 对应动画方式尝试)',
        '文献：https://www.weipxiu.com/2552.html',
      ],
      img: [
        // '<img src="' + require('../img/async-await.jpg') + '"/>',
      ]
    },
    {
      title: '手机缩放 影响页面rem布局',
      jsCode: ``,
      desc: [
        '三星等手机有缩放功能（个别手机本身就有这个问题），会影响手机的布局 如果使用了 媒体查询可能会样式错乱',
        '解：meta 标签设置 width=device-width；媒体查询限制使用 min-device-width 来兜底；',
        '<br>&nbsp;&nbsp;  ',
      ],
      img: []
    },
    {
      title: '',
      jsCode: ``,
      desc: [
        '<br>&nbsp;&nbsp;  ',
      ],
      img: []
    },
    {
      title: '',
      jsCode: ``,
      desc: [
        '<br>&nbsp;&nbsp;  ',
      ],
      img: []
    },
  ]
}