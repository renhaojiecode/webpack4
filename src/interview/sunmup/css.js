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
    {
      title: '适配 ipx 的底部安全区域',
      jsCode: ``,
      desc: [
        'padding-bottom: constant(safe-area-inset-bottom)',
        'padding-bottom: env(safe-area-inset-bottom)',
      ],
    },
    {
      title: '多行文本溢出',
      jsCode: ``,
      desc: [
        '单行： overflow: hidden; text-overflow:ellipsis; white-space: nowrap; ',
        '多行： display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; //行数 overflow: hidden; ',
        '兼容： p{position: relative; line-height: 20px; max-height: 40px;overflow: hidden;} p::after{content: "..."; position: absolute; bottom: 0; right: 0; padding-left: 40px; background: -webkit-linear-gradient(left, transparent, #fff 55%); background: -o-linear-gradient(right, transparent, #fff 55%); background: -moz-linear-gradient(right, transparent, #fff 55%); background: linear-gradient(to right, transparent, #fff 55%); }',
      ],
      img: []
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