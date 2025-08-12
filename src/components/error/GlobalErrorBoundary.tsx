'use client';

import React from 'react';
import { ErrorBoundaryProps, ErrorState } from '@/types/error';
import useAppStore from '@/store/app-store';
import { ErrorFallback } from './ErrorFallback';

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to store
    const errorState: ErrorState = {
      type: 'UNKNOWN_ERROR',
      message: error.message,
      recoverable: true,
      timestamp: Date.now(),
      context: {
        componentStack: errorInfo.componentStack,
        errorBoundary: 'GlobalErrorBoundary',
      },
    };

    // Update store with error
    useAppStore.getState().setError(errorState);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error Boundary caught an error:', error, errorInfo);
    }

    // In production, you might want to send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    useAppStore.getState().clearError();
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || ErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          reset={this.handleReset}
          title="应用程序遇到了问题"
          description="我们很抱歉，应用程序遇到了意外错误。请尝试刷新页面或联系技术支持。"
        />
      );
    }

    return this.props.children;
  }
}