export default {
  title: '关于 Object.prototype 等构造原型方法的使用',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: 'Function.prototype call apply',
      jsCode: `var a = Function.prototype.call.apply( function(a) { return a }, [0, 4, 3]);
/**
 * 步骤解析
 * (function(a) { return a })(Function.prototype.call)(0, 4, 3)
 * (function(a) { return a }).call(0, 4, 3)
 * 4
 */`,
      desc: [],
    },
    {
      title: 'Array.prototype',
      jsCode: `var arr = Array.prototype.slice.call([1, 2, 3]);
      // [1, 2, 3].slice()`,
      desc: [
        '伪数组转换数组',
      ],
    },
  ]
}