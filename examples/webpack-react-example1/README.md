# webpack-react-example1

---


### How to start ：
> 开发时建议统一安装VSCode插件：eslint、prettier。（已安装在vscode右下角会显示Prettier、ESLint标志）

1. 安装依赖

```
yarn  // npm install
```

2. 启动服务

```
yarn start  // npm start
```

打开 http://localhost:8080/{path} 访问

---

### 如何新增页面

1. 在`src/pages/`目录下新增页面组件

2. 在`src/routeConfig.js`里引入该页面组件，并在`routeConfig`数组里新增路由配置对象
