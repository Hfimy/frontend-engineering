import React, { useEffect } from 'react';
import { updatePageTitle } from '@common/utils';

/**
 * 路由守卫
 * @param {object} props
 * @param {Function} props.onEnter - 路由进入时触发
 * @param {Function} props.onLeave - 路由离开时触发
 * @returns {React.ComponentType}
 */
export function RouteGuard(props) {
  useEffect(() => {
    props.onEnter && props.onEnter();
    return () => {
      props.onLeave && props.onLeave();
    };
  }, []);
  return props.children;
}

/**
 * 路由守卫HOC，添加路由切换时的统一处理，如更新页面标题、PV上报等，支持传入自定义hooks；返回路由组件
 * @param {React.ComponentType} Component
 * @param {object} config
 * @returns {React.ComponentType}
 */
export function RouteGuardHOC(config) {
  const { component: Component, onEnter, onLeave, ...others } = config;
  const onEnterHandler = () => {
    console.log(`${config.path} enter`);
    updatePageTitle(config.title);
    onEnter && onEnter();
  };
  const onLeaveHandler = () => {
    onLeave && onLeave();
    console.log(`${config.path} leave`);
  };

  return props => (
    <RouteGuard onEnter={onEnterHandler} onLeave={onLeaveHandler}>
      <Component {...others} {...props} />
    </RouteGuard>
  );
}
