export default {
  title: '遇到各种面试题',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: 'a === 3 && a === 4',
      jsCode: `window.a = 0;
var n = 3;
Object.defineProperty(window, 'a', {
  get() {
    return n++
  }
});
console.log(a === 3 && a === 4);
//true
// 如果是 == 运算符 则a可以是一个数组或者Number对象
var _a = [];
var x = 3;
_a.valueOf=()=>{
  return x++
};
console.log(_a == 3 && _a == 4)
// true
var _aN = new Number(0);
var num = 3
_aN.valueOf=()=>{
  return num++
};
console.log(_aN == 3 && _aN == 4)
// true`,
      desc: [
        'Object.defineProperty 可以定义对象的属性',
      ],
      img: [
        // '<img src="' + require('../img/async-await.jpg') + '"/>',
      ]
    },
  ]
}