'use strict;'
import MyPromise from './promise.js'
function test(MyPromise) {
  let p1 = new MyPromise((reslove) => {
    reslove({'then': function(resolve, reject) {
      console.log('then')
      console.log(p1)
      reject({'then': function(resolve) {
        console.log('then')
        resolve('abc')
      }})
    }})
    // reslove(1)
  })
  p1.then((res) => {
    console.log(this, res, 'p1')
    // return res + 1
    return {'then': function(resolve) {
      console.log('then finally')
      resolve({'then': function(resolve) {
        console.log('then finally resolve')
        resolve('abc')
      }})
    }}
  }).finally(() => {
    console.log('finally', 'p1')
    return {'then': function(resolve) {
      console.log('then finally')
      resolve({'then': function(resolve) {
        console.log('then finally resolve')
        resolve('abc')
      }})
    }}
  }).then((res) => {
    console.log(res, 'p1')
    return res + 1
  }).catch(e => {
    console.log(e)
  })
  // .then((res) => {
  //   console.log(res, 'p1')
  //   return res + 1
  // })
  // let p2 = new MyPromise((reslove) => {
  //   reslove(1)
  // })
  // p2.then((res) => {
  //   console.log(this, res, 'p2')
  //   return res + 1
  // }).finally(() => {
  //   console.log('finally', 'p2')
  //   return {'then': function(resolve) {
  //     console.log('then finally p2')
  //     resolve({'then': function() {
  //       console.log('then finally resolve p2')
  //       // resolve('abc')
  //     }})
  //   }}
  // }).then((res) => {
  //   console.log(res, 'p2')
  //   return res + 1
  // })
  // let myInstance = new MyPromise((reslove, reject) => {
  //   setTimeout(() => {
  //     reslove(1)
  //     reject({'response': 'hahha'})
  //   }, 100)
  // })
  // let myInstance2 = myInstance.then((res) => {
  //   console.log(res, 0)
  //   return res + 1
  //   // return {'then': function(resolve) {
  //   //   console.log('then')
  //   //   resolve('then-null')
  //   //   /**
  //   //    * 如果返回一个thenable 对象会返回如下Promise对象
  //   //    * new Promise(resolve => {
  //   //    *  let p1 = Promise.resolve('then-null')
  //   //    *  resolve(p1)
  //   //    * })
  //   //    */
  //   // }}
  // }).then((res) => {
  //   console.log(res, 0)
  //   return res + 1
  // }).then().then((e) => {
  //   console.log(e, 0)
  //   throw 'throw'
  // }).then((res) => {
  //   console.log(res, 0)
  // }).catch((e) => {
  //   console.log(e, 0)
  // }).finally(() => {
  //   console.log('finally', 0)
  // }).then((res) => {
  //   console.log(res, 0)
  // })
  // myInstance.then(res => {
  //   console.log(res, 3)
  //   return res + 1
  // }).then(res => {
  //   console.log(res, 3)
  //   return res + 1
  // }).then(res => {
  //   console.log(res, 3)
  //   return res + 1
  // }).then(res => {
  //   console.log(res, 3)
  //   return res + 1
  // })
  // setTimeout(() => {
  //   myInstance2.then(res => {
  //     console.log(res, 2)
  //     return res + 1
  //   }).then(res => {
  //     console.log(res, 2)
  //     return res + 1
  //   })
  //   myInstance.then(res => {
  //     console.log(res, 1)
  //     return res + 1
  //   }).then(res => {
  //     console.log(res, 1)
  //     return res + 1
  //   })
  // }, 300)
}
let obj = {b: 'etc'}
// test.call(obj, Promise)
setTimeout(() => {
  test.call(obj, MyPromise)
}, 2000)

/**
 * ren
 * 本文件简介  status && (function() {})()
 * getElements动态的 NodeList 和  querySelector静态的 NodeList 验证
 * 二分法排序
 * 打乱数组
 * bind 函数实现（未完成）
 * promise A+
 * Function.prototype.call.apply
 * prototype 对象实践
 * Object.definedProperty()
 */
