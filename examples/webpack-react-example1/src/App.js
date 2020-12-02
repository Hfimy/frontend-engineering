import '@common/style/normalize.css';
import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RouteGuardHOC } from '@components/RouteGuard';
import ErrorBoundary from '@components/ErrorBoundary';
import routeConfig from './routeConfig';
import api from '@api'; // 引入src/api/index，将其打包至main.bundle，避免异步chunk重复打包该文件
import Toast from '@components/Toast'; // 打包至main.bundle

export default function App() {
  console.log('current:', __ENV__);
  return (
    <ErrorBoundary>
      <HashRouter>
        <Switch>
          {routeConfig.map(item => (
            <Route
              key={item.path}
              path={item.path}
              exact={item.exact}
              strict={item.strict}
              component={RouteGuardHOC(item)}
            />
          ))}
          <Redirect to='/404' />
        </Switch>
      </HashRouter>
    </ErrorBoundary>
  );
}
