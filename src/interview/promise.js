/**
 * 未解决问题
 * 3.x 为promise对象时的表现是否正确
 * 2.3.1: If `promise` and `x` refer to the same object, reject `promise` with a `TypeError' as the reason.
 *  错误原因：当x为当前 promise 时出错
 *    1) via return from a fulfilled promise
 * 2.3.3.1: Let `then` be `x.then`
 *  `x` is an object with null prototype
 *    2) via return from a fulfilled promise
 *    3) via return from a rejected promise
 *  `x` is an object with normal Object.prototype
 *    4) via return from a fulfilled promise
 *    5) via return from a rejected promise
 *  。。。。。
 * 2.3.4: If `x` is not an object or function, fulfill `promise` with `x`
 *  The value is `null`
 *    全部出错
 */
let consoleOk = false
let id = 100
function MyPromise(executor, status = false, thenable = false) {
  if (!executor || typeof executor !== 'function') {
    throw 'TypeError: Promise resolver undefined is not a function'
  }
  this.freename = id
  id++
  this.status = 'pending' // pending fulfilled rejected
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
        outputCorrecting.call(this, x, null, 'fulfilled')
        // resolvePromise
      }, (e) => {
        if (n) return
        n++
        if (this.thenOutputStatus) {
          rejectPromise.call(this, e)
        } else {
          outputCorrecting.call(this, e, null, 'rejected')
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
    asyncFn.call(this, 'fulfilled', x)
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
  if (type === 'fulfilled') {
    _this.value = x
  } else if (type === 'rejected') {
    _this.reason = x
  }
  afterFn()
  function afterFn() {
    _this.status = type
    let output = undefined
    let arr = []
    if (type === 'fulfilled') {
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
        outputCorrecting.call(_this, output, arr[i], type)
        //arg[3] 代表是then 队列在执行
      } catch (e) {
        arr[i].reject(e)
        return
      }
    }
    _this.onFulfilledArr = []
  }
}
function outputCorrecting(x, thenFnObj, type) {
  let _this = this
  let fn = undefined
  if (_this.status === 'rejected') {
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
  } else if (x instanceof MyPromise) {
    // x 为 Promise
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
  } else if ((typeof x === 'object' || typeof x === 'function') && x.then && typeof x.then === 'function') {
    // x 为 thenable 对象或函数
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
  } else {
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
        type == 'fulfilled' && resolvePromise.call(_this, x)
        type == 'rejected' && rejectPromise.call(_this, x)
      }
    } catch (e) {
      if (thenFnObj) {
        thenFnObj.reject(e)
      } else {
        rejectPromise.call(_this, e)
      }
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
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  consoleOk && console.log('then')
  // 链式调用时如果 status 是执行态 直接取value
  let _this = this
  let pending = _this.status === 'pending'
  let onFulfilledItem = {}
  let onRejectedItem = {}
  if ((pending || _this.status === 'fulfilled') && onFulfilled && typeof onFulfilled === 'function') {
    if (pending) {
      onFulfilledItem = {
        thenArgFn: onFulfilled
      }
    } else {
      return new MyPromise(resolve => {
        this.microTask(() => {
          onFulfilled(_this.value)
          resolve()
        }, true)
      })
    }
  }
  if ((pending || _this.status === 'rejected') && onRejected && typeof onRejected === 'function') {
    if (pending) {
      onRejectedItem = {
        thenArgFn: onRejected
      }
    } else {
      return new MyPromise((resolve, reject) => {
        this.microTask(() => {
          onRejected(_this.reason)
          reject()
        }, true)
      })
    }
  }
  return new MyPromise((resolve, reject) => {
    _this.onFulfilledArr.push(Object.assign(onFulfilledItem, {
      resolve,
      reject,
    }))
    _this.onRejectedArr.push(Object.assign(onRejectedItem, {
      resolve,
      reject,
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
MyPromise.all = function(listPromise) {
  return new MyPromise((resolve, reject) => {
    if (!listPromise || !Array.isArray(listPromise)) {
      reject(new TypeError('undefined is not iterable (cannot read property Symbol(Symbol.iterator))'))
      return
    }
    if (!listPromise.length) {
      resolve([])
      return
    }
    let n = 0
    let resolveStatus = true
    let outputArr = []
    listPromise.forEach((itemPromise, index) => {
      (function(i) {
        itemPromise.then(res => {
          if (!resolveStatus) return
          n++
          outputArr[i] = res
          if (n == listPromise.length) {
            resolve(outputArr)
          }
        }, e => {
          resolveStatus = false
          reject(e)
          return
        })
      })(index)
    })
  })
}
// export default MyPromise
module.exports = MyPromise

/**
 * then 返回promise对象
 * catch 内部可以用then实现也返回一个promise对象 虽然有时cb不执行但是也会影响一轮的eventLoop
 */