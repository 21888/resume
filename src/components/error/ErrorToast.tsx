'use client';

import React, { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { ErrorState } from '@/types/error';
import useAppStore from '@/store/app-store';

interface ToastProps {
  id: string;
  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
    }
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getColorClasses()}
        border rounded-lg shadow-lg p-4 mb-3 max-w-sm w-full
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {title}
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {message}
          </p>
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const ErrorToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const { error, clearError } = useAppStore();

  useEffect(() => {
    if (error) {
      const toast: ToastProps = {
        id: `error-${Date.now()}`,
        type: 'error',
        title: '错误',
        message: error.message,
        duration: error.recoverable ? 5000 : 0, // Don't auto-dismiss non-recoverable errors
        onClose: (id) => {
          setToasts(prev => prev.filter(t => t.id !== id));
          clearError();
        },
      };

      setToasts(prev => [...prev, toast]);
    }
  }, [error, clearError]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </div>
  );
};

// Hook for programmatic toast creation
export const useToast = () => {
  const showToast = (
    type: ToastProps['type'],
    title: string,
    message: string,
    duration?: number
  ) => {
    // This would typically dispatch to a toast context or state
    // For now, we'll use the error store for error toasts
    if (type === 'error') {
      const errorState: ErrorState = {
        type: 'UNKNOWN_ERROR',
        message: `${title}: ${message}`,
        recoverable: true,
        timestamp: Date.now(),
      };
      useAppStore.getState().setError(errorState);
    }
  };

  return { showToast };
};