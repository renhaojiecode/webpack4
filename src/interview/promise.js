/**
 * 未解决问题
 * 1.new Promise 时value/veason是thenable对象时执行顺序不对和报错
 * 2.针对finally函数是否对cb函数包装为promise对象
 * 3.x 为promise对象时的表现是否正确
 */
let consoleOk = false
let id = 100
function MyPromise(executor, status = false, thenable = false) {
  if (!executor || typeof executor !== 'function') {
    throw 'TypeError: Promise resolver undefined is not a function'
  }
  this.freename = id
  id++
  this.status = 'pending' // pending fuilfilled rejected
  this.value = undefined
  this.reason = undefined
  this.isThenAble = thenable // 是否是thenable对象在执行
  this.thenOutputStatus = status // 代表是否是用户then函数的输出 涉及到reject状态的output是否校验的问题
  this.onFulfilledArr = []
  this.onRejectedArr = []
  let n = 0
  try {
    this.microTask(function() {
      executor((x) => {
        if (n) return
        n++
        outputCorrecting.call(this, x, null)
        // resolvePromise
      }, (e) => {
        if (n) return
        n++
        if (this.thenOutputStatus) {
          rejectPromise.call(this, e)
        } else {
          outputCorrecting.call(this, e, null)
        }
      })
    }, this.isThenAble)
  } catch (e) {
    !n && rejectPromise.call(this, e)
  }
}

