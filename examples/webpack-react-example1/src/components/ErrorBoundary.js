import React from 'react';
import ErrorPage from '@pages/@page/ErrorPage';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    console.error('ErrorBounday:', error);
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
