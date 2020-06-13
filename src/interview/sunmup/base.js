/**
 * mate  标签 强缓存 弱缓存 CDN缓存 过期时间 ESO 等
 * 实现bind⽅法，不能使⽤原⽣的call、apply以及call
 * generator 实现原理
 * 跨域 概念 解决方案
 * TypeScript 特点、理解
 * 二分法
 * 函数式编程
 * 总结：网络协议/安全是投入产出最高的两部分简单易操作 JavaScript基础部分this、bind/apply、promise、原型链、new、class、ES6 语法特性等，可以刷下题，其实深度一般，可以在 Class、Reflect、Prop Config、Promise 选几个方面深入理解，问到的时候进行拓展 CSS部分一般比较少问，可以针对性的看 Flex、BFC、Position、CSS Selector 另外二面以后侧重项目具体情况提出问题，建议简历里凸显重点项目能深刻理解技术底层，必如框架设计实现、运行原理 HR 方面问题，注意技巧，有时候没必要实话实说，尤其职业规划和离职原因要想请清楚如何回答 一面的问题不会的，二面之前一定要看，非常有用
 * CSS *************************************************
 * flex 布局
 * BFC 概念
 * CSS 选择器有哪些
 * 盒模型
 * CSS3 动画 优化、特性
 * Network *************************************************
 * 协议 HTTPS 50% TCP 20%
 * 安全 XSS CSRF
 * ⽹络状态码及使⽤场景（200、204、206、301、302、304、400、401、404、405、500、502、504）
 * 缓存（协商缓存与强缓存）
 * Vue *************************************************
 * 依赖收集分发
 * 依赖收集下数组问题
 * VDOM 对比
 * Vue 3 差异、特性
 * computed 和 watch 区别 实现原理
 * 工程方面 ************
 * 国际化 i18n 方案？？？？？？？？？
 * 性能优化 *************************************************
 * 图片压缩
 * 前端性能优化通用方案
 * Webpack *************************************************
 * 打包加载
 * 按需打包
 * Plugins
 * 项目经验 *************************************************
 * 大公司在二面后侧重从具体项目上提出问题
 * 职业规划 总监、HR 一般都会问职业规划
 * 离职原因 总监、HR 一般都会问离职原因，前面面试官也有问过的
 * ************************
 * 百度面试
 * 先问你做这么久，觉得最亮眼的作品，细讲一下，主要讲深度的东西
 * 基础知识
 * http与https
 * http请求状态
 * 请求之后如何渲染，细节分西
 * header  body 自己了解多少
 * 简单讲解一下http2的多路复用
 * 动态规划-爬楼梯(类斐波那契)【追问了时间复杂度度优化和空间复杂度优化】

数组去重【禁用Set等API】

大整数相加实现

trim实现

判断回文数【字符串法+取余累加法】

对称二叉树判断【剑指offer原题】
 */
