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
    {
      title: 'promise.then(fn1, fn2) 和 promise.then(fn1).catch(fn2) 的区别？',
      jsCode: `
promise.then(fn1, fn2) // fn1, fn2 在同一个微任务中 只会执行其中一个 fn2是用来捕捉 promise 产生的catch
promise.then(fn1).catch(fn2) // fn1, fn2 在两个微任务中 两个都有可能被执行 fn2可以用来捕捉 promise 以及 fn1 产生的catch
// 一般推荐后一种写法
`,
    },
    {
      title: 'Promise的⼏种状态，状态之间可以互相转换嘛？Promise.resolve ⼀定返回 Fulfill 状态嘛？',
      jsCode: `
Promise.resolve(Promise.resolve('abc')) // fulfilled
Promise.resolve(Promise.reject('abc')) // rejected
`,
      desc: [
        'Promise 有 pending fulfilled rejected 三种状态',
        'Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。',
      ],
    },
    {
      title: '代码实现：实现⼀个类似 Promise.all的功能，Promise.track  \
      <br>1. ⽆论 fullfill 还是 rejected 都按照 Promise.track(arr).then() 输出结果，即非执⾏异常则不走catch  \
      <br>2. 保证 promiseArray 中永远保持三个 promise 并⾏执⾏，有某个promise任务执⾏完毕后才可以执⾏下⼀个promise',
      jsCode: `// 没搞懂第二个 要求什么意思 没去实现
let promise = Promise.resolve(true)
promise.track = function(promiseArr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArr)) {
      reject(new Error('no array'))
    }
    if (!promiseArr.length) {
      resolve([])
    }
    let arr = []
    let n = 0
    let len = promiseArr.length
    promiseArr.forEach((proVal, index) => {
      proVal.then((res) => {
        arr[index] = res
        n++
        if (n == len) { resolve(arr) }
      }, (err) => {
        arr[index] = err
        n++
        if (n == len) { resolve(arr) }
      })
    })
  })
}
promise.track([
  Promise.resolve('promise1'),
  new Promise(resolve => {
    setTimeout(() => {
      resolve('promise2')
    }, 200)
  }),
  Promise.reject('promise3'),
]).then(([x, y, z]) => {
  console.log(x, y, z)
})
`,
      desc: [
        '',
      ],
    },
    {
      title: 'promise 和 async 结合使用',
      jsCode: `let a;
const b = new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
})

a = new Promise( async (resolve) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  /* a Promise对象 被await 但是一直是pending态 resolve在await后边永远无法执行 */
  await a;
  resolve(true);
  console.log('after2');
})

console.log('end')
/* promise1 / undefined / end / promise2 / promise3 / promise4 / Promise{<pending>} / after1 */`,
      desc: [
        'await 命令只能用在 async 函数之中',
        'await 返回 后边的 Promise 的 resolve 值即:res / 如果不是Promise 对象 就直接返回对应的值',
        'await 后边的 Promise 对象出错或reject 会阻断后边的执行 可以用 async 的catch 或 Promise 的catch处理 放在try catch也行'
      ],
    },
    {
      title: '编程题：寻找⼀个整数N，满⾜N%2 === 1， N%3 === 2，N%4 === 3，N%5 === 4，N%6 === 5，N%7 === 0 （不要暴⼒遍历）',
      jsCode: `//基于观察结果
{ let N = 7
  let num = 4 * 5 * 6
  while ((num - 1) % 7 != 0) {
    num *= 2
  }
  N = num - 1
  console.log(N) // 119
}
  // 如果只观察出 N能整除7 只能暴力循环
{
  let mapDivisor = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 0
  }
  // 11 14
  let keyArr = Object.keys(mapDivisor).sort((val1, val2) => {
    return val2 - val1
  })
  let arr = keyArr.map(key => {
    return key - 0 + mapDivisor[key]
  }).sort((val1, val2) => {
    return val2 - val1
  })
  console.log(arr)
  let n = 1
  let num = arr[0]
  let key = keyArr[0]
  while (!check(num)) {
    n++
    num = Number(key) * n
  }
  console.log(num) // 119
  function check(num) {
    for (let i = 0; i < keyArr.length; i++) {
      if (num % keyArr[i] != mapDivisor[keyArr[i]]) {
        return false
      }
    }
    return true
  }
}`,
      desc: [
        '经过观察 发现整数N能整除7 N+1 能整除 2 3 4 5 6',
        '2 3 能被 4 6 整除 所以 4*5*6 一定可以满足N+1',
        '验证N能否整除7， 如果不行就*2',
      ],
      img: []
    },
    {
      title: '数据考察 编写⼀个函数，根据过滤条件返回集合，过滤规则以及如何解析都由⾃⼰来设计。例function findData(maxAge: 8)',
      jsCode: `
const a = [
  { name: 'xx1', age: 8, city: 'BJ' },
  { name: 'xx2', age: 12, city: 'HK'},
  { name: 'xx1', age: 9, city: 'BJ' },
  { name: 'xx2', age: 11, city: 'HK'},
]
const b = [
  { name: 'yy1', age: 3, city: 'USA'},
  { name: 'yy2', age: 8, city: 'JP' },
  { name: 'yy1', age: 5, city: 'USA'},
  { name: 'yy2', age: 7, city: 'JP' },
]
let arr = [...a, ...b]
findData(arr, 'age:8', 1) // 获取年龄大于等于8的集合
function findData(arr, rule, size = 0) {
  // rule age:8 / name:yy1 / city:USA
  // size 0 1 -1
  let key = rule.substring(0, rule.indexOf(':'))
  let value = rule.substring(rule.indexOf(':') + 1)
  size = isNaN(Number(value)) ? 0 : size
  return arr.filter((val) => {
    return size == -1
      ? val[key] <= value
      : size == 1
        ? val[key] >= value
        : val[key] == value
  })
}
`,
      desc: [],
    },
    {
      title: '实现⼀个 function flat(arr = [], depth = Number.infinity)，数组展平。要求：1. 规定depth为展平的深度。2. 要考虑循环引⽤的情况',
      jsCode: `
let arr1 = [1, 2, 3, 4, 5, 6]
let arr2 = [21, 22, 23, arr1, 24, 25, 26]
let arr3 = [31, 32, 33, arr2, 34, 35, 36]
arr1.push(arr3)
console.log(flat(arr3))
// 递归
function flat(arr, depth = Infinity) {
  if (depth <= 0) return arr
  let returnArr = []
  arr.forEach((val) => {
    if (Array.isArray(val)) {
      returnArr.push(...flat(val, depth - 1))
    } else {
      returnArr.push(val)
    }
  })
  return returnArr
}
// while 循环
console.log(flatWhile(arr3))
function flatWhile(arr) {
  while (arr.some( t => Array.isArray(t) ) ) {
    arr = ([]).concat.apply([], arr);
  }
  return arr;
}
`,
      desc: [],
    },
    {
      title: '什么是防抖和节流 如何实现',
      jsCode: `// 防抖
function debounce(fn, time) {
  let timeout
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.call(this, ...arguments)
    }, time)
  }
}
// 节流
function throtting(fn, time) {
  let ok = false
  return function() {
    if (ok) return
    ok = true
    setTimeout(() => {
      fn.call(this, ...arguments)
      ok = false
    }, time)
  }
}
`,
      desc: [
        '防抖 Debounce 把触发非常频繁的事件（如按键）合并成一次执行。',
        '节流 Throtting 节流是限制一定时间内动作只执行一次',
      ],
      img: []
    },
    {
      title: '字符串 翻转',
      jsCode: `
let str = 'x\uD83D\uDE80y';
// 不推荐
str.split('').reverse().join('') // 'y\uDE80\uD83Dx' 这样会把unicode 四字节当成双字节翻转 出错
// 推荐
[...str].reverse().join('') // 'y\uD83D\uDE80x'
Array.from('x\uD83D\uDE80y').reverse().join('') // 'y\uD83D\uDE80x'
`,
      desc: [],
      img: []
    },
    {
      title: '实现⼀个微博评论 @ ⼈的功能，重点要求 @ ⼈后出现的⼈名单列表位置应该和 @ ⽂字出现的位置垂直对齐',
      jsCode: ``,
      desc: [
        '可以再textarea 位置放置一个div 透明层级很低用户看不到 然后发现用户 使用@符时把@符单独放在一个span标签里 定位span的在div的offsettop位置。 然后把文字列表定位到span的左上角',
      ],
      img: [
        '<img src="' + require('../img/weibo-@.jpg') + '"/>',
      ]
    },
    {
      title: '有⼀个⼆叉树，每个节点只存在 1 和 0 两种状态，先需要找到 某个节点，其左孩⼦与右孩⼦均为 1，则输出这个节点的⽗节点',
      jsCode: ``,
      desc: [
        '',
      ],
    },
    {
      title: '请实现⼀个 Events 对象，⾄少包括 on , emit, once, off ⽅法。',
      jsCode: `
class Events{
  constructor() {
    this.eventMap = {}
  }
  on(event, fn) {
    let cbArr = this.eventMap[event] || []
    cbArr.push(fn)
    this.eventMap[event] = cbArr
  }
  emit(event, ...args) {
    let arr = this.eventMap[event]
    if (Array.isArray(arr)) {
      arr.forEach(fn => {
        fn.apply(this, args)
      })
    }
  },
  once(event, fn) {
    let cb = function(...args) {
      fn.apply(this, args)
      this.off(event, cb)
    }
    this.on(event, cb)
  },
  off(event, fn) {
    let arr = this.eventMap[event]
    if (Array.isArray(arr)) {
      this.eventMap[event] = arr.filter(cb => {
        return cb !== fn
      })
    }
  },
}
`,
      desc: [
        '1、on(event,fn)：监听event事件，事件触发时调用fn函数；',
        '2、once(event,fn)：为指定事件注册一个单次监听器，单次监听器最多只触发一次，触发后立即解除监听器；',
        '3、emit(event,arg1,arg2,arg3...)：触发event事件，并把参数arg1,arg2,arg3....传给事件处理函数；',
        '4、off(event,fn)：停止监听某个事件。',
      ],
    },
    {
      title: '深度优先遍历DFS / 广度优先遍历BFS',
      jsCode: `
// 深度优先遍历
function dfs(node) {
  let nodeList = []
  if (!!node) {
    nodeList.push(node)
    let list = [...node.children]
    list.forEach(nodec => {
      nodeList.push(...dfs(nodec))
    })
  }
  return nodeList
}
// 广度优先遍历
function bfs(node) {
  let nodeList = []
  if (!!node) {
    nodeList.push(node)
    let list = [...node.children]
    while(list.length) {
      let nodec = list.shift()
      nodeList.push(nodec)
      list.push(...nodec.children)
    }
  }
  return nodeList
}
`,
      desc: [
        '深度优先遍历: 从顶点开始，找到一个节点后，把它的后辈都找出来，最常用递归法。',
        '广度优先：从顶点开始，找到一个节点后，把他同级的兄弟节点都找出来放在前边，把孩子放到后边，最常用 while',
      ],
      img: []
    },
    // {
    //   title: '',
    //   jsCode: ``,
    //   desc: [
    //     '',
    //   ],
    //   img: []
    // },
  ]
}