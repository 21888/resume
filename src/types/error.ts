/**
 * Error handling type definitions
 */

// General error categories used in lower-level utilities
export type ErrorType =
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'SERVER_ERROR'
  | 'DATA_LOAD_FAILED'
  | 'UNKNOWN_ERROR';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface CardError {
  type: ErrorType;
  message: string;
  userMessage?: string;
  severity: ErrorSeverity;
  recoverable: boolean;
  retryCount: number;
  maxRetries: number;
  timestamp: Date;
  stack?: string;
  context?: Record<string, any>;
}

// High-level app error codes used by UI and store
export type AppError =
  | 'ROLE_DETECTION_FAILED'
  | 'CONTENT_LOAD_FAILED'
  | 'ANIMATION_INIT_FAILED'
  | 'THEME_LOAD_FAILED'
  | 'STORAGE_ACCESS_FAILED'
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export interface ErrorState {
  type: AppError;
  message: string;
  recoverable: boolean;
  timestamp: number;
  context?: Record<string, any>;
}

export interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
  title?: string;
  description?: string;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

// Specific error shapes
export interface DataLoadError extends CardError {
  type: 'DATA_LOAD_FAILED';
  source: 'api' | 'file' | 'cache' | 'localStorage';
  endpoint?: string;
  statusCode?: number;
  responseBody?: string;
}

export interface ApiError extends CardError {
  endpoint?: string;
  statusCode?: number;
  responseBody?: string;
}

// Higher-level validation error used in loaders (distinct from utility ValidationError)
export interface ValidationError extends CardError {
  field?: string;
  rule?: string;
}

export interface ErrorHandlerOptions {
  captureStack?: boolean;
  report?: boolean;
  userMessageMap?: Record<AppError, string>;
}