# Rollup

## 概述

**rollup 是一款`ES Modules`打包器，它的初衷很明确，本身仅提供一个高效的`ES Modules`打包器，不做其它的功能！**

- 本身的功能只是`ES Modules`模块的合并，因此默认情况下

  - 只支持加载 js 资源
  - 不做高版本语法到低版本语法的转译
  - 只支持处理相对路径的本地`ES Modules`模块，不支持`node_modules`第三方模块，不支持`CommonJS`模块

  - 其它的功能由插件支持，常用插件如

    - 处理`node_modules`第三方模块：`@rollup/plugin-node-resolve`
    - 将`CommonJS`模块转换为`ES Modules`模块：`@rollup/plugin-commonjs`（注：babel 插件要放置在 commonjs 插件前面）
    - 将高版本语法转译为目标版本的语法：`@rollup/plugin-babel`
    - 支持 ts 开发：`rollup-plugin-typescript2`
    - 配置（替换）全局常量：`@rollup/plugin-replace`、`rollup-plugin-consts`（注：replace 应放在其它插件之前，以便它们可以应用优化）
    - 处理`json`资源：`@rollup/plugin-json`
    - 生产环境代码压缩：`rollup-plugin-terser`

- 内置`tree-shaking`摇树优化，静态分析代码中的`import`，移除未使用的代码

* 支持多种格式的输出。`format:'es'|'cjs'|'iife'|'amd'|'umd'|'system'`

  - 目标环境为`Node`，建议输出为`cjs`格式。（`CommonJS`)
  - 目标环境为浏览器，使用`script`标签引入，建议输出为`iife`格式。（`Immediately-Invoked Function Expression`）
  - 目标环境为浏览器，使用`type=module`形式引入，建议输出为`es`格式。（`ES Modules`）
  - 目标环境为浏览器，配合`Require.js`使用，建议输出为`amd`格式。
  - 目标环境可能为浏览器 || `Node`，输出为`umd`格式。

* 当前已新增支持`Code Splitting`，但当输出格式为`iife`、`umd`时不支持

**以上便是 rollup 的主要概念，理解了这些基本上就可以使用 rollup 打包了，其它的高级功能按需查阅，根据实际需求去配置**

---

## 配置文件

```js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

// const formats = ['es', 'cjs', 'amd', 'iife', 'umd', 'system'];

const __ENV__ = process.env.__ENV__;
const isProd = __ENV__ === 'prod';

/** @type {import('rollup').RollupOptions}*/
const config = {
  input: 'src/index.ts',
  external: ['jquery'],
  output: [
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'libraryName', // 全局变量名称，输出格式为iife和umd格式时使用
      sourcemap: !isProd, // OutputOptions.sourcemap?: boolean | "inline" | "hidden"
      banner: '/* banner */',
      globals: {
        jquery: '$',
      },
    },
    {
      file: 'dist/bundle.es.js',
      format: 'es',
      sourcemap: !isProd,
      banner: '/* banner */',
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      sourcemap: !isProd,
      banner: '/* banner */',
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'libraryName', // 全局变量名称，输出格式为iife和umd格式时使用
      sourcemap: !isProd,
      banner: '/* banner */',
      globals: {
        jquery: '$',
      },
    },
  ],
  plugins: [
    typescript(),
    replace({
      __ENV__: JSON.stringify(__ENV__),
      __BUILD_DATE__: () => Date.now(),
    }),
    resolve(),
    commonjs(),
    json(),
    isProd && terser(),
  ],
};

export default config;
```

**npm script 命令**

```
"build:test": "__ENV__=test rollup --config rollup.config.js",

```

**注：虽然配置文件运行在 Node.js 环境下，但 rollup 会自动处理配置文件，所以默认使用 ES Modules 语法。**

### 可能遇到的实际打包场景

- 打包多个库
  - 配置文件支持导出为一个数组
- 同一个库打包多种格式的输出
  - `output`支持配置为一个数组
- 异步创建配置文件，支持导出`promise` || `promise.all`

- 标记环境变量

  1. 通过环境变量来配置差异化的打包策略，如测试环境开启 sourcemap，生产环境移除注释，开启代码压缩
  2. 用来支持不同环境打包对应环境的（库||应用）全局常量，参考 webpack.DefinePlugin

  - 通过创建不同环境的`rollup.config.{env}.js`配置文件，不建议使用
  - 传递命令行参数，通过`process.env.{param}`获取，简单方便，建议使用

    ```
    "build:test": "__ENV__=test rollup --config rollup.config.js",
    "build:prod": "__ENV__=prod rollup --config rollup.config.js"
    ```

  - rollup 配置文件支持导出 返回配置格式 的函数，可通过函数参数获取

    ```
    export default (cliArgs) => {
      const __ENV__ = cliArgs.env;
      delete cliArgs.env;
      // ...
    };
    ```

    **npm script 命令**

    ```
    "build-test": "rollup --config rollup.config.js --env test"
    ```

- 配置（替换）全局常量 `@rollup/plugin-replace`、`rollup-plugin-consts`

  ```
  /* replace 应放在其它插件之前，以便它们可以应用优化 */
  plugins: [
    replace({
      __ENV__: JSON.stringify(__ENV__),
      __BUILD_DATE__: () => Date.now(),
    }),
  ]
  ```

- **external** 设置外部依赖，这些外部依赖模块不会打包到 bundler 里

  - format 格式为 es、cjs、amd 时，外部依赖模块仍由对应的模块导入方式导入
  - format 格式为 iife、umd 时，需要配合 output.globals 使用

  ```
  external: ['jquery'],
  output: [
    {
      file: 'dist/bundle.iife.js',
      format: 'iife',
      name: 'libraryName',
      globals: {
        jquery: '$', // [externalId]: 'globalVariable'. 即外部模块ID：全局变量，依赖的外部模块将由传入的全局变量替换
      },
    },
  ```

- 使用 typescript

```
/* typescript插件放在其它plugin前面，在根目录下新建tsconfig.json配置文件 */
plugins: [
    typescript(),
]
```

- 自定义 plugin
