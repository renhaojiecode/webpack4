export default {
  title: '遇到各种面试题',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: '一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？',
      desc: [
        'http://www.dailichun.com/2018/03/12/whenyouenteraurl.html',
        '1. DNS解析  \
        <br>&nbsp;&nbsp; 2. TCP连接 \
        <br>&nbsp;&nbsp; 3. 发送HTTP请求 \
        <br>&nbsp;&nbsp; 4. 服务器处理请求并返回HTTP报文 \
        <br>&nbsp;&nbsp; 5. 浏览器解析渲染页面 \
        <br>&nbsp;&nbsp; 6. 连接结束',
        '1.如果页面使用强缓存，并且缓存未过期，使用本地缓存',
        '2.域名解析（DNS）获取相应的ip',
        '3.进行TCP连接（三次握手） 连接成功 发送HTTP请求',
        '4.请求经过应用层，传输层，网络层，数据链路层，物理层，最终将数据送到目的主机的目的端口',
        '5.服务器收到请求，在服务器空间中查找对应的资源，返回HTTP相应',
      ]
    },
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
      title: '下面代码中 a 在什么情况下会打印 1？',
      jsCode: `
// 考察隐式类型转换
var a = ?;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
}
// 解法 一  a = console.log(1)
(function() {
  var a = console.log(1);
  if(a == 1 && a == 2 && a == 3){
    console.log(1);
  }
})()
// 解法 二  a = [1, 2, 3]; a.toString = a.shift || a.join = a.shift
(function() {
  var a = [1, 2, 3];
  a.toString = a.shift
  if(a == 1 && a == 2 && a == 3){
    console.log(1);
  }
})()
// 解法 三  a = {num: 0}; toString / valueOf
(function() {
  var a = {
    num: 0,
    valueOf() {
      return ++a.num
    }
  };
  if(a == 1 && a == 2 && a == 3){
    console.log(1);
  }
})()
// 解法 四  a = {num: 0}; Symbol.toPrimitive
(function() {
  var a = {
    num: 0,
    [Symbol.toPrimitive]: function() {
      return ++a.num
    }
  };
  if(a == 1 && a == 2 && a == 3){
    console.log(1);
  }
})()
`,
      desc: [
        '',
      ],
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
        'await 返回 后边的 Promise 的 resolve 值即:res / 如果不是Promise 对象 会执行Promise.resolve(n) 包装成一个promise对象',
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
      title: '观察者模式 / 发布订阅模式',
      jsCode: `
// 观察者模式
function Target() {
  this.wList = []
}
Target.prototype.addW = function(wcb) {
  if (this.wList.includes(wcb)) return
  this.wList.push(wcb)
}
Target.prototype.removeW = function(wcb) {
  if (!this.wList.includes(wcb)) return
  this.wList = this.wList.filter(val => {
    return val != wcb
  })
}
Target.prototype.tellW = function(newVal) {
  this.wList.forEach(wcb => {
    wcb(newVal, this)
  })
}
Function.prototype.wTarget = function(target) {
  target.addW(this)
  return this
}
Function.prototype.cancelWTarget = function(target) {
  target.removeW(this)
  return this
}
let t1 = new Target()
let t2 = new Target()
function w1(val, target) {
  console.log('w1', val, target.name)
}
function w2(val, target) {
  console.log('w2', val, target.name)
}
w1.wTarget(t1).wTarget(t2)
w2.wTarget(t1)
let parent = document.querySelector('body')
let oDiv1 = document.createElement('div')
let oDiv2 = document.createElement('div')
oDiv1.style = 'background: red; width: 50px; height: 50px; margin: 0 auto;'
oDiv2.style = 'background: blue; width: 50px; height: 50px; margin: 0 auto;'
parent.insertBefore(oDiv1, parent.children[0])
parent.insertBefore(oDiv2, parent.children[0])
let n = 0
oDiv1.onclick = function() {
  n++
  t1.tellW(n + 't1new')
}
oDiv2.onclick = function() {
  n++
  t2.tellW(n + 't2new')
}

// 发布订阅模式
class medium {
  constructor() {
    this.reserveMap = {}
  }
  addReserve(type, fn) {
    let list = this.reserveMap[type] ? this.reserveMap[type] : []
    list.push(fn)
    this.reserveMap[type] = list
  }
  removeReserve(type, fn) {
    if (!fn) {
      this.reserveMap[type] = []
      return
    }
    let list = this.reserveMap[type] ? this.reserveMap[type] : []
    this.reserveMap[type] = list.filter(cb => {
      return cb != fn
    })
  }
  tellReserve(type, ...args) {
    let list = this.reserveMap[type] ? this.reserveMap[type] : []
    list.forEach(cb => {
      cb(...args)
    })
  }
}
let m1 = new medium()
m1.addReserve('click', (...args) => {
  console.log('click1', args)
})
m1.addReserve('mousemove', (...args) => {
  console.log('mousemove1', args)
})
m1.tellReserve('mousemove', 1, 2)
m1.tellReserve('click', 3)
m1.removeReserve('click')
`,
      desc: [
        '观察者模式:  \
        <br>&nbsp;&nbsp; 有观察者们 和 目标对象 观察者观察目标对象(比如投简历) 目标对象 发布信息通知观察者(约面试) \
        <br>&nbsp;&nbsp; 目标对象有 通知 添加 删除能力 观察者有接受通知并处理的能力  \
        <br>&nbsp;&nbsp; 优点明显：降低耦合，两者都专注于自身功能；缺点也很明显：所有观察者都能收到通知，无法过滤筛选；',
        '发布订阅模式:  \
        <br>&nbsp;&nbsp; 有订阅者 发布者 中介，比如dom事件监听 就是典型的发布订阅模式 \
        <br>&nbsp;&nbsp; 基于一个事件（主题）通道，希望接收通知的对象 Subscriber 通过自定义事件订阅主题，被激活事件的对象 Publisher 通过发布主题事件的方式通知各个订阅该主题的 Subscriber 对象。 \
        <br>&nbsp;&nbsp; 优点：解耦更好，细粒度更容易掌控；缺点：不易阅读，额外对象创建，消耗时间和内存（很多设计模式的通病）',
        '发布订阅模式更灵活，是进阶版的观察者模式，指定对应分发。  \
        <br>&nbsp;&nbsp; 1.观察者模式维护单一事件对应多个依赖该事件的对象关系；\
        <br>&nbsp;&nbsp; 2.发布订阅维护多个事件（主题）及依赖各事件（主题）的对象之间的关系；\
        <br>&nbsp;&nbsp; 3.观察者模式是目标对象直接触发通知（全部通知），观察对象被迫接收通知。发布订阅模式多了个中间层（事件中心），由其去管理通知广播（只通知订阅对应事件的对象）；\
        <br>&nbsp;&nbsp; 4.观察者模式对象间依赖关系较强，发布订阅模式中对象之间实现真正的解耦。'
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
    {
      title: 'Ajax 手写',
      jsCode: `
let vkajax = function(para) {
  // IE9跨域请求
  if (navigator.appName === "Microsoft Internet Explorer" && /MSIE 9/i.test(navigator.appVersion)){
    try {
      let xdr = new XDomainRequest()
      xdr.open(para.type, para.url)
      xdr.onload = function () {
        para.success()
      }
      xdr.onprogress = function(){ };
      xdr.ontimeout = function(){ };
      xdr.onerror = function() {
        para.error()
      }
      setTimeout(function(){
        xdr.send(para.data || null)
      }, 0);
    }catch (e) {
      console.log(e)
    }
  }else {
    try {
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            para.success(getJSON(xhr.responseText))
          } else {
            para.error(getJSON(xhr.responseText), xhr.status)
          }
          xhr.onreadystatechange = null
        }
      }
      xhr.open(para.type, para.url, true)
      xhr.send(para.data || null)
    } catch (e) {
      console.log(e)
    }
  }
  function getJSON(data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      return {}
    }
  }
}
`
    },
    {
      title: 'ES6 代码转成 ES5 代码的实现思路是什么',
      jsCode: ``,
      desc: [
        '语法转换： \
        <br>&nbsp;&nbsp; 1.将ES6代码字符串解析成抽象语法树，即所谓的 AST \
        <br>&nbsp;&nbsp; 2.将ES6 AST 转换为 ES5 AST \
        <br>&nbsp;&nbsp; 3.ES5 AST 再生成代码字符串',
        'API转换 实现各种polyfill',
      ],
    },
    {
      title: '输出结果',
      jsCode: `
1 + "1"
// '11'
2 * "2"
// 4
[1, 2] + [2, 1]
// toString() 1,22,1
"a" + + "b"
// "a" + + "b" -> 'a' + (+'b') +作为一元运算符 会执行 Number()
// "a" + NaN  "aNaN"`,
      desc: [
        '',
      ],
    },
    {
      title: '要求设计 LazyMan 类，实现以下功能',
      jsCode: `
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

function LazyMan(name) {
  let obj = new CFn(name)
  return obj
}
function CFn(name) {
  this.ok = false
  this.cbList = []
  console.log('Hi I am ' + name)
}
CFn.prototype.start = function() {
  if (!this.ok) {
    this.ok = true
    Promise.resolve().then(() => {
      this.cbList.length && this.cbList[0]()
    })
  }
}
CFn.prototype.cbFn = function(cb, first = false) {
  this.start()
  if (!first) {
    this.cbList.push(boxCb.bind(this))
  } else {
    this.cbList.unshift(boxCb.bind(this))
  }
  function boxCb() {
    cb().then(() => {
      this.cbList.splice(0, 1)
      this.cbList.length && this.cbList[0]()
      !this.cbList.length && (this.ok = false)
    })
  }
}
CFn.prototype.eat = function(eat) {
  this.cbFn(function() {
    return Promise.resolve(console.log('I am eating ' + eat))
  })
  return this
}
CFn.prototype.sleep = function(time) {
  this.cbFn(function() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log('等待了' + time + '秒...'))
      }, time * 1000);
    })
  })
  return this
}
CFn.prototype.sleepFirst = function(time) {
  this.cbFn(function() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log('等待了' + time + '秒...'))
      }, time * 1000);
    })
  }, true)
  return this
}
let obj = LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(2).sleep(5).eat('junk food');
setTimeout(() => {
  obj.eat('lunch').eat('dinner').sleepFirst(2).sleep(5).eat('junk food');
}, 8000);
`,
      desc: [
        '',
      ],
    },
    {
      title: '随机生成一个 长度 10 的整数数组，然后如例子所示：',
      jsCode: `
// exp: [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
console.log(changeArr([2, 10, 3, 4, 5, 11, 10, 11, 20]))
let arrR = getRandomArr(10, 50)
console.log(arrR)
console.log(changeArr(arrR))
function getRandomArr(n, max, min = 0) {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push((Math.floor(Math.random() * (max - min) + min)))
  }
  return arr
}
function changeArr(arr) {
  let list = []
  let onlyArr = [...new Set(arr)]
  onlyArr.forEach((val) => {
    let index = Math.floor(val / 10)
    !list[index] && (list[index] = [])
    list[index].push(val)
  })
  return list.map(val => {
    return !val ? [] : val.sort((a1, a2) => {return a1 - a2})
  })
}
`,
      desc: [
        '',
      ],
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