let status = false
status && (function() {
  function creatDom(tag, cName) {
    let oNode = document.createElement(tag)
    if (cName) {
      oNode.className = cName
      oNode.innerText = cName
    }
    document.body.appendChild(oNode)
  }
  //测试 getElement...  和  querySelector
  function testGetElementAndQuerySelect() {
    for (let i = 0; i < 3; i++) {
      creatDom('div', 'ele-box')
    }
    let aDivG = document.getElementsByClassName('ele-box')
    for (let i = 0; i < 3; i++) {
      creatDom('div', 'ele-box')
    }
    for (let i = 0; i < aDivG.length; i++) {
      aDivG[i].innerText = 'ele-box-change'
      aDivG[i].className = 'ele-box-change'
    }
    // 可以改变1 3 5 的值：因为getElements 获取的是动态的 NodeList 所以第一个改变className 之后aDivG 只剩两个了

    for (let i = 0; i < 3; i++) {
      creatDom('div', 'query-box')
    }
    let aDivQ = document.querySelectorAll('.query-box')
    for (let i = 0; i < 3; i++) {
      creatDom('div', 'query-box')
    }
    for (let i = 0; i < aDivQ.length; i++) {
      aDivQ[i].innerText = 'query-box-change'
      aDivQ[i].className = 'query-box-change'
    }
    // 只有前第三个可以改变 因为querySelector 获取的是静态的 NodeList 是当时节点的一个快照
  }
  // 总结 getElements 比 querySelector 更快 是因为 querySelector是单独存储了一个当时的快照保存了所有的节点信息 而getElements是动态的只是缓存了部分信息
  testGetElementAndQuerySelect()
})('getElements动态的')

status && (function() {
  // 二分法排序
  var arr = [3, 6, 35, 8, 34, 12, 3, 6, 45, 6, 9, 0, 12]
  console.log(mySort(arr, true))
  console.log(mySort(arr, false))
  function mySort(arr, lower = false) {
    if (arr.length <= 1) {
      return arr
    }
    let point = arr[0]
    let leftArr = []
    let rightArr = []
    arr.slice(1).forEach(ele => {
      !lower && (ele <= point ? leftArr : rightArr).push(ele)
      lower && (ele >= point ? leftArr : rightArr).push(ele)
    })
    return mySort(leftArr, lower).concat(point, mySort(rightArr, lower))
  }
})('二分法排序')

status && (function() {
  // 打乱数组
  var Solution = function(nums) {
    this.nums = Array.prototype.slice.call(nums)
  }
  Solution.prototype.reset = function() {
    return this.nums
  }
  Solution.prototype.shuffle = function() {
    let len = this.nums.length
    if (len <= 1) return this.nums
    let arr = this.nums.slice()
    for (let i = 0; i < len - 1; i++) {
      let n = Math.floor(Math.random() * (len - 1))
      let val = arr[n]
      arr[n] = arr[i]
      arr[i] = val
    }
    return arr
  }
  // 验证概率是否一致
  let n = 10000
  let map = {}
  let solution = new Solution([1, 3, 5])
  for (let i = 0; i < n; i++) {
    let str = solution.shuffle().valueOf()
    map[str] = map[str] ? map[str] + 1 : 1
  }
  console.log(map)
})('打乱数组')

status && (function() {
  // https://github.com/Raynos/function-bind
  //测试用例地址 https://github.com/Raynos/function-bind/blob/master/test/index.js
  Function.prototype.otherBind = function(that) {
    var target = this
    var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible '
    var slice = Array.prototype.slice
    var toStr = Object.prototype.toString
    var funcType = '[object Function]'
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
      throw new TypeError(ERROR_MESSAGE + target)
    }
    var args = slice.call(arguments, 1)
    var bound
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(
          this,
          args.concat(slice.call(arguments))
        )
        if (Object(result) === result) {
          return result
        }
        return this
      } else {
        return target.apply(
          that,
          args.concat(slice.call(arguments))
        )
      }
    }

    var boundLength = Math.max(0, target.length - args.length)
    var boundArgs = []
    for (var i = 0; i < boundLength; i++) {
      boundArgs.push('$' + i)
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments) }')(binder)
    function Empty() {
      //
    }
    if (target.prototype) {
      Empty.prototype = target.prototype
      bound.prototype = new Empty()
      Empty.prototype = null
    }

    return bound
  }
  // bind 函数实现
  // 创建一个绑定函数 第一个参数变更目标函数的this指向 后边的参数会在调用绑定函数时 传入目标函数中 如果在绑定函数继续传入参数会在后边传入
  Function.prototype.myBind = function() {
    let _this = this
    let newThis = arguments[0]
    let slice = Array.prototype.slice
    let args = slice.call(arguments, 1)
    let toStr = Object.prototype.toString
    if (typeof _this !== 'function' && toStr.call(_this) !== '[object Function]') {
      // 箭头函数typeof 总是报错？？？
      throw 'this is not a Funtion'
    }
    function Callback() {
      if (this instanceof Callback) {
        console.log('Callback')
        return this
      }
      let fnArgs = args.concat(slice.apply(arguments))
      return _this.apply(newThis, fnArgs)
    }
    function Empty() {
      //
    }
    Empty.prototype = _this.prototype
    Callback.prototype = new Empty()
    Empty.prototype = null
    return Callback
  }

  function TestTwo(x, y) {
    return this.add(x, y)
  }
  TestTwo.prototype.add = function(x, y) {
    return x + y
  }
  let map = {
    name: 'abc',
    add: function(x, y) {
      return x + y + this.name
    }
  }
  let fn = TestTwo.myBind(map, 3)
  console.log(fn(4, 5))
  // let fnNew = new fn(4, 5)
  // console.log(fnNew())
})('bind 函数实现')

