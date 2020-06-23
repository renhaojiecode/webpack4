export default {
  title: '文件作用 标题',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: '盒模型',
      jsCode: ``,
      desc: [
        'margin border padding content',
        'box-sizing: content-box 是W3C盒子模型  \
        <br>&nbsp;&nbsp; width只包括content不包括padding border',
        'box-sizing: border-box 是IE盒子模型 \
        <br>&nbsp;&nbsp; width包括padding border content',
      ],
    },
    {
      title: 'BFC',
      jsCode: ``,
      desc: [
        '在 BFC 中，物品的摆放是不受外界影响的',
        '在 BFC 中，块盒与行盒（行盒由一行中所有的内联元素组成）都会垂直地沿着其父元素的边框排列',
        'BFC 元素可以清除浮动',
        '怎么产生BFC  \
        <br>&nbsp;&nbsp;  浮动元素 \
        <br>&nbsp;&nbsp;  绝对定位元素 \
        <br>&nbsp;&nbsp;  非块级盒子：inline-blocks、table-cells、table-captions \
        <br>&nbsp;&nbsp;  块级盒子：overflow 值不为 visible',
      ],
    },
    {
      title: '遇到符号英文时的折行问题',
      jsCode: `
// 解决 display: table-cell 遇到符号英文时的折行问题
table-layout: fixed
word-wrap: break-word
word-break: break-all
`,
    },
    // {
    //   title: '',
    //   jsCode: ``,
    //   desc: [
    //     '<br>&nbsp;&nbsp;>>  ',
    //   ],
    //   img: []
    // },
  ]
}