function resolvePromise(x) {
  this.microTask(function() {
    consoleOk && console.log('attr resolve', this.status)
    asyncFn.call(this, 'fuilfilled', x)
  }, !this.isThenAble)
}
function rejectPromise(e) {
  this.microTask(function() {
    // console.log('attr reject')
    asyncFn.call(this, 'rejected', e)
  }, !this.isThenAble)
}
function asyncFn(type, x) {
  let _this = this
  if (type === 'fuilfilled') {
    _this.value = x
  } else if (type === 'rejected') {
    _this.reason = x
  }
  afterFn()
  function afterFn() {
    _this.status = type
    let output = undefined
    let arr = []
    if (type === 'fuilfilled') {
      output = _this.value
      arr = _this.onFulfilledArr
    } else if (type === 'rejected') {
      output = _this.reason
      arr = _this.onRejectedArr
    }
    consoleOk && console.log(arr, type)
    let len = arr.length
    for (let i = 0; i < len; i++) {
      try {
        outputCorrecting.call(_this, output, arr[i])
        //arg[3] 代表是then 队列在执行
      } catch (e) {
        arr[i].reject(e)
        return
      }
    }
    _this.onFulfilledArr = []
  }
}
function rejectOutputFn(x, thenFnObj) {
  let fn = undefined
  try {
    if (thenFnObj.thenArgFn) {
      let output = (fn = thenFnObj.thenArgFn)(x)
      thenFnObj.resolve(output)
    } else {
      thenFnObj.reject(x)
    }
  } catch (e) {
    thenFnObj.reject(e)
  }
  return fn
}
function outputCorrecting(x, thenFnObj) {
  let _this = this
  let fn = undefined
  if (_this.status === 'rejected') {
    rejectOutputFn(x, thenFnObj)
    return
  }
  if (x === MyPromise) {
    let e = new TypeError('x can\'t be MyPromise')
    if (thenFnObj) {
      thenFnObj.reject(e)
    } else {
      // 应对 new MyPromise 时对resolve 函数传入thenable对象的情况
      rejectPromise.call(_this, e)
    }
    return
  }
  // x 为 Promise
  if (x instanceof MyPromise) {
    x.then((res) => {
      try {
        if (thenFnObj) {
          let output = thenFnObj.thenArgFn ? (fn = thenFnObj.thenArgFn)(res) : res
          thenFnObj.resolve(output)
        } else {
          resolvePromise.call(_this, res)
        }
      } catch (e) {
        if (thenFnObj) {
          thenFnObj.reject(e)
        } else {
          rejectPromise.call(_this, e)
        }
      }
    }, (e) => {
      if (thenFnObj) {
        thenFnObj.reject(e)
      } else {
        rejectPromise.call(_this, e)
      }
    })
    return
  }
  // x 为 thenable 对象或函数
  if ((typeof x === 'object' || typeof x === 'function') && x.then && typeof x.then === 'function') {
    let then = null
    let bindThen = null
    try {
      then = x.then
      bindThen = then.bind(x)
    } catch (e) {
      if (thenFnObj) {
        thenFnObj.reject(e)
      } else {
        rejectPromise.call(_this, e)
      }
      return
    }
    let thenableLoad = function() {
      new MyPromise((resolve, reject) => {
        let n = 0
        try {
          bindThen((res) => {
            if (n) return
            n++
            resolve(res)
          }, (e) => {
            if (n) return
            n++
            reject(e)
          })
        } catch (e) {
          if (!n) {
            reject(e)
          }
        }
      }, true, true).then((res) => {
        if (thenFnObj) {
          let output = thenFnObj.thenArgFn ? (fn = thenFnObj.thenArgFn)(res) : res
          thenFnObj.resolve(output)
        } else {
          resolvePromise.call(_this, res)
        }
      }, (e) => {
        if (thenFnObj) {
          thenFnObj.reject(e)
        } else {
          rejectPromise.call(_this, e)
        }
      })
    }
    thenableLoad()
    return
  }
  try {
    if (thenFnObj) {
      if (thenFnObj.thenArgFn) {
        outputCorrecting.call(_this, (fn = thenFnObj.thenArgFn)(x), {
          thenArgFn: null,
          resolve: thenFnObj.resolve,
          reject: thenFnObj.reject,
        })
      } else {
        thenFnObj.resolve(x)
      }
    } else {
      resolvePromise.call(_this, x)
    }
  } catch (e) {
    if (thenFnObj) {
      thenFnObj.reject(e)
    } else {
      rejectPromise.call(_this, e)
    }
  }
  // 只是为了不让代码报错
  return fn
}
MyPromise.prototype.microTask = function(cb, status) {
  if (status) {
    setTimeout(() => {
      cb.call(this)
    }, 0)
  } else {
    cb.call(this)
  }
}
MyPromise.prototype.then = function(onFuifilled, onRejected) {
  consoleOk && console.log('then')
  // 链式调用时如果 status 是执行态 直接取value
  let _this = this
  let pending = _this.status === 'pending'
  let onFulfilledItem = {}
  let onRejectedItem = {}
  if ((pending || _this.status === 'fuilfilled') && onFuifilled && typeof onFuifilled === 'function') {
    if (pending) {
      onFulfilledItem = {
        thenArgFn: onFuifilled
      }
    } else {
      return MyPromise.resolve(onFuifilled(_this.value))
    }
  }
  if ((pending || _this.status === 'rejected') && onRejected && typeof onRejected === 'function') {
    if (pending) {
      onRejectedItem = {
        thenArgFn: onRejected
      }
    } else {
      return MyPromise.reject(onRejected(_this.reason))
    }
  }
  return new MyPromise((resolve, reject) => {
    _this.onFulfilledArr.push(Object.assign(onFulfilledItem, {
      resolve,
      reject
    }))
    _this.onRejectedArr.push(Object.assign(onRejectedItem, {
      resolve,
      reject
    }))
  }, true)
}
MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}
MyPromise.prototype.finally = function(onFinallyed) {
  return this.then((res) => {
    // onFinallyed 对cb函数进行resolve处理 为了校验cb 比如onFinallyed返回thenable对象等
    return MyPromise.resolve(onFinallyed()).then(() => { return res })
  }, (e) => {
    return MyPromise.resolve(onFinallyed()).then(() => { throw e })
  })
}
MyPromise.resolve = function(x) {
  return new MyPromise((resolve) => {
    resolve(x)
  })
}
MyPromise.reject = function(e) {
  return new MyPromise((resolve, reject) => {
    reject(e)
  })
}
export default MyPromise

/**
 * then 返回promise对象
 * catch 内部可以用then实现也返回一个promise对象 虽然有时cb不执行但是也会影响一轮的eventLoop
 */