export default {
  title: '基础知识 小技巧',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: 'HTML&CSS：',
      jsCode: ``,
      desc: [
        '对Web标准的理解（结构、表现、行为）、浏览器内核、渲染原理、依赖管理、兼容性、CSS语法、层次关系，常用属性、布局、选择器、权重、盒模型、Hack、CSS预处理器、CSS3、Flexbox、CSS Modules、Document flow、BFC、HTML5（离线 & 存储、Histoy,多媒体、WebGL/SVG/Canvas）；',
      ],
    },
    {
      title: 'JavaScript：',
      jsCode: ``,
      desc: [
        '数据类型、运算、对象、Function、继承、闭包、作用域、事件、Prototype、RegExp、JSON、Ajax、DOM、BOM、内存泄漏、跨域、异步请求、模板引擎、模块化、Flux、同构、算法、ECMAScript6、Nodejs、HTTP、',
      ],
    },
    {
      title: '其他：',
      jsCode: ``,
      desc: [
        '主流MVVM框架(React/Vue/Angular)、Hybrid App/React Native/Weex、TypeScript、RESTFul、WEB安全、前端工程化、依赖管理、性能优化、重构、团队协作、可维护、易用性、SEO、UED、前端技术选型、快速学习能力等；',
      ],
    },
    {
      title: '前端技术栈',
      img: [
        '<img src="' + require('../img/big-fe.webp') + '" />',
      ]
    },
    {
      title: 'HTML 文档解析渲染过程',
      desc: [
        '浏览器解析HTML，构建DOM树',
        '生成CSS规则树',
        '构建渲染树render',
        '回流和重绘',
        '外链资源下载： \
        <br>&nbsp;&nbsp; css资源：CSS下载时异步，不会阻塞浏览器构建DOM树；但是会阻塞渲染，也就是在构建render时，会等到css下载解析完毕后才进行（这点与浏览器优化有关，防止css规则不断改变，避免了重复的构建） \
        <br>&nbsp;&nbsp; Js资源： 阻塞浏览器的解析（GUI渲染线程），也就是说发现一个外链脚本时，需等待脚本下载完成并执行后才会继续解析HTML；浏览器的优化，一般现代浏览器有优化，在脚本阻塞时，也会继续下载其它资源（当然有并发上限），但是虽然脚本可以并行下载，解析过程仍然是阻塞的，也就是说必须这个脚本执行完毕后才会接下来的解析，并行下载只是一种优化而已；defer(按顺序执行)与async，普通的脚本是会阻塞浏览器解析的，但是可以加上defer或async属性，这样脚本就变成异步了，可以等到解析完毕后再执行。',
        'loaded和domcontentloaded:  \
        <br>&nbsp;&nbsp; DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片(譬如如果有async加载的脚本就不一定完成)\
        <br>&nbsp;&nbsp; load 事件触发时，页面上所有的DOM，样式表，脚本，图片都已经加载完成了\
        '
      ]
    },
    {
      title: '简述一下你对HTML语义化的理解',
      jsCode: ``,
      desc: [
        '用正确的标签做正确的事情。',
        'html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;',
        '即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;',
        '搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;',
        '使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。',
      ],
    },
    {
      title: '什么是window对象? 什么是document对象?',
      desc: [
        'window对象是指浏览器打开的窗口。',
        'document对象是Documentd对象（HTML 文档对象）的一个只读引用，window对象的一个属性',
        'documentElement --> html',
      ]
    },
    {
      title: 'JS this到底是什么？',
      desc: [
        'JS中的this是指函数运行时所处的环境（上下文）',
        'Javascript 是一个词法作用域的语言, 就是说, 一个变量的作用域, 在写这个变量的时候确定; this 关键字是为了在 JS 中加入动态作用域而做的努力;所谓动态作用域, 就是说变量的作用范围, 是根据函数调用的位置而定的.从这个角度来理解 this, 就简单的多.',
        '如果调用函数的是一个Object，this == Object',
        '如果调用函数的是 null 或者 非引用类型，this == window (顶层对象 浏览器中是window。fn())',
        '隐式绑定this：函数的独立调用 fn() 默认绑定this == window。但是严格模式下 隐式绑定不起作用 this == undefined',
        'call apply bind new 都可以改变this指向 new的优先级最高。'
      ]
    },
    {
      title: 'js 数据类型',
      jsCode: ``,
      desc: [
        'String Symbol Number Boolean undefined null Function Object',
      ],
    },
    {
      title: 'Event Loop',
      jsCode: ``,
      desc: [
        '浏览器端事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。宏任务队列可以有多个，微任务队列只有一个。 \
        <br>&nbsp;&nbsp; 常见的 macro-task 比如：setTimeout、setInterval、script（整体代码）、 I/O 操作、UI 渲染等。 \
        <br>&nbsp;&nbsp; 常见的 micro-task 比如: new Promise().then(回调)、MutationObserver(html5新特性)、Process.nextTick（Node独有） 等。',
        'Javascript单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。',
        '执行栈 script(宏任务) ',
        '同步代码执行，遇到异步代码 宏任务进入 宏任务队列，微任务进入微任务队列',
        '执行栈script(宏任务)完成后， 检查微任务队列 并清空',
        '从宏任务队列首部 获取任务进入执行栈，重复上述步骤 执行完 清空微任务队列。。。',
        '清空任务队列之后进行渲染 更新界面',
      ],
    },
    {
      title: 'Event Loop Node',
      jsCode: ``,
      desc: [
        'Node.js的运行机制如下:  \
        <br>&nbsp;&nbsp; V8引擎解析JavaScript脚本。\
        <br>&nbsp;&nbsp; 解析后的代码，调用Node API。\
        <br>&nbsp;&nbsp; libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。\
        <br>&nbsp;&nbsp; V8引擎再将结果返回给用户。',
        'Node Event Loop 分6各阶段 \
        <br>&nbsp;&nbsp; timers: 执行setTimeout和setInterval中到期的callback。 \
        <br>&nbsp;&nbsp; pending callback: 上一轮循环中少数的callback会放在这一阶段执行。 \
        <br>&nbsp;&nbsp; idle, prepare: 仅在内部使用。 \
        <br>&nbsp;&nbsp; poll: 最重要的阶段，执行pending callback，在适当的情况下回阻塞在这个阶段。 \
        <br>&nbsp;&nbsp; check: 执行setImmediate(setImmediate()是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行setImmediate指定的回调函数)的callback。 \
        <br>&nbsp;&nbsp; close callbacks: 执行close事件的callback，例如socket.on("close"[,fn])或者http.server.on("close", fn)。',
      ],
    },
    {
      title: '请描述一下 cookies，sessionStorage 和 localStorage 的区别？',
      desc: [
        'cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。',
        'cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。',
        'sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。',
        '存储大小：  \
        <br>&nbsp;&nbsp; cookie数据大小不能超过4k。 \
        <br>&nbsp;&nbsp; sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。',
        '有期时间：  \
        <br>&nbsp;&nbsp; localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；\
        <br>&nbsp;&nbsp; sessionStorage  数据在当前浏览器窗口关闭后自动删除。可以再同一个窗口间通信不能再多标签页间通信\
        <br>&nbsp;&nbsp; cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭',
      ]
    },
    {
      title: '函数式编程 / 命令式编程',
      jsCode: ``,
      desc: [
        '函数式编程：关心的是数据的映射。',
        '命令式编程: 关心解决问题的步骤。',
        '函数式编程：函数这个术语不是指计算机中的函数（实际上是Subroutine），而是指数学中的函数，即自变量的映射。也就是说一个函数的值仅决定于函数参数的值，不依赖其他状态。比如sqrt(x)函数计算x的平方根，只要x不变，不论什么时候调用，调用几次，值都是不变的。',
        '函数式编程的好处：  \
        <br>&nbsp;&nbsp;&nbsp;>>  由于命令式编程语言也可以通过类似函数指针的方式来实现高阶函数，函数式的最主要的好处主要是不可变性带来的。没有可变的状态，函数就是引用透明（Referential transparency）没有副作用（No Side Effect）  \
        <br>&nbsp;&nbsp;&nbsp;>>  一个好处是，函数即不依赖外部的状态也不修改外部的状态，函数调用的结果不依赖调用的时间和位置，这样写的代码容易进行推理，不容易出错。这使得单元测试和调试都更容易。\
        <br>&nbsp;&nbsp;&nbsp;>>  不变性带来的另一个好处是：由于（多个线程之间）不共享状态，不会造成资源争用(Race condition)，也就不需要用锁来保护可变状态，也就不会出现死锁，这样可以更好地并发起来，尤其是在对称多处理器（SMP）架构下能够更好地利用多个处理器（核）提供的并行处理能力。\
        '
      ],
    },
    {
      title: '如何判断 undefined',
      jsCode: `// 错误示范
{
  let xyz;
  if (xyz == undefined) {
    // 如果xyz 为null 也可以通过判断
  }

  if (typeof xyz == 'undefined') {
    // 正确 推荐
  }

  if (xyz === undefined) {
    // 正确
    // 这种写法 也可以判断xyz是否为undefined 但是如果 xyz 未声明就会报错 推荐 typeof 方法
  }
}
`,
    },
    {
      title: '如何判断 null',
      jsCode: `
function isNull(val) {
  return typeof val == 'object' && !val
}
console.log(isNull(0)) // false
console.log(isNull(undefined)) // false
console.log(isNull(null)) // true
`,
    },
    {
      title: 'Script 标签',
      jsCode: `<script async defer src="./script1.js"></script>`,
      desc: [
        'async 属性：异步加载 js 文件 不影响DOMContentLoaded事件 加载完就执行',
        'defer 属性：异步加载 js 文件 影响DOMContentLoaded事件 按照defer顺序执行',
      ],
    },
    {
      title: '立即执行函数IIFE',
      jsCode: `
var b = 10
(function b(){
  b = 20
  console.log(b)
})()
// function b(){}
`,
      desc: [
        '非匿名立即执行函数内部，函数变量为只读状态不可修改，严格模式下会报错，非严格模式不生效。',
        '立即执行函数是为了 弥补之前 js 作用域不足的问题 可以制造一个函数作用域 隔离代码 避免命名污染冲突。',
      ],
    },
    {
      title: '捕获和冒泡',
      jsCode: ``,
      desc: [
        '被点击节点 先绑定先执行',
        '先捕获从上到下',
        '后冒泡从下到上',
      ],
    },
    {
      title: '防抖和节流',
      jsCode: ``,
      desc: [
        '防抖动Debounce 把触发非常频繁的事件（如按键）合并成一次执行。 就是等用户一定时间不触发这个动作时再去执行 最后执行。',
        '节流阀Throtting 节流是限制一定时间内动作只执行一次，过完这个时间再次执行。保证 X 毫秒恒定的执行次数（如每 200 毫秒检查下滚动位置，并触发 CSS 动画）。',
        'requestAnimationFrame 保证在每个刷新间隔内函数只被执行一次，实现节流节能。',
        'input 输入中文时可以使用 compositionstart compositionend 来实现防抖。',
      ],
    },
    {
      title: '预解析',
      jsCode: ``,
      desc: [
        '预解析，在所有代码执行之前执行！',
        '定义：把变量的定义提到最上面。 函数也有预解析；  \
        <br>&nbsp; 定义：仅仅是定义，没有赋值  \
        <br>&nbsp; 最上面：作用域的最上面  \
        <br>&nbsp;&nbsp;&nbsp; 局部：到function  \
        <br>&nbsp;&nbsp;&nbsp; 全局：script',
        '预解析顺序：var 的变量的定义最先、function(){} 其次 、赋值语句等都在预解析之后执行',
        'but：  \
        <br>&nbsp;&nbsp; 全局变量在定义之后（比如在上一个script标签中的 事件/定时器 中能调用下边script中定义的变量）是能在整个页面中调用的；  \
        <br>&nbsp;&nbsp; 这和预解析并不冲突；',
        '作用域分： 词法作用域 动态作用域   js中一般都是词法作用域(看书写位置而不是调用位置);',
      ]
    },
    {
      title: 'ES6 的六种变量声明方式',
      desc: [
        'let const var function import class'
      ],
    },
    {
      title: '顶层对象',
      jscode: ` // 两种勉强可以 在所有环境都获取顶层对象的方法
// 方法一
(typeof window !== 'undefined'
  ? window
  : (typeof process === 'object' &&
    typeof require === 'function' &&
    typeof global === 'object')
    ? global
    : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
`,
      desc: [
        '顶层对象 在浏览器环境指 window， 在Node JS环境指 global。',
        '在ES5中 顶层对象和全局对象是等价的。',
        '在ES6中 var function 声明的全局变量依然是 顶层对象的属性，但是 let const class 声明的全局变量 不属于顶层对象的属性。',
        '顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。这样的设计带来了几个很大的问题，首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的）；其次，程序员很容易不知不觉地就创建了全局变量（比如打字出错）；最后，顶层对象的属性是到处可以读写的，这非常不利于模块化编程。另一方面，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。',
        'globalThis 对象  \
        <br>&nbsp;&nbsp; JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。  \
        <br>&nbsp;&nbsp;>> 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。 \
        <br>&nbsp;&nbsp;>> 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。 \
        <br>&nbsp;&nbsp;>> Node 里面，顶层对象是global，但其他环境都不支持。 \
        <br>&nbsp;&nbsp; 同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。  \
        <br>&nbsp;&nbsp;>> 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。 \
        <br>&nbsp;&nbsp;>> 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。 \
        <br>&nbsp;&nbsp;>> 不管是严格模式，还是普通模式，new Function("return this")()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用。 ',
        'ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。',
      ],
    },
    {
      title: 'let const var 区别',
      jsCode: `// let const 暂时性死区
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined

// 块级作用域 必须有{} 否则就认为没有块级作用域 而let 必须出现的作用域顶层
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
`,
      desc: [
        '三个命令 都是用来声明变量的',
        'var 声明的变量作用域是所在的 函数作用域 / 全局作用域；可以在同一作用域 重复声明同名变量。有变量提升',
        'let 类似于var 但是变量作用域是所在的 块级作用域；不能再同级作用域 重复声明同名变量。没有变量提升。',
        '块级作用域 必须有{} 否则就认为没有块级作用域。 块级作用域推荐使用 函数表达式 let fn = function() {}。',
        'let 和 const 命令 存在 “暂时性死区 TDZ”  \
        <br>&nbsp;&nbsp; 如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。\
        <br>&nbsp;&nbsp; TDZ 的形成意味着 let在与解析阶段是有提升的 只不过没有初始化 而不是没有定义(见下图)',
        'const 声明一个只读的常量。一旦声明，常量的值就不能改变。',
        'const 一旦声明就必须 初始化，只声明不赋值，就会报错。 const c; 报错',
        'const 变量作用域是所在的 块级作用域；不能再同级作用域 重复声明同名变量。没有变量提升。',
        'const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。',
      ],
      img: [
        '<img src="' + require('../img/let-defined.jpg') + '"/>',
      ]
    },
    {
      title: '扩展运算符（...）',
      jsCode: `// 函数传参
function add34(x, y) {
  return x + y
}
add34(...[2, 1]) // 3
// 数组灵活应用
// 如果扩展运算符后面是一个空数组，则不产生任何效果。
[...[], 1] // [1]
let arr1 = [2, 3, 5]
let arr2 = [...arr1] // 数组拷贝
let [...arr21] = arr1 // 数组拷贝

let arr3 = [3, 6, 7]
arr3.push(...arr2) // 数组concat

Math.max(...arr3) // 求数组最大值 Math.max(1, 2, 3)

let [x, ...y] = arr3 // 数组赋值(y) 只能用在最后一位
// x 3 y [6, 7,····]

[...'Hello word'] // 字符串转数组
'x\uD83D\uDE80y'.length // 4
[...'x\uD83D\uDE80y'].length // 3
Array.from('x\uD83D\uDE80y').length 3

let aDiv = docuemnt.querySelectorAll('div')
let arrDiv = [...aDiv] // 转换类数组 为数组（前提是类数组有 iterator 接口）
// 如果没有 iterator 接口
let arrDiv2 = Array.from(aDiv)
`,
      desc: [
        '任何定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。',
        '扩展运算符（...）只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。',
        '如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。',
        '用于字符串转数组, 有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。',
      ],
    },
    {
      title: '函数的扩展 箭头函数 入参默认值等',
      jsCode: `// ES6可以给函数参数设置默认值
function fn(x = 0) {
  return x;
}
fn(); // 0
fn(undefined); // 0

function fn1({x = 0, y = 0} = {}) {
  return [x, y];
}
function fn2({x, y} = {x: 0, y: 0}) {
  return [x, y];
}
fn1(); // [0 , 0]
fn2(); // [0 , 0]

fn1({}); // [0 , 0]
fn2({}); // [undefined , undefined]

fn1({x: 1}); // [1 , 0]
fn2({x: 1}); // [1 , undefined]

// 默认值形成单独的作用域
let x = 1;
function fn3(x, y = x) {
  return y
}
fn3(2); // 2
// 在有默认值时 参数会形成一个单独的context
(function() {
  var x;
  var y;
  (function(arg1, arg2) {
    x = arg1;
    y = (typeof arg2 === 'undefined' ? x : arg2);
  })(2)
})();

// rest 参数  利用扩展运算符 代替 arguments
function fn4(...rest) {
  // rest 是一个数组对象
  // rest 参数也会影响 函数的 lenght 属性
  return rest;
}
console.log(fn4(1, 2, 3)); // [1, 2, 3]

// 箭头函数
let arrowFn = () => 'abc';
let arrowFn1 = () => ({name: 'name'}); // 如果返回一个对象要使用() 或者{return {}} 方式 因为对象的{}会和代码块{}难以识别形成冲突
let arrowFn2 = () => { return {name: 'name'} };

// 不是所有场合都适合 箭头函数 比如 事件监听fn内使用this 比如下边的例子
var name = 'globalThis'
let cool = {
  name: 'cool',
  getName: () => {
    console.log(this.name)
  }
}
cool.getName() // 'globalThis'

// 尾调用
function tail() {
  let x = 1
  let y = 2
  // 最后一步 调用一个函数
  return other(x + y)
}
// 尾调用优化 过程类比
tail() => other(3)
// 所以只保留other(3)的调用帧就行了
`,
      desc: [
        'ES6可以给函数参数设置默认值 (x = 0) 由于参数隐式使用var声明 所以函数内部不能 let const x变量  \
        <br>&nbsp;&nbsp;>> 如果传入 fn(undefined)，将触发该参数等于默认值，null则没有这个效果。 \
        <br>&nbsp;&nbsp;>> 默认值如果是表达式和函数 执行时机是函数调用时 而不是函数定义时。 如果传参了就不会执行 \
        <br>&nbsp;&nbsp;>> 函数的length（该函数预期传入的参数个数）属性受到影响，只会返回 没有默认值(和非rest参数)的参数数量。 \
        <br>&nbsp;&nbsp;>> 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。',
        '如果函数的 参数 使用了 默认值、解构赋值、扩展运算符 就不能在函数内部使用 "use strict"; 严格模式 否则会报错',
        'ES6 把name属性加入规范 返回函数的名字 表达式和函数声明都行',
        '箭头函数有几个使用注意点。  \
        <br>&nbsp;&nbsp;>> （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。  \
        <br>&nbsp;&nbsp;>> （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。  \
        <br>&nbsp;&nbsp;>> （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。  \
        <br>&nbsp;&nbsp;>> （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。',
        '尾调用优化  \
        <br>&nbsp;&nbsp;>> 尾调用（Tail Call）是函数式编程的一个重要概念，是指某个函数的最后一步是调用另一个函数。  \
        <br>&nbsp;&nbsp;>> 函数调用会在内存形成一个“调用记录”，又称“调用帧”（call frame），保存调用位置和内部变量等信息。如果在函数A的内部调用函数B，那么在A的调用帧上方，还会形成一个B的调用帧。等到B运行结束，将结果返回到A，B的调用帧才会消失。如果函数B内部还调用函数C，那就还有一个C的调用帧，以此类推。所有的调用帧，就形成一个“调用栈”（call stack）。 \
        <br>&nbsp;&nbsp;>>  如果函数g不是尾调用，函数f就需要保存内部变量m和n的值、g的调用位置等信息。但由于调用g之后，函数f就结束了，所以执行到最后一步，完全可以删除f(x)的调用帧，只保留g(3)的调用帧。 这就是"尾调用优化"\
        ',
      ],
    },
    {
      title: '循环',
      jsCode: `// for...in for...of 针对数组的区别
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo" 键名 所有属性
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7" 键值 只能循环有数字索引的属性
}`,
      desc: [
        'for 循环: 写起来稍微麻烦  但是类比forEach 好处是可以中途跳出。',
        'for...in 循环：只遍历对象自身的和继承的可枚举的属性。主要适用于对象。',
        'Object.keys()：返回对象自身的所有可枚举的属性的键名。',
        'for...of 循环: 适用于Iterator 接口的数据结构，或者手动在 Symbol.iterator 属性上部署  \
        <br>&nbsp;&nbsp;>>  可以使用 break 跳出  \
        <br>&nbsp;&nbsp;>>  for...of循环调用遍历器接口：遍历数组的键值、数组的遍历器接口只返回具有数字索引的属性。这些跟for...in循环也不一样。   \
        <br>&nbsp;&nbsp;>>  对于Set 结构 遍历是对应的添加顺序 只有值(key value 相同的原因) \
        <br>&nbsp;&nbsp;>>  对于Map 结构 遍历是对应的添加顺序 返回一个数组[key, value] \
        ',
      ],
    },
    {
      title: 'Iterator',
      jsCode: ` // 模拟遍历器的 next方法
var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

// 解构赋值
let oSet = new Set().add('a').add('b').add('c');
let [x, y] = oSet;
// x='a'; y='b';
let [first, ...other] = oSet;
// first='a'; other=['b','c'];

// 扩展运算符（...）
var str = 'hello';
[...str] //  ['h','e','l','l','o']

let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
`,
      desc: [
        'Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。',
        'ES6 中默认的 Iterator接口部署在数据结构的 Symbol.iterator 属性  \
        <br>&nbsp;&nbsp;>>  数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。  \
        <br>&nbsp;&nbsp;>>  Symbol.iterator 属性实际上是一个函数 返回一个遍历器对象 供for of 消费  \
        <br>&nbsp;&nbsp;>>  由于 Symbol.iterator 是一个表达式 所以使用时用方括号 [Symbol.iterator]',
        '原生具备 Iterator 接口的数据结构如下。  \
        <br>&nbsp;&nbsp;>>  Array   \
        <br>&nbsp;&nbsp;>>  Map   \
        <br>&nbsp;&nbsp;>>  Set   \
        <br>&nbsp;&nbsp;>>  String   ****\
        <br>&nbsp;&nbsp;>>  TypedArray   \
        <br>&nbsp;&nbsp;>>  函数的 arguments 对象   \
        <br>&nbsp;&nbsp;>>  NodeList 对象',
        'Iterator 的遍历过程是这样的。  \
        <br>&nbsp;&nbsp;>>  （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。  \
        <br>&nbsp;&nbsp;>>  （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。  \
        <br>&nbsp;&nbsp;>>  （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。  \
        <br>&nbsp;&nbsp;>>  （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。',
        'Iterator 的使用场合  \
        <br>&nbsp;&nbsp;>>  for...of 循环时\
        <br>&nbsp;&nbsp;>>  解构赋值 对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。\
        <br>&nbsp;&nbsp;>>  扩展运算符（...）也会调用默认的 Iterator 接口。 可以很方便的将有Iterator接口的数据结构转换为数组。\
        <br>&nbsp;&nbsp;>>  yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。\
        <br>&nbsp;&nbsp;>>  由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。 Array.from() for...of Promise.all() 等\
        '
      ],
    },
    {
      title: '数组 Array',
      jsCode: `// 不影响数组本身的方法 join concat slice
let arr = [0, 1, 2]

arr.concat([3, 4]) // 拼接数组 并返回新的数组
arr.join() // 数组 -> 字符串 默认以','拼接 返回拼接好的字符串
arr.slice(start, end) // 获取一个新的数组 返回一个新的数组，从 start 到 end(不包括end)。

arr.splice() // 函数返回值是 被删除的值组成的数组[]
  // 删除
  //   splice(开始下标, 个数)
  // 替换
  //   splice(开始下标, 1, 内容...)
  // 插入
  //   splice(开始下标, 0, 内容...)
arr.sort()  // 排序 改变并返回该数组（默认字符串方法排序，字符编码的顺序）1 11 2 21
  // sort(function (a, b){ //a b代表数组的某一个项；
  //   return a-b; // 小到大
  //   return b-a; // 大到小
  // })

arr.push(3, 4) // 后添加  返回数组长度 length
arr.unshift(5, 6) // 前添加  返回数组长度 length
arr.pop() // 后删除  返回被删除的值
arr.shift() // 后删除  返回被删除的值

arr.toString() // '2,3,4'
arr.reverse() // 翻转数组 返回arr(已被翻转)
arr.indexOf(2) // 查询值所在位置索引 有返回 index 无返回 -1
arr.includes(2) // 查询是否有这个值 返回 true / false


arr.map(x => x+1)  // 返回值是一个数组
arr.filter(x => x>1)  // 过滤 返回值是一个数组
arr.forEach((value,key,arr) => value+1)  // 没有返回值
arr.find(x => x > 0) // 找出第一个符合条件的值 并返回 没有则返回 undefined
arr.findIndex(x => x > 0) // 找出第一个符合条件的index 并返回 没有则返回 -1

arr.keys()  // 返回 key的遍历器对象 供 for...of 遍历
arr.values()  // 返回 value的遍历器对象 供 for...of 遍历
arr.entries()  // 返回 [key, value]的遍历器对象 供 for...of 遍历

arr.fill(7, 1, 2) // [0, 7, 2] 把7初始化到1开始2结束(不包含)的位置
arr.fill(7) // [7, 7, 7] 这样可以很方便的初始化填充数组

let arr1 = [1, [2, 4, [0, 3]], 5]
arr1.flat(1) //[1, 2, 4, [0, 3], 5] 展开多维数组 默认展开一层(可以直接用Infinity(正无穷)传入) 返回新的数组
arr1.flatMap(fn) // 可以看做是把数组先 arr1.map(fn).flat(1) 只能展开一层

Array.from('hello') // 返回一个数组 把类数组/伪数组(本质特征只有一点，即必须有length属性。伪数组中 Arguments、 NodeList 也部署有 iterator 接口) 或者有 iterator 接口的数据结构 转换为数组
  Array.from({length: 3}, () => 'hello') //['hello','hello','hello'] 第二个参数类似于map方法可以对每个值进行处理 这样就能返回处理好的数组
  Array.from('x\uD83D\uDE80y').length // 3 可以用于返回字符串的正确长度 解决四个字节字符的问题 

Array.of(1, 2, 4) // 生成数组 返回生成的数组 无参数返回[]

// 判断数组
function isArray(a) {
  return Array.isArray ? Array.isArray(a) : Object.prototype.toString.call(a) === '[object Array]';
}
// 转换伪数组
function toArray(a) {
  return Array.from ? Array.from(a) : Array.prototype.slice.call(a);
}
`,
      desc: [
        '',
      ],
    },
    {
      title: 'Set',
      jsCode: `// 根据 set 成员唯一性 可以用来数组去重 或者 字符串去重
let oSet = new Set([1,2,2,3,4,5,5])
[...oSet]
Array.from(oSet)
// 两种都输出 [1,2,3,4,5]

// 字符串去重
[...new Set('ababbc')].join('')

// set.add() 
`,
      desc: [
        'Set 类似于数组，但是成员的值都是唯一的，没有重复的值。',
        'Set 结构没有键名，只有键值（或者说键名和键值是同一个值）',
        '成员唯一性的比较 它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。',
        'Set 结构的实例有四个遍历方法，可以用于遍历成员。  \
        <br>&nbsp;&nbsp;>>  Set.prototype.keys()：返回键名的遍历器  \
        <br>&nbsp;&nbsp;>>  Set.prototype.values()：返回键值的遍历器  \
        <br>&nbsp;&nbsp;>>  Set.prototype.entries()：返回键值对的遍历器  \
        <br>&nbsp;&nbsp;>>  Set.prototype.forEach()：使用回调函数遍历每个成员',
        'Set 的其他方法  \
        <br>&nbsp;&nbsp;>>  Set.prototype.constructor：构造函数，默认就是Set函数。  \
        <br>&nbsp;&nbsp;>>  Set.prototype.size：返回Set实例的成员总数。  \
        <br>&nbsp;&nbsp;>>  Set.prototype.add(value)：添加某个值，返回 Set 结构本身。  \
        <br>&nbsp;&nbsp;>>  Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。  \
        <br>&nbsp;&nbsp;>>  Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。  \
        <br>&nbsp;&nbsp;>>  Set.prototype.clear()：清除所有成员，没有返回值。'
      ],
    },
    {
      title: 'WeakSet',
      jsCode: ``,
      desc: [
        'WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。  \
        <br>&nbsp;&nbsp;>>  首先，WeakSet 的成员只能是对象，而不能是其他类型的值。  \
        <br>&nbsp;&nbsp;>>  其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。',
      ],
    },
    {
      title: 'Map',
      jsCode: ``,
      desc: [
        'JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。',
        'Map 数据结构 可以把对象作为 key (+0 -0, NaN 认为是一个key, 如果是对象则看其内存位置)',
        '对象转为 Map 可以通过Object.entries()。',
        'Map 的方法  \
        <br>&nbsp;&nbsp;>>  Map.prototype.set(key, value) set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。  \
        <br>&nbsp;&nbsp;>>  Map.prototype.get(key) get方法读取key对应的键值，如果找不到key，返回undefined。\
        <br>&nbsp;&nbsp;>>  Map.prototype.has(key) has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。\
        <br>&nbsp;&nbsp;>>  Map.prototype.delete(key) delete方法删除某个键，返回true。如果删除失败，返回false。\
        <br>&nbsp;&nbsp;>>  Map.prototype.clear() clear方法清除所有成员，没有返回值。 \
        ',
        'Map 结构原生提供三个遍历器生成函数和一个遍历方法。  \
        <br>&nbsp;&nbsp;>>  Map.prototype.keys()：返回键名的遍历器。  \
        <br>&nbsp;&nbsp;>>  Map.prototype.values()：返回键值的遍历器。  \
        <br>&nbsp;&nbsp;>>  Map.prototype.entries()：返回所有成员的遍历器。  \
        <br>&nbsp;&nbsp;>>  Map.prototype.forEach()：遍历 Map 的所有成员。'
      ],
    },
    {
      title: 'WeakMap',
      jsCode: ``,
      desc: [
        '首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。',
        '其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。',
        '注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。',
        'WeakMap  \
        <br>&nbsp;&nbsp;>>  一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。\
        <br>&nbsp;&nbsp;>>  二是无法清空，即不支持clear方法。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。',
      ],
    },
    {
      title: 'Symbol',
      jsCode: `// Symbol 模拟私有属性
let proxy;
{
  const favBook = Symbol('fav book');
  
  const obj = {
    name: 'Thomas Hunter II',
    age: 32,
    _favColor: 'blue',
    [favBook]: 'Metro 2033',
    [Symbol('visible')]: 'foo'
  };
  
  const handler = {
    ownKeys: (target) => {
      const reportedKeys = [];
      const actualKeys = Reflect.ownKeys(target);
  
      for (const key of actualKeys) {
        if (key === favBook || key === '_favColor') {
          continue;
        }
        reportedKeys.push(key);
      }
  
      return reportedKeys;
    }
  };
  
  proxy = new Proxy(obj, handler);
}
// Object.keys 内部使用了 对象的OwnPropertyKeys获得对象的ownKeys。 所以看不到 _favColor 属性
console.log(Object.keys(proxy)); // ['name', 'age']
`,
      desc: [
        'Symbol 最重要的两个作用  \
        <br>&nbsp;&nbsp;>>  可以防止属性命名冲突。  \
        <br>&nbsp;&nbsp;>>  可以模拟私有属性。 (通过 proxy 其 ownKeys 方法 使外边不能知道obj有这个属性，但是可以通过源码很容易找到) \
        ',
      ],
    },
    {
      title: 'Proxy',
      jsCode: ``,
      desc: [
        '',
      ],
    },
    {
      title: 'Reflect',
      jsCode: ``,
      desc: [
        '',
      ],
    },
    {
      title: '网络攻击',
      jsCode: ``,
      desc: [
        'CSRF  XSS',
        '跨网站脚本 XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。',
        'XSS  跨站脚本攻击是指恶意攻击者往Web页面里插入恶意Script代码，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。\
        <br>&nbsp;&nbsp;>>  反射型: 发出请求时，XSS代码出现在URL中，作为输入提交到服务器，服务器解释后相应，在响应内容中出现这段XSS代码，最后由浏览器解释执行！ 比如接口参数里有一个script标签 未处理就被接口返回 脚本就奔执行了 (https://zhuanlan.zhihu.com/p/37455061) 。exp: 比如给你一个微博的连接url 带有一个script标签 引入了一段js js自动在页面调用 发微博的功能 或者 获取你的cookie信息 发送回服务器\
        <br>&nbsp;&nbsp;>>  存储型: 提交的XSS代码会存储在服务器上，下次请求目标页面的时候不需要再次提交XSS代码！！存储的位置可以是数据库、内存、文件系统等。典型的例子就是留言板XSS，用户提交一条包含XSS代码的留言存储到数据库，目标用户查看留言板时，那些留言的内容就会从数据库查询出来并显示，在浏览器上与正常的HTML和JS解析执行，触发XSS攻击！！ \
        <br>&nbsp;&nbsp;>>  DOM型: 利用客户端对 url referrer cookie 等的使用 触发XSS ',
        '如何预防 XSS 攻击  \
        <br>&nbsp;&nbsp;>>  部署WAF Web 应用层防火墙  \
        <br>&nbsp;&nbsp;>>  过滤所有HTTML JS CSS标签  \
        <br>&nbsp;&nbsp;>>  过滤异常字符编码',
        'CSRF 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。',
        '如何发动CSRF攻击  \
        <br>&nbsp;&nbsp;  1、用户登录A网站，并在本地生成Cookie\
        <br>&nbsp;&nbsp;  2、在不退登A网站情况下，用户访问恶意网站B\
        <br>&nbsp;&nbsp;  3、网站B 发起一个A网站的请求 比如GET形式的转账等',
        '如何防御 CSRF 攻击  \
        <br>&nbsp;&nbsp;>>  验证 HTTP Referer 字段， 但是有很多情况无法获取到Referer比如用户禁用等  \
        <br>&nbsp;&nbsp;>>  增加验证码参数，攻击者无法获取验证码 用户体验差 \
        <br>&nbsp;&nbsp;>>  请求添加token，服务器来校验  \
        <br>&nbsp;&nbsp;>>  在 HTTP 头中自定义属性并验证  \
        <br>&nbsp;&nbsp;>>  cookie SameSite=Lax  属性(需要浏览器支持 比如 chrome 高版本默认设置)'
      ],
    },
    {
      title: 'Cookie',
      jsCode: ``,
      desc: [
        '不能跨域',
        '大小 4k 左右',
        '可以被禁用',
        '必须运行在服务器环境下',
        '两个相同的cookie  path越重优先级越高  可以同一path下设置不同path的cookie',
        'document.cookie="username=value; path=/; expires="+oDate.toGMTString();  \
        +oDate.toUTCString();  \
        <br>&nbsp;&nbsp;>>  username=value; 设置的cookie 名和值 \
        <br>&nbsp;&nbsp;>>  expires 有效日期（UTC 时间） 时间设置成过去的时间就可以删除cookie \
        <br>&nbsp;&nbsp;>>  path cookie属于什么路径 同一网站使用 / 更方便  ',
        '***  SameSite 属性单独介绍  Strict / Lax / None 三个值 \
        <br>&nbsp;&nbsp;>>  是chrome 新加的一个属性，用来防止 CSRF 攻击和用户追踪。  \
        <br>&nbsp;&nbsp;>>  Strict 完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 主域 与请求目标一致，才会带上 Cookie。 太过严格一般不会使用  \
        <br>&nbsp;&nbsp;>>  Lax 规则稍稍放宽，大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。 \
        <br>&nbsp;&nbsp;>>  None 不做任何处理 自行设置时需要同时设置 Secure 属性否则不生效 exp: Set-Cookie: widget_session=abc123; SameSite=None; Secure  \
        <br>&nbsp;&nbsp;>>  参考链接 http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html  \
        '
      ],
    },
    {
      title: '绩效评分',
      jsCode: ``,
      desc: [
        'S 95≤得分≤100 <br>&nbsp; 工作成果显著超出目标预期/岗位要求，有重大突破或创新',
        'A 90≤得分＜95 <br>&nbsp; 工作成果均超出目标预期/岗位要求，有亮点',
        'B+ 85≤得分<90 <br>&nbsp; 工作成果整体达标，有部分超出目标预期/岗位要求，有亮点',
        'B 75≤得分<85 <br>&nbsp; 工作成果整体达标，完全达到目标预期/岗位要求',
        'B- 70≤得分<75 <br>&nbsp; 工作成果整体达标，有部分达到目标预期/岗位要求，需要提高',
        'C 60≤得分<70 <br>&nbsp; 工作成果未达到目标预期/岗位要求，存在一些差距，存在一定改进空间',
        'D 0≤得分<60 <br>&nbsp; 工作成果未达到目标预期/岗位要求，存在明显差距',
      ],
    },
    {
      title: 'npm install 如何安装模块的',
      jsCode: ``,
      desc: [
        '过程总结：  \
        <br>&nbsp;&nbsp; 1、发出npm install命令  \
        <br>&nbsp;&nbsp; 2、npm 向 registry 查询模块压缩包的网址  \
        <br>&nbsp;&nbsp; 3、下载压缩包，存放在~/.npm目录  \
        <br>&nbsp;&nbsp; 4、解压压缩包到当前项目的node_modules目录',
        'npm install 命令用来安装模块到node_modules目录。安装之前，npm install会先检查，node_modules目录之中是否已经存在指定模块。如果存在，就不再重新安装了，即使远程仓库已经有了一个新版本，也是如此。-f 可以强制安装',
        'npm update 会先到远程仓库查询最新版本，然后查询本地版本。如果本地版本不存在，或者远程版本较新，就会安装。',
        'npm update命令怎么知道每个模块的最新版本呢？<br/>答案是 npm 模块仓库提供了一个查询服务，叫做 registry 。以 npmjs.org 为例，它的查询服务网址是 https://registry.npmjs.org/{{packageName}} 。',
        'registry 会返回一个json对象包含 package 的信息包括版本 dist.tarball(压缩包地址)，到tarball下载压缩包，在本地解压，就得到了模块的源码放入npm_modules。npm install和npm update命令，都是通过这种方式安装模块的。',
        'npm install或npm update命令，从 registry 下载压缩包之后，都存放在本地的缓存目录。通过npm config get cache 可查看',
      ],
    },
    // {
    //   title: '',
    //   jsCode: ``,
    //   desc: [
    //     '',
    //   ],
    // },
  ]
}