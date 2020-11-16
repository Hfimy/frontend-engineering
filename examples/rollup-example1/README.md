# Rollup

## 概述

**rollup 是一款`ES Modules`打包器，它的初衷很明确，本身仅提供一个高效的`ES Modules`打包器，不做其它的功能！**

- 本身的功能只是`ES Modules`模块的合并，因此默认情况下
  - 不做高版本语法到低版本语法的转译
  - 只支持处理相对路径的本地`ES Modules`模块，不支持`node_modules`第三方模块，不支持`CommonJS`模块
  - 不支持加载其它类型的资源
  - 其它的功能由插件支持，常用插件如
    - 将高版本语法转译为目标版本的语法：`@rollup/plugin-babel`
    - 处理`node_modules`第三方模块：`@rollup/plugin-node-resolve`
    - 将`CommonJS`模块转换为`ES Modules`模块：`@rollup/plugin-commonjs`
    - 处理`json`资源：`@rollup/plugin-json`
    - 支持 ts 开发：`@rollup/plugin-typescript`
    - 生产环境移除注释：
    - 生产环境代码压缩：`rollup-plugin-terser`
    - 配置全局常量：
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

```
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
    name:'libName', // 输出格式为iife和umd格式时使用
    sourcemap:false , // OutputOptions.sourcemap?: boolean | "inline" | "hidden"
  },
  plugins:[]
}
```

```
rollup --config rollup.config.js
```

**虽然配置文件运行在 Node.js 环境下，但 rollup 会自动处理配置文件，所以默认使用 ES Modules 语法。**

### 可能遇到的实际打包场景

- 打包多个库
  - 配置文件支持导出为一个数组
- 同一个库打包多个格式的输出
  - `output`支持配置为一个数组
- 支持异步创建配置文件，导出`promise` || `promise.all`

- 环境变量

- 全局变量 `@rollup/plugin-replace`、`rollup-plugin-consts`

- 移除 node_modules
