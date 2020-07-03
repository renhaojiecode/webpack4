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
        '<br>&nbsp;&nbsp;>>  ',
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
        '<br>&nbsp;&nbsp;>>  ',
      ],
    },
  ]
}