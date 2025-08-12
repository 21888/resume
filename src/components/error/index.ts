/**
 * Error handling components and utilities
 */

export { GlobalErrorBoundary } from './GlobalErrorBoundary';
export { SectionErrorBoundary } from './SectionErrorBoundary';
export { ErrorFallback } from './ErrorFallback';
export { SectionErrorFallback } from './SectionErrorFallback';
export { ErrorToastContainer, useToast } from './ErrorToast';

// Re-export recovery utilities
export { useContentRecovery, useNetworkStatus, useFallbackContent } from '@/hooks/useContentRecovery';
export { useErrorRecovery } from '@/hooks/useErrorRecovery';
export { errorLogger, createUserFriendlyMessage, isRecoverableError } from '@/utils/errorLogger';