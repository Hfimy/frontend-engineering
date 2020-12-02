import React, { lazy, Suspense } from 'react';
import ErrorBoundary from '@components/ErrorBoundary';
import Loading from '@pages/@page/LoadingPage';

/**
 * 异步组件，处理异步导入，返回异步组件
 * @param {() => Promise<{default: React.ComponentType<any>;}>} factory
 * @returns {React.LazyExoticComponent<React.ComponentType<any>>}
 */
export function AsyncComponent(factory) {
  return lazy(factory);
}

/**
 * 异步组件HOC，处理异步组件，返回组件
 * @param {React.LazyExoticComponent<React.ComponentType<any>>} AsyncComponent
 * @returns {React.ComponentType}
 */
export function AsyncComponentHOC(AsyncComponent) {
  return props => (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <AsyncComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
