export default {
  title: 'Vue API',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: 'Vue 3.0 新特性',
      // https://zhuanlan.zhihu.com/p/147022323?utm_source=wechat_session&utm_medium=social&utm_oi=751382926662320128
      desc: [
        '使用 Proxy 代替Object.defineProperty',
        '使用 TypeScript 编写',
        'Vue有一个相当独特的渲染策略：它提供类似于HTML的模板语法，但是，它是将模板编译成渲染函数来返回虚拟DOM树。Vue框架通过递归遍历两个虚拟DOM树，并比较每个节点上的每个属性，来确定实际DOM的哪些部分需要更新。 \
        <br>&nbsp;&nbsp; 1、在编译阶段 对可能发生变更的节点（v-if,v-for）进行分块，在变更时 追踪到相应的块去 进行虚拟dom更新  \
        <br>&nbsp;&nbsp; 2、并且 对于那些静态的节点 等在生成代码时保存在 render函数外 避免不必要的渲染。',
        '体积更小 对不常用的功能进行 模块化引入 依靠 module 的tree-shaking 进一步减小打包体积',
      ]
    },
    {
      title: 'Vue 3.0 使用 Proxy 代替 Object.defineProperty 的优点',
      desc: [
        '消除了之前 Vue2.x 中基于 Object.defineProperty 的实现所存在的很多限制：无法监听 属性的添加和删除、数组索引和长度的变更，并可以支持 Map、Set、WeakMap 和 WeakSet！',
        '通过 Proxy 我们可以不直接操作对象本身，而是通过操作对象的代理对象来间接来操作对象，达到预期的目的~',
      ]
    },
    {
      title: '响应式原理',
      desc: [
        '当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。',
        '每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。',
      ]
    },
    {
      title: 'scoped 小技巧',
      jsCode: `
style scoped  可以这样使作用于子组件
.a >>> .b { /* ... */ }
`
    },
    {
      title: 'vue router host 和 history 模式的区别',
      desc: [
        'host 是默认模式 但是连接中会带有 # 号  有些分享到第三方app 等情况有可能会存在过滤导致的问题',
        'mode: history, 开启history 模式  通过 history.pushState() 实现页面地址变更 能前进和后退但是不刷新。通过 onpopstate 来监听前进后退',
        '区别 host 模式有#号，history 模式在进行多级path时刷新页面会404 需要通过ng等配置 重定向到 首页。',
      ]
    },
    {
      title: 'computed watch 的区别',
      desc: [
        'computed 有缓存  当依赖有更新 时 并且在下次访问时才计算新的值 （vue computed的最终计算结果 变化才会触发渲染）',
      ]
    },
    {
      title: '是否会被渲染',
      jsCode: `
created() {
  this.text1 = 'text1'
}
// mounted不会被渲染 会报错
mounted() {
  this.text2 = 'text2'
}
// 因为beforeMount时 render 函数首次被调用， mounted 是实例被挂载后调用 $el 被挂载 
`,
      desc: [
        'host 是默认模式 但是连接中会带有 # 号  有些分享到第三方app 等情况有可能会存在过滤导致的问题',
        'mode: history, 开启history 模式  通过 history.pushState() 实现页面地址变更 能前进和后退但是不刷新。通过 onpopstate 来监听前进后退',
        '区别 host 模式有#号，history 模式在进行多级path时刷新页面会404 需要通过ng等配置 重定向到 首页。',
      ]
    },
    {
      title: 'nextTick',
      jsCode: `const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}`,
      desc: [
        'Vue 在更新 DOM 时是异步执行的。',
        '为了在数据变化之后等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 Vue.nextTick(callback)',
        'Vue.nextTick 是基于 Promise MutationObserver setTimeout 这几种异步操作来实现的  \
        <br>&nbsp;&nbsp;>> 实现原理是 vue操作DOM之后 执行异步队列 然后更新DOM（同步） 因此在数据变更语句后边 执行一个异步操作一定可以获得变更后的DOM节点',
      ],
      img: []
    },
  ]
}