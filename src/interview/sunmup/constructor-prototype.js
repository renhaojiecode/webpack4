export default {
  title: '构造函数 原型 原型链 继承',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: 'prototype 的定义：给其它对象提供共享属性的对象',
      jsCode: ``,
      desc: [
        'prototype 自己也是对象，只是被用以承担某个职能罢了，算是一种约定。',
        '当我们说 prototype 对象时，是在做一个简略描述，实际上说的是 “xxx 对象的 prototype 对象”。如果不跟其它对象产生关联，就不构成 prototype 这个称谓。',
        '所有对象，都可以作为另一个对象的 prototype 来用。',
      ],
    },
    {
      title: '我们定义的 Object 对象都有一个隐式的引用 _proto_, 它被称之为这个对象的 prototype 原型',
      jsCode: `let test = {
  get a() {
    return Object.getPrototypeof(this)
  },
  set a(value) {
    return Object.setPrototypeof(this, value)
  },
}
console.log('_proto_', test.a == test._proto_)
// _proto_ 模拟 _proto_ 实际上是通过 Object.prototype.__proto__ 实现的
`,
      desc: [
        '如果我们想得到一个没有原型的对象 Object.create(null) 适用于一些框架 库等初始化对象',
        'Object.getPrototypeOf(obj) == obj._proto_ 都可以用来访问 obj 的原型对象',
        'Object.setPrototypeOf(obj, prototype) 间接设置指定对象的 prototype 对象, obj = Object.create(prototype) / obj.__proto__ = prototype 直接设置',
      ],
    },
    {
      title: '什么是原型链',
      jsCode: `// 当我们 obj.name 和 obj[name] 去访问一个对象的属性时
let obj = {name: 'name'}
getAttr(obj, name)
function getAttr(obj, name) {
  if (!obj) {
    return new Error('Cannot read property '+ name +' of ' + obj)
  }
  let current = obj
  if (current.hasOwnProperty(name)) {
    return current[name]
  } else {
    current = Object.getPrototypeOf(obj)
  }
}
// 用户以为自己在访问对象的属性，其实它是在整条原型链上查找`,
      desc: [
        '既然 prototype 只是恰好作为另一个对象的隐式引用的普通对象。',
        '那么，它也是对象，也符合一个对象的基本特征。也就是说，prototype 对象也有自己的隐式引用，有自己的 prototype 对象。',
        '如此，构成了对象的原型的原型的原型的链条，直到某个对象的隐式引用为 null，整个链条终止',
      ],
    },
    {
      title: '继承',
      jsCode: `// 显式继承
// Object.setPropertyOf 和 Object.create 的差别在于：
  // 1）Object.setPropertyOf，给我两个对象，我把其中一个设置为另一个的原型。
  // 2）Object.create，给我一个对象，它将作为我创建的新对象的原型。
const obj_a = {a: 1};
const obj_b = {b: 2};
Object.setPrototypeOf(obj_b, obj_a);
// obj_b._proto_ -> obj_a

// 隐式继承
let obj_c = new Object;
// 这个过程可以拆分为
function _new(Constructor, ...arg) {
  let case = {};
  Object.setPrototypeOf(case, Constructor.prototype);
  // let instance = Object.create(Constructor.prototype)
  Constructor.call(case, ...arg);
}
function _create(proto) {
  let Noop = function() {};
  Noop.prototype = proto;
  return new Noop();
}`,
      desc: [
        '所谓的原型继承，就是指设置某个对象为另一个对象的原型',
        'JS有两类原型继承的方式：显式继承和隐式继承。',
        '一种是通过 Object.create 或者 Object.setPrototypeOf 显式继承另一个对象，将它设置为原型。',
        '另一种是通过 constructor 构造函数，在使用 new 关键字实例化时，会自动继承 constructor 的 prototype 对象，作为实例的原型。',
      ],
    },
    {
      title: '构造函数继承',
      jsCode: `function ConstructorA({nameA}) {
  this.name = 'ConstructorA'
  this.nameArgA = nameA
}
ConstructorA.prototype.showNameA = () => this.name
function ConstructorB({nameB}) {
  this.name = 'ConstructorB'
  this.nameArgB = nameB
}
ConstructorB.prototype.showNameB = () => this.name
// 数据一起继承
function inherit(ConstructorA, ConstructorB) {
  let ConstructorC = function (...arg) {
    // 利用新建对象 继承数据
    ConstructorA.call(this, ...arg)
    ConstructorB.call(this, ...arg)
  }
  ConstructorC.prototype = Object.assign({}, ConstructorB.prototype, {
    constructor: ConstructorC
  })
  Object.setPrototypeOf(ConstructorC.prototype, ConstructorA.prototype)
  return ConstructorC
}
let ConstructorNew = inherit(ConstructorA, ConstructorB)
console.dir(new ConstructorNew({nameA: '123', nameB: '456'}))`,
      desc: [
        '第一步是，编写新的 constructor，将两个 constructor 通过 call/apply 的方式，合并它们的属性初始化。',
        '第二步是，取出超类和子类的原型对象，通过 Object.create/Object.setPrototypeOf 显式原型继承的方式，设置子类的原型为超类原型',
      ],
    },
    {
      title: '总结',
      jsCode: ``,
      desc: [
        '面试官：谈谈你对 JS 原型和原型链的理解？',
        '候选人：JS 原型是指为其它对象提供共享属性访问的对象。在创建对象时，每个对象都包含一个隐式引用指向它的原型对象或者 null。原型也是对象，因此它也有自己的原型。这样构成一个原型链。',
        '面试官：原型链有什么作用？',
        '候选人：在访问一个对象的属性时，实际上是在查询原型链。这个对象是原型链的第一个元素，先检查它是否包含属性名，如果包含则返回属性值，否则检查原型链上的第二个元素，以此类推。',
        '面试官：那如何实现原型继承呢？',
        '候选人：有两种方式。一种是通过 Object.create 或者 Object.setPrototypeOf 显式继承另一个对象，将它设置为原型。<br/>另一种是通过 constructor 构造函数，在使用 new 关键字实例化时，会自动继承 constructor 的 prototype 对象，作为实例的原型。<br/> 在 ES2015 中提供了 class 的风格，背后跟 constructor 工作方式一样，写起来更内聚一些。',
        '面试官：ConstructorB 如何继承 ConstructorA ？',
        '候选人：JS 里的继承，是对象跟对象之间的继承。constructor 的主要用途是初始化对象的属性。 <br/> 因此，两个 Constructor 之间的继承，需要分开两个步骤。<br/> 第一步是，编写新的 constructor，将两个 constructor 通过 call/apply 的方式，合并它们的属性初始化。按照超类优先的顺序进行。<br/> 第二步是，取出超类和子类的原型对象，通过 Object.create/Object.setPrototypeOf 显式原型继承的方式，设置子类的原型为超类原型。<br/> 整个过程手动编写起来比较繁琐，因此建议通过 ES2015 提供的 class 和 extends 关键字去完成继承，它们内置了上述两个步骤。',
        '面试官：看起来你挺了解原型，你能说一个原型里比较少人知道的特性吗？',
        '候选人：在 ES3 时代，只有访问属性的 get 操作能触发对原型链的查找。在 ES5 时代，新增了 accessor property 访问器属性的概念。它可以定义属性的 getter/setter 操作。<br/> 具有访问器属性 setter 操作的对象，作为另一个对象的原型的时候，设置属性的 set 操作，也能触发对原型链的查找。<br/> 普通对象的 __proto__ 属性，其实就是在原型链查找出来的，它定义在 Object.prototype 对象上。',
      ],
    },
  ]
}