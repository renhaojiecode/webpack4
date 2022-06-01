export default {
  title: 'Webpack 工程化 知识点记录',
  name: '', // 暂未使用保留字段
  content: [
    {
      title: '前端工程化',
      desc: [
        '概念如下：前端工程化是使用软件工程的技术和方法来进行前端项目的开发、维护和管理（曾经的前端开发可不是这样的，不然为什么要说工程"化"呢？）。这里顺带说下软件工程的概念：应用计算机科学理论和技术以及工程管理原则和方法，按预算和进度，实现满足用户要求的软件产品的定义、开发、和维护的工程或进行研究的学科',
        '前端工程化包含如下：\
        <br>&nbsp;&nbsp; 1.代码规范: 保证团队所有成员以同样的规范开发代码。 \
        <br>&nbsp;&nbsp; 2.分支管理: 不同的开发人员开发不同的功能或组件，按照统一的流程合并到主干。 \
        <br>&nbsp;&nbsp; 3.模块管理: 一方面，团队引用的模块应该是规范的;另一方面，必须保证这些模块可以正确的加入到最终编译好的包文件中。（以上两点可以总结为模块化或者组件化开发。） \
        <br>&nbsp;&nbsp; 4.自动化测试：为了保证和并进主干的代码达到质量标准，必须有测试，而且测试应该是自动化的，可以回归的。 \
        <br>&nbsp;&nbsp; 5.构建：主干更新以后，自动将代码编译为最终的目标格式，并且准备好各种静态资源， \
        <br>&nbsp;&nbsp; 6.部署。 将构建好的代码部署到生产环境。',
      ]
    },
    {
      title: 'package.json',
      jsCode: `{
  main: './aap.js', // 指定项目的入口脚本
  type: "module", // 空 / commonjs / module 表示解析js文件 为module模块(这样就不用 使用.mjs后缀 但是CommonJS 文件要使用.cjs后缀。其它值反过来)
  exports: {
    // exports字段的优先级高于main字段。它有多种用法。
    // package.json文件的exports字段可以指定脚本或子目录的别名。
    // 如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。 import submodule
    "./submodule": "./src/submodule.js"
    // import submodule from 'es-module-package/submodule';
    // 加载 ./node_modules/es-module-package/src/submodule.js

    ".": {
      // .这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
      "require": "./main.cjs",
      "default": "./main.js"
      // require条件指定require()命令的入口文件（即 CommonJS 的入口），default条件指定其他情况的入口（即 ES6 的入口）。
    }
  }
}`,
      desc: [
        '',
      ],
    },
    {
      title: '热更新模块 HMR',
      jsCode: ``,
      desc: [
        '利用 websocket 双向通讯的能力 获取更新并通知页面更新',
      ],
    },
    {
      title: 'webpack 4 优化点',
      jsCode: ``,
      desc: [
        '使用最新版的webpack，官方会优化模块的解析速度',
        '缩小loader的查询范围，例如：rules中loader添加：`include: path.resolve(__dirname, "src")` ',
        '使用 alias 可以更快地找到对应文件。',
        '用DllPlugin插件单独编译一些不经常改变的代码，比如node_modules的第三方库',
        '删除不需要的一些代码，利用SplitChunksPlugin 进行分块',
        'webpack-parallel-uglify-plugin: 因webpack提供的UglifyJS插件采用单线程压缩，速度很慢。所以将此插件替换为webpack-parallel-uglify-plugin插件，此插件可以并行运行UglifyJS插件，可有效减少构建时间。',
        'HappyPack: 由于运行在node.js之上的webpack是单线程模型，所以webpack做事只能一件一件去做。HappyPack可以让webpack在同一时间处理多个任务，把任务分解给多个子进程去并发执行，处理完之后将结果发给主进程',
      ],
    },
    {
      title: 'webpack 4 优化点',
      jsCode: ``,
      img: [
        '<img src="' + require('../img/filecontent.jpg') + '"/>',
      ],
      desc: [
        `打包速度优化，几乎是每一个高级以上前端工程师必备的技能。一般都是使用DllReferencePlugin或者happypack。但是往往在中后台大型系统，效果并不是很明显。难道这是Webpack的锅？其实不然

        <br>&nbsp;&nbsp; Webpack很冤
        <br>&nbsp;&nbsp; 很多人在DllReferencePlugin和happypack两板斧以后，webpack构建依然很慢，就开始吐槽webpack，吐槽js。于是搞出了其它语言的构建器去提高构建速度。但是真相是这样吗？要知道JS的执行效率可是仅次于编译型语言。而且差距也是毫秒级。
        <br>&nbsp;&nbsp; 那么到底是什么问题导致的webpack的构建会很慢呢？这当然要从Webpack在构建过程中都做什么说起。
        <br>&nbsp;&nbsp; Webpack的工作原理

        <br>&nbsp;&nbsp; 从下图中可以看到，其中resolve阶段到递归处理依赖会是一个非常漫长的过程。为什么这么说？因为loader需要去处理各种文件。将less转成css，将vue转成js，还要去匹配和导入node_modules中各种库。node_modules是一个非常庞大的代码库，几十兆甚至几百兆。
        <br>&nbsp;&nbsp; 所以，我说webpack很冤，哪怕你单纯文件读取显示这么几百兆的文件，也都要好很多时间。更何况还要处理？
        从Webpack工作原理的思考
        <br>&nbsp;&nbsp; 之所以Webpack会变慢，原因无非就是你让它做的事情有点太多了。那么，如何去优化Webpack的工作流呢？
        从Webpack工作原理引出的优化方案`,
        `大体积的第三方依赖
        <br>&nbsp;&nbsp; 在前端日常开发中，我们会用到很多第三方依赖库。但是诸如echarts，d3.js等。都是非常大的依赖。而Webpack对于这些依赖的处理往往需要花费很多时间。那么我们如何降低大体积依赖对于我们打包的影响呢？
        <br>&nbsp;&nbsp; 答案就是externals，在Webpack构建的过程中，externals中配置的依赖库不会被编译，这样，我们将项目中体积较大的库进行externals设置，那么就可以大大降低Webpack的构建耗时。
        <br>&nbsp;&nbsp; 但是可能有人会有疑问了。我都移除去构建，那我岂不是要在html模板引入很多文件？这样就增加了很多不必要的请求链接，阻塞首页渲染了。
        <br>&nbsp;&nbsp; 哈哈哈哈，针对这个问题其实早有答案alibaba/nginx-http-concat，在很早很早以前，阿里就出品了一个nginx插件。可以将请求的多个css，js文件合并下载。是不是很酷？所以，你可以在html文件加载，也可以在js异步加载随你需要。可以大大降低浏览器链接数量。`,
        `构建node_modules中的未构建模块
        <br>&nbsp;&nbsp; 在之前的公司，曾经遇到过这样的情况，内部开发的npm库居然没有构建，因此，各个项目在使用的时候，在自己工程中对引入的库进行构建。这种没必要的构建会严重拖慢webpack的构建时间。
        <br>&nbsp;&nbsp;  Webpack对于node_modules内部的文件处理和我们src中的处理是不太一样的。会多做很多工作。所以，对于node_modules中的构建要比我们项目代码耗时要长。
        <br>&nbsp;&nbsp; 所以，既然都已经发布npm库了。为啥不构建一下再发布？`,
        `style module并没有你想想的那么好
        <br>&nbsp;&nbsp; 在Vue开发的时候，很多人喜欢用module，这样就可以避免css样式冲突，非常方便。
        <br>&nbsp;&nbsp; 但是你远不知道，style module所带来的副作用要远比收益大得多。
        <br>&nbsp;&nbsp; style module会生成一个非常大的js对象在内存中。而渲染的时候，其实就是通过这个对象，动态的渲染样式。这么做的副作用就是：
        <br>&nbsp;&nbsp; 额外的内存占用。尤其是一些复杂页面，很容易引起浏览器内存不足而崩溃
        动态渲染样式，浏览器无法通过预渲染进行渲染优化。
        <br>&nbsp;&nbsp; 重排性能消耗会增加，因为是js控制样式，所以一旦引起重排。每一个节点都要重新计算。
        比如下面代码
        <br>&nbsp;&nbsp; 大家可以看到构建后的app.af304106.js中的js对象。以及app.ae7901ad.css中的样式。
        <br>&nbsp;&nbsp; 这些仅仅是在功能层面的影响，而另一个最大的影响就是Webpack的构建速度。我曾经把一个500+页面的PC系统，所有使用style module的地方都缓存纯css后，构建时间从30+分支降低到5分钟以内。这个影响还是非常恐怖的。。。。。。。`,
        `style scoped虽然。。。但是。。。
        <br>&nbsp;&nbsp; stype scoped也会影响webpack的构建。至于为什么？因为每个使用scoped的页面都要生成非常多的hash key 去设定dom属性，以及css属性选择器。在构建的时候，想一想项目中有上百万个dom节点和上百万次样式使用，然后loader在编译的时候进行上百万次hash，想想都头疼。而事实也是这样的。即非内存，由费时间。
        <br>&nbsp;&nbsp; 而目前在less，sass，scss加持下，还有必要用style scoped？`
      ],
    },
  ]
}