status && (function(Promise) {
  console.log('Promise A')
  let promise = new Promise((resolve) => {
    let a = Promise.resolve(0)
    setTimeout(() => {
      resolve(a)
    }, 10)
  })
  let promise2 = promise.then(onFuifilled, onRejected).then(onFuifilled, onRejected)
  function onFuifilled(res) {
    console.log(promise2, 'onFuifilled')
    console.log(res, 'onFuifilled')
    return {status1: 'onFuifilled'}
  }
  function onRejected(err) {
    console.log(err, 'onRejected')
    return {status2: 'onRejected'}
  }
  Promise.resolve(0).then(() => {
    console.log(promise2, 'reslove0')
  })
})(MyPromise, 'promise')

status && (function() {
  console.log('Function.prototype.call.apply')
  var a = Function.prototype.call.apply( function(a) { return a }, [0, 4, 3])
  /**
   * 步骤解析
   * (function(a) { return a })(Function.prototype.call)(0, 4, 3)
   * (function(a) { return a }).call(0, 4, 3)
   * 4
   */
  console.log(a)
})('Function.prototype.call.apply')

status && (function() {
  // prototype实践 https://zhuanlan.zhihu.com/p/87667349
  console.log('prototype')
  Object.getPrototypeOf(Object) == Function.prototype
  Object.getPrototypeOf(Function) == Function.prototype //Function 中既有隐士引用(原型 __proto__) 又因为函数本是对象有 prototype
  Object.getPrototypeOf(Function.prototype) == Object.prototype
  let work0 = {a: 0}
  let work1 = {b: 1}
  let work2 = {c: 2}
  let work3 = {d: 3}
  console.log(work0)
  console.log(Object.setPrototypeOf(work1, work0))
  console.log(Object.setPrototypeOf(work2, work1))
  console.log(Object.setPrototypeOf(work3, work2))
  function SetProto(arg1) {
    this.arg = arg1
  }
  SetProto.prototype.add = function(x, y) {
    return x + y
  }
  function InheritObj(arg1) {
    this.arg1 = arg1
  }
  InheritObj.prototype.constructor = InheritObj
  console.dir(Object.setPrototypeOf(InheritObj.prototype, SetProto.prototype))

  // Object.creat()
  console.log('Object.creat')
  const create = function(prototype) {
    if (prototype == null) return {}
    function Noop() {
      //
    }
    Noop.prototype = prototype
    return new Noop()
  }
  function Test(arg1) {
    this.a = 'a'
    this.abc = arg1
  }
  Test.prototype.add = function(x, y) {
    return x + y
  }
  function Proto(arg1) {
    this.arg1 = arg1
  }
  Proto.prototype = create(Test.prototype)
  Proto.prototype.constructor = Proto
  let exp = new Proto('123')
  console.log(exp)
  console.log(exp instanceof Proto) //true
  console.log(exp instanceof Test) //true
  console.log(exp.constructor == Proto) // 如果不对constructor赋值将沿着原型链查找找到Test
  console.log(exp.a, exp.arg1, exp.abc) // undefined 123 undefined
  function createInstance(Constractor, ...arg) {
    if (typeof Constractor !== 'function' || Object.prototype.toString.call(Constractor) !== '[object Function]') {
      throw 'first argument is not a function'
    }
    let instance = Object.create(Constractor.prototype)
    Function.prototype.call.call(Constractor, instance, ...arg)
    return instance
  }
  console.log(createInstance(Test, '321'))
  console.log(createInstance(Proto, '321'))

  // inherit
  console.log('inherit')
  function inherit(SuperConstractor, prototype) {
    let { constructor } = prototype
    function SubConstractor(arg1) {
      this.subarg = arg1
      // 属性初始化
      let arg = Array.prototype.slice.call(arguments)
      Function.prototype.call.call(SuperConstractor, this, ...arg)
      Function.prototype.call.call(constructor, this, ...arg)
    }
    SubConstractor.prototype = Object.assign(
      prototype,
      {
        constructor: SubConstractor
      }
    )
    Object.setPrototypeOf(SubConstractor.prototype, SuperConstractor.prototype)
    return SubConstractor
  }
  let ReduceConstructor = inherit(Object, {
    constructor() {
      this.reducearg = arguments[0]
    },
    numreduce: 10,
    reduce(x, y) {
      return x - y - this.numreduce
    }
  })
  let RideConstructor = inherit(ReduceConstructor, {
    constructor(arg1) {
      this.ridearg = arg1
    },
    numride: 10,
    ride(x, y) {
      return x * y * this.numreduce
    }
  })
  let instanceRide = new RideConstructor('instanceRide')
  console.log(instanceRide)
  console.log(instanceRide.reduce(1, 2))
  console.log(instanceRide.ride(1, 2))
  // __proto__
  Object.defineProperty(instanceRide, 'next', {
    get() {
      let _thisObj = Object(this)
      return Object.getPrototypeOf(_thisObj)
    },
    set(proto) {
      let _thisObj = Object(this)
      Object.setPrototypeOf(_thisObj, proto)
    }
  })
  console.log(instanceRide.next.numride)

  function SuperType() {
    this.name = 'SuperType',
    this.arr = ['a', 'b', 'c']
  }
  SuperType.prototype.sayName = function() {
    console.log(this.name)
  }

  function SubType() {
    SuperType.call(this)
    this.title = 'nnnn'
  }
  SubType.prototype = Object.create(SuperType.prototype)
  // SubType.prototype = new SuperType()
  SubType.prototype.constructor = SubType
  SubType.prototype.sayTitle = function() {
    console.log(this.title)
  }
  console.log(new SubType())
})('prototype 对象实践')

