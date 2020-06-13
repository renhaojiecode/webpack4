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
      img: []
    },
  ]
}