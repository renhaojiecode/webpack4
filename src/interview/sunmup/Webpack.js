export default {
  title: 'Webpack API 知识点记录',
  name: '', // 暂未使用保留字段
  content: [
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