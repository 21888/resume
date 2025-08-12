'use client';

import React from 'react';
import { ErrorBoundaryProps, ErrorState } from '@/types/error';
import useAppStore from '@/store/app-store';
import { SectionErrorFallback } from './SectionErrorFallback';

interface SectionErrorBoundaryProps extends ErrorBoundaryProps {
  sectionName: string;
  fallbackMessage?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): SectionErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { sectionName } = this.props;
    
    // Create error state for this section
    const errorState: ErrorState = {
      type: 'CONTENT_LOAD_FAILED',
      message: `${sectionName} 部分加载失败: ${error.message}`,
      recoverable: true,
      timestamp: Date.now(),
      context: {
        section: sectionName,
        componentStack: errorInfo.componentStack,
        errorBoundary: 'SectionErrorBoundary',
      },
    };

    // Log error but don't set global error state for section errors
    // This allows other sections to continue working
    console.warn(`Section Error in ${sectionName}:`, error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In development, log more details
    if (process.env.NODE_ENV === 'development') {
      console.error(`Section "${sectionName}" Error Boundary caught an error:`, {
        error,
        errorInfo,
        errorState,
      });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || SectionErrorFallback;
      
      return (
        <FallbackComponent
          error={this.state.error}
          reset={this.handleReset}
          title={`${this.props.sectionName} 加载失败`}
          description={
            this.props.fallbackMessage ||
            `${this.props.sectionName} 部分暂时无法显示，但其他内容仍然可用。`
          }
        />
      );
    }

    return this.props.children;
  }
}