/**
 * Hook for handling content loading failures with recovery mechanisms
 */

import React, { useCallback, useState, useRef } from 'react';
import useAppStore from '@/store/app-store';
import { AppError, ErrorState } from '@/types/error';
import { errorLogger } from '@/utils/errorLogger';

interface ContentRecoveryOptions {
  maxRetries?: number;
  retryDelay?: number;
  fallbackContent?: any;
  onError?: (error: Error, type: AppError) => void;
  onRecovery?: (content: any) => void;
  section?: string;
}

interface ContentRecoveryState {
  isRecovering: boolean;
  retryCount: number;
  lastError: Error | null;
  hasFallback: boolean;
  isOnline: boolean;
}

interface ContentRecoveryResult {
  handleContentError: (error: Error, type?: AppError) => void;
  recoverContent: (recoveryFn: () => Promise<any>) => Promise<any>;
  getFallbackContent: () => any;
  resetRecovery: () => void;
  state: ContentRecoveryState;
}

export const useContentRecovery = (
  options: ContentRecoveryOptions = {}
): ContentRecoveryResult => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    fallbackContent,
    onError,
    onRecovery,
    section,
  } = options;

  const { setError, clearError, dismissError } = useAppStore();
  const [state, setState] = useState<ContentRecoveryState>({
    isRecovering: false,
    retryCount: 0,
    lastError: null,
    hasFallback: !!fallbackContent,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  });

  const recoveryRef = useRef<{
    retryCount: number;
    lastRecoveryTime: number;
  }>({
    retryCount: 0,
    lastRecoveryTime: 0,
  });

  // Monitor online status
  const updateOnlineStatus = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOnline: navigator.onLine,
    }));
  }, []);

  // Add event listener for online/offline
  if (typeof window !== 'undefined') {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  const handleContentError = useCallback(
    (error: Error, type: AppError = 'CONTENT_LOAD_FAILED') => {
      const errorState: ErrorState = {
        type,
        message: error.message,
        recoverable: recoveryRef.current.retryCount < maxRetries,
        timestamp: Date.now(),
        context: {
          section,
          retryCount: recoveryRef.current.retryCount,
          maxRetries,
          isOnline: state.isOnline,
        },
      };

      setError(errorState);
      setState(prev => ({
        ...prev,
        lastError: error,
      }));

      errorLogger.logError(error, {
        type,
        section,
        retryCount: recoveryRef.current.retryCount,
        recoverable: errorState.recoverable,
      });

      onError?.(error, type);
    },
    [maxRetries, onError, section, setError, state.isOnline]
  );

  const recoverContent = useCallback(
    async (recoveryFn: () => Promise<void>): Promise<void> => {
      if (recoveryRef.current.retryCount >= maxRetries) {
        const maxRetriesError = new Error(`最大重试次数 ${maxRetries} 已用完`);
        handleContentError(maxRetriesError, 'CONTENT_LOAD_FAILED');
        return;
      }

      if (!state.isOnline) {
        const offlineError = new Error('网络连接不可用，使用离线内容');
        handleContentError(offlineError, 'NETWORK_ERROR');
        return;
      }

      setState(prev => ({
        ...prev,
        isRecovering: true,
      }));

      try {
        // Exponential backoff
        const delay = retryDelay * Math.pow(2, recoveryRef.current.retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));

        recoveryRef.current.retryCount += 1;
        recoveryRef.current.lastRecoveryTime = Date.now();

        const content = await recoveryFn();

        // Success - reset state
        setState(prev => ({
          ...prev,
          isRecovering: false,
          retryCount: 0,
          lastError: null,
        }));

        clearError();
        onRecovery?.(content);

        return content;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        handleContentError(err, 'CONTENT_LOAD_FAILED');

        setState(prev => ({
          ...prev,
          isRecovering: false,
          retryCount: recoveryRef.current.retryCount,
        }));

        return;
      }
    },
    [
      maxRetries,
      retryDelay,
      fallbackContent,
      onRecovery,
      clearError,
      handleContentError,
      state.isOnline,
    ]
  );

  const getFallbackContent = useCallback(() => {
    return fallbackContent;
  }, [fallbackContent]);

  const resetRecovery = useCallback(() => {
    recoveryRef.current = {
      retryCount: 0,
      lastRecoveryTime: 0,
    };
    setState(prev => ({
      ...prev,
      isRecovering: false,
      retryCount: 0,
      lastError: null,
    }));
    clearError();
  }, [clearError]);

  return {
    handleContentError,
    recoverContent,
    getFallbackContent,
    resetRecovery,
    state: {
      ...state,
      retryCount: recoveryRef.current.retryCount,
    },
  };
};

/**
 * Hook for handling network connectivity issues
 */
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const [wasOffline, setWasOffline] = useState(false);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setWasOffline(false);
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setWasOffline(true);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return {
    isOnline,
    wasOffline,
    isOffline: !isOnline,
  };
};

/**
 * Hook for creating fallback content based on error type
 */
export const useFallbackContent = (section?: string) => {
  const createFallbackContent = useCallback(
    (errorType: AppError, context?: Record<string, any>) => {
      const fallbacks = {
        CONTENT_LOAD_FAILED: {
          title: '内容加载失败',
          message: '无法加载此部分内容，请稍后重试',
          icon: '📄',
        },
        NETWORK_ERROR: {
          title: '网络连接问题',
          message: '请检查您的网络连接后重试',
          icon: '🌐',
        },
        ROLE_DETECTION_FAILED: {
          title: '角色识别失败',
          message: '请手动选择您的身份角色',
          icon: '👤',
        },
        ANIMATION_INIT_FAILED: {
          title: '动画加载失败',
          message: '动画效果暂时不可用，不影响核心功能',
          icon: '✨',
        },
        THEME_LOAD_FAILED: {
          title: '主题加载失败',
          message: '已使用默认主题，您可以稍后重新选择',
          icon: '🎨',
        },
        STORAGE_ACCESS_FAILED: {
          title: '存储访问失败',
          message: '您的设置可能无法保存',
          icon: '💾',
        },
        VALIDATION_ERROR: {
          title: '数据验证失败',
          message: '请检查您的输入是否正确',
          icon: '✅',
        },
        UNKNOWN_ERROR: {
          title: '未知错误',
          message: '发生了未知错误，请刷新页面重试',
          icon: '❓',
        },
      };

      return fallbacks[errorType] || fallbacks.UNKNOWN_ERROR;
    },
    []
  );

  return {
    createFallbackContent,
  };
};