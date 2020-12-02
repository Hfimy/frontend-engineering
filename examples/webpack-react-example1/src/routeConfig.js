import { AsyncComponent, AsyncComponentHOC } from '@components/AsyncComponent';

// AsyncImport
// Magic Comments
const NotFound = () => import(/* webpackChunkName:'notfound' */ '@pages/@page/NotFound');
const PageA = () => import(/* webpackChunkName:'pagea' */ '@pages/PageA');
const PageB = () => import(/* webpackChunkName:'pageb' */ '@pages/PageB');
// add new page - @step1:
// const PageComponent = () => import(/* webpackChunkName:'pagename' */ '@pages/PageComponent');

/**
 * @desc {string}  [desc='']      - 路由描述
 * @desc {string}  [title='']     - 页面标题
 * @desc {string}  path           - 路由path
 * @desc {boolean} [exact=false]  - true:仅path与location.pathname相同时才匹配
 * @desc {boolean} [strict=false] - true:配合exact使用，规定是否匹配末尾包含反斜杠的路径
 * @desc {React.ComponentType|() => Promise<{default: React.ComponentType<any>;}>} component - 路由组件
 */
const routeConfig = [
  {
    desc: 'PageA测试页',
    title: '页面A',
    path: '/PageA',
    exact: true,
    strict: false,
    component: PageA,
  },
  {
    desc: 'PageB测试页',
    title: '页面B',
    path: '/PageB/:name',
    exact: true,
    strict: false,
    component: PageB,
  },
  // add new page - @step2:
  // {
  //   desc: '页面描述',
  //   title: '页面标题',
  //   path: '/PagePath',
  //   exact: true,
  //   strict: false,
  //   component: PageComponent,
  // },
];

// 404页面
routeConfig.push({
  desc: '404页面',
  title: '404',
  path: '/404',
  exact: true,
  strict: true,
  component: NotFound,
});

// 重写异步导入为合法的component
routeConfig.forEach(item => {
  item.desc = item.desc || '';
  item.title = item.title || '';
  item.exact = item.exact || false;
  item.strict = item.strict || false;
  item.component = AsyncComponentHOC(AsyncComponent(item.component));
});

export default routeConfig;
