'use client';

import React from 'react';
import { ErrorFallbackProps } from '@/types/error';
import { RefreshCw, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SectionErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  reset,
  title = '部分内容加载失败',
  description = '这个部分暂时无法显示，但其他内容仍然可用。',
}) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="w-full bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-6 my-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
            {title}
          </h3>
          
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={reset}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors duration-200"
            >
              <RefreshCw className="w-3 h-3" />
              重试加载
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-medium rounded transition-colors duration-200"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="w-3 h-3" />
                    隐藏详情
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3" />
                    显示详情
                  </>
                )}
              </button>
            )}
          </div>
          
          {process.env.NODE_ENV === 'development' && showDetails && (
            <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/20 rounded border">
              <h4 className="text-xs font-medium text-red-800 dark:text-red-200 mb-2">
                错误详情 (开发模式)
              </h4>
              <pre className="text-xs text-red-700 dark:text-red-300 whitespace-pre-wrap break-words overflow-auto max-h-32">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};