/**
 * Error logging utilities
 */

import { AppError, ErrorState } from '@/types/error';

interface LogEntry {
  timestamp: number;
  level: 'error' | 'warn' | 'info';
  message: string;
  context?: Record<string, any>;
  error?: Error;
}

class ErrorLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  /**
   * Log an error with context
   */
  logError(error: Error, context?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'error',
      message: error.message,
      context,
      error,
    };

    this.addLog(entry);

    // Console logging based on environment
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', {
        message: error.message,
        stack: error.stack,
        context,
      });
    }

    // In production, you might want to send to external service
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(entry);
    }
  }

  /**
   * Log a warning
   */
  logWarning(message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'warn',
      message,
      context,
    };

    this.addLog(entry);

    if (process.env.NODE_ENV === 'development') {
      console.warn('Warning logged:', { message, context });
    }
  }

  /**
   * Log info message
   */
  logInfo(message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level: 'info',
      message,
      context,
    };

    this.addLog(entry);

    if (process.env.NODE_ENV === 'development') {
      console.info('Info logged:', { message, context });
    }
  }

  /**
   * Log error state from store
   */
  logErrorState(errorState: ErrorState) {
    this.logError(new Error(errorState.message), {
      type: errorState.type,
      recoverable: errorState.recoverable,
      timestamp: errorState.timestamp,
      ...errorState.context,
    });
  }

  /**
   * Get recent logs
   */
  getLogs(limit?: number): LogEntry[] {
    const logs = [...this.logs].reverse();
    return limit ? logs.slice(0, limit) : logs;
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: LogEntry['level']): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify({
      exportTime: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      logs: this.logs,
    }, null, 2);
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private sendToExternalService(entry: LogEntry) {
    // Placeholder for external error reporting service
    // Example: Sentry, LogRocket, etc.
    
    try {
      // Example implementation:
      // if (window.Sentry) {
      //   window.Sentry.captureException(entry.error || new Error(entry.message), {
      //     extra: entry.context,
      //     level: entry.level,
      //   });
      // }
      
      // For now, just store in localStorage for debugging
      if (typeof window !== 'undefined') {
        const existingLogs = localStorage.getItem('error-logs');
        const logs = existingLogs ? JSON.parse(existingLogs) : [];
        logs.push(entry);
        
        // Keep only last 50 logs in localStorage
        const recentLogs = logs.slice(-50);
        localStorage.setItem('error-logs', JSON.stringify(recentLogs));
      }
    } catch (error) {
      console.error('Failed to send error to external service:', error);
    }
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

/**
 * Helper function to create user-friendly error messages
 */
export const createUserFriendlyMessage = (error: AppError): string => {
  const messages: Record<AppError, string> = {
    ROLE_DETECTION_FAILED: '角色检测失败，请重新选择您的身份',
    CONTENT_LOAD_FAILED: '内容加载失败，请稍后重试',
    ANIMATION_INIT_FAILED: '动画初始化失败，页面功能不受影响',
    THEME_LOAD_FAILED: '主题加载失败，已使用默认主题',
    STORAGE_ACCESS_FAILED: '本地存储访问失败，设置可能无法保存',
    NETWORK_ERROR: '网络连接出现问题，请检查您的网络连接',
    VALIDATION_ERROR: '输入验证失败，请检查您的输入',
    UNKNOWN_ERROR: '发生了未知错误，请刷新页面重试',
  };

  return messages[error] || messages.UNKNOWN_ERROR;
};

/**
 * Helper function to determine if an error is recoverable
 */
export const isRecoverableError = (error: AppError): boolean => {
  const recoverableErrors: AppError[] = [
    'CONTENT_LOAD_FAILED',
    'NETWORK_ERROR',
    'STORAGE_ACCESS_FAILED',
    'THEME_LOAD_FAILED',
  ];

  return recoverableErrors.includes(error);
};