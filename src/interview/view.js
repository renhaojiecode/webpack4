// v-model
// v-bind
// 自定义指令 实现统一管理loading态

// nextTick

// computed 和 watch 的区别和运用的场景

// keep-alive

// commmonJS module语法区别 commmonJS查找文件的方式

(function() {
  // 考察 Promise async await
  // await 命令只能用在 async 函数之中
  // await 返回 后边的 Promise 的 resolve 值即:res / 如果不是Promise 对象 就直接返回对应的值
  // await 后边的 Promise 对象出错或reject 会阻断后边的执行 可以用 async 的catch 或 Promise 的catch处理 放在try catch也行
  let a
  const b = new Promise((resolve) => {
    console.log('promise1')
    resolve()
  }).then(() => {
    console.log('promise2')
  }).then(() => {
    console.log('promise3')
  }).then(() => {
    console.log('promise4')
  })

  a = new Promise( async (resolve) => {
    console.log(a)
    await b
    console.log(a)
    console.log('after1')
    await a
    resolve(true)
    console.log('after2')
  })

  console.log('end')
  // a Promise对象 被await 但是一直是pending态 resolve在await后边永远无法执行
  // promise1
  // undefined
  // end
  // promise2
  // promise3
  // promise4
  // Promise {<pending>}
  // after1

  let abc = new Promise((resolve) => {
    console.log(1)
    resolve('123')
  }).then(res => {
    console.log(res)
    return '456'
  }).then(res => {
    console.log(res)
    return '789'
  })

  new Promise(async (resolve) => {
    console.log(2)
    await abc
    resolve('abc')
  }).then(res => {
    console.log(res)
    return 'def'
  })
  console.log(3)
  // 1
  // 2
  // 3
  // 123
  // 456
  // abc
})()

;(function() {
  // 仿写 new A()的过程
  function _new(fn) {
    let b = {}
    fn.apply(b, Array.prototype.splice.call(arguments, 1))
    b.prototype = Object.create(fn.prototype)
    b.prototype.courster = fn
    return b
  }
  function A(value) {
    this.value = value
  }
  A.prototype.name = function() { return this.value }
  const a = _new(A, 123)
  console.log(a)
  /**
   * 注：如果构造函数A直接return Obj name new A()得到的就是Obj
   */
})()

;(function() {
  // 发布订阅
  function Listen() {
    let data = {}
    this.publish = (name) => {
      if (Object.hasOwnProperty.call(data, name)) {
        data[name].forEach(cb => {
          cb()
        })
      }
    }
    this.subscribe = (name, cb) => {
      if (Object.hasOwnProperty.call(data, name)) {
        data[name].push(cb)
      } else {
        data[name] = [cb]
      }
    }
  }
  const listener = new Listen()

  listener.subscribe('test', () => {
    console.log(1)
  })
  listener.subscribe('test', () => {
    console.log(2)
  })
  listener.publish('test')
})()