status && (function() {
  // Object.defineProperty()
  let instance = {
    name: 'abc',
    value: '100W'
  }
  Object.defineProperty(instance, 'name', {
    writable: false,
  })
  console.log(instance.name)
  Object.defineProperty(instance, 'name', {
    value: 'efg',
    configurable: false,
    enumerable: false,
  })
  console.log(instance.name)
  for (let key in instance) {
    console.log(key)
  }
  console.log(Object.getOwnPropertyNames(instance))
  console.log(Object.getOwnPropertyDescriptor(instance, 'name'))
  console.log(Object.getOwnPropertyDescriptor(instance, 'value'))
})('Object.defineProperty()')

// leetcode 练习
status && (function() {
  // 两数之和
  function addTwoNumbers(l1, l2) {
    let l1Ln = l1.length
    let l2Ln = l2.length
    let ln = l1Ln > l2Ln ? l1Ln : l2Ln
    let n = 0
    let arr = []
    let pro = 0
    while (n < ln) {
      let num = pro + (n < l1Ln ? l1[n] : 0) + (n < l2Ln ? l2[n] : 0)
      pro = 0
      if (num >= 10) {
        pro = Math.floor(num / 10)
        num = num % 10
      }
      arr[n] = num
      n++
    }
    pro > 0 && (arr[n] = pro)
    return arr
  }
  console.log(addTwoNumbers([2, 4, 3, 6], [5, 6, 4]))
  function ListNode(val) {
    this.val = val
    this.next = null
  }
  console.log(abc([2, 4, 3], [5, 6, 4]))
  function abc(l1, l2) {
    let l1Ln = l1.length
    let l2Ln = l2.length
    let ln = l1Ln > l2Ln ? l1Ln : l2Ln
    let n = 0
    let pro = 0
    let l3 = null
    let nl1 = null
    let nl2 = null
    while (n < ln) {
      let num = pro + (n < l1Ln ? l1[n] : 0) + (n < l2Ln ? l2[n] : 0)
      pro = 0
      if (num >= 10) {
        pro = Math.floor(num / 10)
        num = num % 10
      }
      nl1 = new ListNode(num)
      !l3 && (l3 = nl1)
      nl2 && (nl2.next = nl1)
      nl2 = nl1
      n++
    }
    if (pro > 0) {
      nl1 = new ListNode(pro)
      nl2.next = nl1
    }
    return l3
  }
})()
