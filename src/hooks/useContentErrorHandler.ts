/**
 * Hook for handling content loading errors with recovery mechanisms
 */

import { useCallback, useState } from 'react';
import { useErrorRecovery } from './useErrorRecovery';
import { errorLogger } from '@/utils/errorLogger';

interface ContentErrorState {
  isLoading: boolean;
  error: Error | null;
  hasError: boolean;
}

interface UseContentErrorHandlerOptions {
  contentType: string;
  maxRetries?: number;
  retryDelay?: number;
  fallbackContent?: any;
}

export const useContentErrorHandler = (options: UseContentErrorHandlerOptions) => {
  const { contentType, fallbackContent } = options;
  const [state, setState] = useState<ContentErrorState>({
    isLoading: false,
    error: null,
    hasError: false,
  });

  const errorRecovery = useErrorRecovery({
    maxRetries: options.maxRetries || 3,
    retryDelay: options.retryDelay || 1000,
    onError: (error) => {
      errorLogger.logError(error, {
        contentType,
        action: 'content_load_failed',
      });
    },
    onRecovery: () => {
      errorLogger.logInfo(`Content recovery successful for ${contentType}`);
    },
  });

  const loadContent = useCallback(async <T>(
    loadFn: () => Promise<T>
  ): Promise<T | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null, hasError: false }));

    try {
      const content = await loadFn();
      setState(prev => ({ ...prev, isLoading: false }));
      return content;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err,
        hasError: true,
      }));

      errorRecovery.handleError(err, 'CONTENT_LOAD_FAILED');
      return null;
    }
  }, [contentType, errorRecovery]);

  const retryLoad = useCallback(async <T>(
    loadFn: () => Promise<T>
  ): Promise<T | null> => {
    const success = await errorRecovery.retry(async () => {
      await loadFn();
      setState(prev => ({
        ...prev,
        error: null,
        hasError: false,
      }));
    });

    return success ? await loadFn() : null;
  }, [errorRecovery]);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      hasError: false,
    });
    errorRecovery.reset();
  }, [errorRecovery]);

  const getFallbackContent = useCallback(() => {
    if (fallbackContent) {
      errorLogger.logInfo(`Using fallback content for ${contentType}`);
      return fallbackContent;
    }
    return null;
  }, [contentType, fallbackContent]);

  return {
    // State
    isLoading: state.isLoading,
    error: state.error,
    hasError: state.hasError,
    
    // Recovery info
    canRetry: errorRecovery.canRetry,
    retryCount: errorRecovery.retryCount,
    isRetrying: errorRecovery.isRetrying,
    
    // Actions
    loadContent,
    retryLoad,
    reset,
    getFallbackContent,
  };
};