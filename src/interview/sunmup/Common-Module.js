export default {
  title: 'CommonJS AMD Module',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: '参考文章',
      jsCode: ``,
      desc: [
        'http://javascript.ruanyifeng.com/nodejs/module.html',
        'http://es6.ruanyifeng.com/#docs/module',
      ],
    },
    {
      title: 'CommonJS Module 差异',
      jsCode: ``,
      desc: [
        '有两个重大差异：  \
        <br>&nbsp;&nbsp;>>  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。  \
        <br>&nbsp;&nbsp;>>  CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。',
        '第一个差异是 因为 CommonJS 输出的是一个拷贝对象 模块内部的变化就影响不到这个值',
        '第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。'
      ],
      img: []
    },
    {
      title: 'CommonJS 规范',
      jsCode: ``,
      desc: [
        'Node js 是CommonJS 规范的一种实现',
        '每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。',
        'CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性(require(xxx))。',
        '所有代码都运行在模块作用域，不会污染全局作用域。',
        '每个模块内部会直接写入 exports 对象等同于 var exports = module.exports;',
        'CommonJS模块的加载机制是，输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个例子。',
        'CommonJS模块的特点如下。  \
        <br>&nbsp;&nbsp;>> 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。  \
        <br>&nbsp;&nbsp;>> 模块加载的顺序，按照其在代码中出现的顺序。  \
        <br>&nbsp;&nbsp;>> 加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式。',
        'Node内部提供一个Module构建函数。所有模块都是Module的实例。每个模块内部，都有一个module对象，代表当前模块。它有以下属性:  \
        <br>&nbsp;&nbsp;>> module.id 模块的识别符，通常是带有绝对路径的模块文件名。 \
        <br>&nbsp;&nbsp;>> module.filename 模块的文件名，带有绝对路径。 \
        <br>&nbsp;&nbsp;>> module.parent 返回一个对象，表示调用该模块的模块。 \
        <br>&nbsp;&nbsp;>> module.children 返回一个数组，表示该模块要用到的其他模块。 \
        <br>&nbsp;&nbsp;>> module.exports 表示模块对外输出的值。 ',
        'require 命令  \
        <br>&nbsp;&nbsp;>>  require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。\
        <br>&nbsp;&nbsp;>>  如果模块输出的是一个函数，那就不能定义在exports对象上面，而要定义在module.exports变量上面。永远推荐 module.exports 写法。\
        <br>&nbsp;&nbsp;>>  require命令用于加载文件，后缀名默认为.js。\
        <br>&nbsp;&nbsp;>>  对于对此require同一模块 不会重新加载 输出的是缓存 -> require.cache',
        '根据参数的不同格式，require命令去不同路径寻找模块文件  \
        <br>&nbsp;&nbsp;>>  如果参数字符串以“/”开头，则表示加载的是一个位于绝对路径的模块文件。比如，require("/home/marco/foo.js")将加载/home/marco/foo.js。 \
        <br>&nbsp;&nbsp;>> 如果参数字符串以“./”开头，则表示加载的是一个位于相对路径（跟当前执行脚本的位置相比）的模块文件。比如，require("./circle")将加载当前脚本同一目录的circle.js。 \
        <br>&nbsp;&nbsp;>>  如果参数字符串不以“./“或”/“开头，则表示加载的是一个默认提供的核心模块（位于Node的系统安装目录中），或者一个位于各级node_modules目录的已安装模块（全局安装或局部安装）。\
        ',
        '举例来说，脚本/home/user/projects/foo.js执行了require("bar.js")命令，Node会依次搜索以下文件。  \
        <br>&nbsp;&nbsp;>>  /usr/local/lib/node/bar.js  \
        <br>&nbsp;&nbsp;>>  /home/user/projects/node_modules/bar.js  \
        <br>&nbsp;&nbsp;>>  /home/user/node_modules/bar.js  \
        <br>&nbsp;&nbsp;>>  /home/node_modules/bar.js  \
        <br>&nbsp;&nbsp;>>  /node_modules/bar.js  \
        <br>&nbsp;&nbsp;这样设计的目的是，使得不同的模块可以将所依赖的模块本地化。',
        '如果指定的模块文件没有发现，Node会尝试为文件名添加.js、.json、.node后，再去搜索。.js件会以文本格式的JavaScript脚本文件解析，.json文件会以JSON格式的文本文件解析，.node文件会以编译后的二进制文件解析。',
        '如果想得到require命令加载的确切文件名，使用require.resolve()方法。',
      ],
    },
    {
      title: 'require的内部处理流程',
      jsCode: `Module._load = function(request, parent, isMain) {
  // 1. 检查 Module._cache，是否缓存之中有指定模块
  // 2. 如果缓存之中没有，就创建一个新的Module实例
  // 3. 将它保存到缓存
  // 4. 使用 module.load() 加载指定的模块文件，
  //    读取文件内容之后，使用 module.compile() 执行文件代码
  // 5. 如果加载/解析过程报错，就从缓存删除该模块
  // 6. 返回该模块的 module.exports
};
// 上面的第1步和第2步，require函数及其辅助方法主要如下。
require(): 加载外部模块
require.resolve()：将模块名解析到一个绝对路径
require.main：指向主模块
require.cache：指向所有缓存的模块
require.extensions：根据文件的后缀名，调用不同的执行函数

// 上面的第4步，采用module.compile()执行指定模块的脚本，逻辑如下。
// Module._compile方法是同步执行的，所以Module._load要等它执行完成，才会向用户返回module.exports的值。
Module.prototype._compile = function(content, filename) {
  // 1. 生成一个require函数，指向module.require
  // 2. 加载其他辅助方法到require
  // 3. 将文件内容放到一个函数之中，该函数可调用 require
  // 4. 执行该函数
};
//一旦require函数准备完毕，整个所要加载的脚本内容，就被放到一个新的函数之中，这样可以避免污染全局环境。该函数的参数包括require、module、exports，以及其他一些参数。
(function (exports, require, module, __filename, __dirname) {
  // YOUR CODE INJECTED HERE!
});`,
      desc: [
        'require命令是CommonJS规范之中，用来加载其他模块的命令。它其实不是一个全局命令，而是指向当前模块的module.require命令，而后者又调用Node的内部命令Module._load。',
      ],
    },
    {
      title: 'Module 语法',
      jsCode: ``,
      desc: [
        'ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。 export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。',
      ],
    },
    {
      title: 'export',
      jsCode: `let m = 1
export m  //报错
export { m }
export { m as ma}
export var m = 1;
function a() {}
export function a() {} ✅
export a  //报错`,
      desc: [
        '命令规定的是对外的接口 不能输出值或代表值的"变量" 包括fn class 等',
        '语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。',
        'export 可以位于模块任何位置 但必须在模块顶层  不能在块级作用域'
      ],
    },
    {
      title: 'export default',
      jsCode: ` // export-default.js
export default function () {
  console.log('foo');
}
// other.js
import customName from './export-default';
customName()

// export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
import foo from 'modules';

// 可以和import 同时使用
//lodash.js
export default function (obj) {}
export function each(obj, iterator, context) {}
export { each as forEach };
import _, { each, forEach } from 'lodash';`,
      desc: [
        '输出的是一个变量不是一个接口，实质是把输出的值赋值给 default（输出变量、fn、class）',
        '使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到export default命令，为模块指定默认输出',
      ],
    },
    {
      title: 'import',
      jsCode: `//main.js
export let name = 'abc' 
// other.js
import { name } from './main.js'
import { name as nameUSA } from './main.js'

// 语句会执行所加载的模块，因此可以有下面的写法。
import 'lodash'; //不输入任何信息 只执行模块

// 整体加载，即用星号（*）指定一个对象
// circle.js
export function a(){}
export function b(){}
// other2.js
import * as circle from './circle';
circle.a()
circle.b()
circle.a = 5 //报错 不允许对输出接口改写`,
      desc: [
        '命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块对外接口的名称相同。或者使用as关键字。',
        '命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。',
        '命令具有提升效果，会提升到整个模块的头部，首先执行。(命令是编译阶段执行的，在代码运行之前。)',
        '命令是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。',
        '如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。',
        'import 使用时 会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。',
      ],
    },
    {
      title: 'export 与 import 的复合写法',
      jsCode: `export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
// export default
export { default } from 'foo';`,
      desc: [
        '如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。',
        '但需要注意的是，写成一行以后，foo和bar实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用foo和bar。',
      ],
    },
    {
      title: 'import() 动态加载',
      desc: [
        'import()返回一个 Promise 对象',
        'import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。',
        'import()类似于 Node 的require方法(加载出来的是一个copy)，区别主要是前者是异步加载，后者是同步加载。',
        '可以按需加载，条件加载，动态模块路径',
        'import()加载模块成功以后，这个模块会作为一个对象，当作then方法的参数。',
        '如果模块有default输出接口，可以用参数直接获得。',
      ]
    }
  ]
}