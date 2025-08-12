/**
 * Hook for error recovery mechanisms
 */

import { useCallback, useState } from 'react';
import useAppStore from '@/store/app-store';
import { AppError, ErrorState } from '@/types/error';

interface UseErrorRecoveryOptions {
  maxRetries?: number;
  retryDelay?: number;
  onError?: (error: Error) => void;
  onRecovery?: () => void;
}

interface ErrorRecoveryState {
  retryCount: number;
  isRetrying: boolean;
  lastError: Error | null;
}

export const useErrorRecovery = (options: UseErrorRecoveryOptions = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onRecovery,
  } = options;

  const { setError, clearError } = useAppStore();
  const [recoveryState, setRecoveryState] = useState<ErrorRecoveryState>({
    retryCount: 0,
    isRetrying: false,
    lastError: null,
  });

  const handleError = useCallback((error: Error, type: AppError = 'UNKNOWN_ERROR') => {
    const errorState: ErrorState = {
      type,
      message: error.message,
      recoverable: recoveryState.retryCount < maxRetries,
      timestamp: Date.now(),
      context: {
        retryCount: recoveryState.retryCount,
        maxRetries,
      },
    };

    setError(errorState);
    setRecoveryState(prev => ({
      ...prev,
      lastError: error,
    }));

    onError?.(error);
  }, [recoveryState.retryCount, maxRetries, setError, onError]);

  const retry = useCallback(async (retryFn: () => Promise<void> | void) => {
    if (recoveryState.retryCount >= maxRetries) {
      console.warn('Max retries exceeded');
      return false;
    }

    setRecoveryState(prev => ({
      ...prev,
      isRetrying: true,
      retryCount: prev.retryCount + 1,
    }));

    try {
      // Add delay before retry
      if (retryDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }

      await retryFn();
      
      // Success - reset error state
      clearError();
      setRecoveryState({
        retryCount: 0,
        isRetrying: false,
        lastError: null,
      });
      
      onRecovery?.();
      return true;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      handleError(err);
      return false;
    } finally {
      setRecoveryState(prev => ({
        ...prev,
        isRetrying: false,
      }));
    }
  }, [recoveryState.retryCount, maxRetries, retryDelay, clearError, handleError, onRecovery]);

  const reset = useCallback(() => {
    clearError();
    setRecoveryState({
      retryCount: 0,
      isRetrying: false,
      lastError: null,
    });
  }, [clearError]);

  const canRetry = recoveryState.retryCount < maxRetries;

  return {
    handleError,
    retry,
    reset,
    canRetry,
    retryCount: recoveryState.retryCount,
    maxRetries,
    isRetrying: recoveryState.isRetrying,
    lastError: recoveryState.lastError,
  };
};