'use client';

import React, { useCallback, useState } from 'react';
import { ErrorFallbackProps } from '@/types/error';
import { RefreshCw, AlertTriangle, Home, Mail, Copy, Check } from 'lucide-react';
import { createUserFriendlyMessage } from '@/utils/errorLogger';
import { AppError } from '@/types/error';

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  reset,
  title = '出现了错误',
  description = '很抱歉，应用程序遇到了问题。',
}) => {
  const [copied, setCopied] = useState(false);
  const [isReporting, setIsReporting] = useState(false);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleGoHome = useCallback(() => {
    window.location.href = '/';
  }, []);

  const handleReportError = useCallback(async () => {
    setIsReporting(true);
    
    const errorData = {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      context: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        screen: {
          width: window.screen.width,
          height: window.screen.height,
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
    };

    try {
      // Try to use clipboard API if available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }

      // Open email with error details
      const subject = encodeURIComponent('网站错误报告');
      const body = encodeURIComponent(`
错误报告:
- 错误信息: ${error.message}
- 时间: ${new Date().toLocaleString()}
- 用户代理: ${navigator.userAgent}
- 页面URL: ${window.location.href}
- 屏幕分辨率: ${window.screen.width}x${window.screen.height}
- 视口: ${window.innerWidth}x${window.innerHeight}

详细错误信息已复制到剪贴板，请粘贴到邮件正文中。

请描述您在遇到此错误之前执行的操作:
[请在此处描述]
      `);
      
      window.open(`mailto:support@example.com?subject=${subject}&body=${body}`);
    } catch (err) {
      console.error('Failed to report error:', err);
      
      // Fallback to simple email
      const subject = encodeURIComponent('网站错误报告');
      const body = encodeURIComponent(`
错误详情:
- 错误信息: ${error.message}
- 时间: ${new Date().toLocaleString()}
- 用户代理: ${navigator.userAgent}
- 页面URL: ${window.location.href}

请描述您在遇到此错误之前执行的操作:
[请在此处描述]
      `);
      window.open(`mailto:support@example.com?subject=${subject}&body=${body}`);
    } finally {
      setIsReporting(false);
    }
  }, [error]);

  const handleCopyError = useCallback(async () => {
    try {
      const errorData = {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        context: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        },
      };
      
      await navigator.clipboard.writeText(JSON.stringify(errorData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy error:', err);
    }
  }, [error]);

  const getErrorType = useCallback((error: Error): AppError => {
    const message = error.message.toLowerCase();
    if (message.includes('network') || message.includes('fetch')) return 'NETWORK_ERROR';
    if (message.includes('content')) return 'CONTENT_LOAD_FAILED';
    if (message.includes('theme')) return 'THEME_LOAD_FAILED';
    if (message.includes('storage')) return 'STORAGE_ACCESS_FAILED';
    if (message.includes('animation')) return 'ANIMATION_INIT_FAILED';
    if (message.includes('role')) return 'ROLE_DETECTION_FAILED';
    if (message.includes('validation')) return 'VALIDATION_ERROR';
    return 'UNKNOWN_ERROR';
  }, []);

  const userFriendlyMessage = createUserFriendlyMessage(getErrorType(error));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-50 dark:bg-gray-700 rounded p-3 mb-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                错误详情 (开发模式)
              </summary>
              <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap break-words">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            重试
          </button>
          
          <button
            onClick={handleRefresh}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            刷新页面
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            返回首页
          </button>
          
          <button
            onClick={handleReportError}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            报告错误
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            如果问题持续存在，请联系技术支持
          </p>
        </div>
      </div>
    </div>
  );
};