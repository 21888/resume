'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MDXContent } from '@/lib/mdx';
import { MDXErrorBoundary, MDXLoadingSpinner, MDXErrorMessage } from '@/components/ui/MDXErrorBoundary';

interface MDXContextType {
  getContent: (section: string) => MDXContent | null;
  isLoading: (section: string) => boolean;
  getError: (section: string) => string | null;
  reloadContent: (section: string) => void;
  validateAllContent: () => Promise<ValidationResult>;
}

interface ValidationResult {
  valid: boolean;
  missing: string[];
  errors: Record<string, string>;
}

const MDXContext = createContext<MDXContextType | undefined>(undefined);

interface MDXProviderProps {
  children: React.ReactNode;
  preloadSections?: string[];
}

/**
 * MDX Provider that manages content loading, caching, and error handling
 */
export function MDXProvider({ children, preloadSections = [] }: MDXProviderProps) {
  const [contentCache, setContentCache] = useState<Record<string, MDXContent | null>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});

  // Load content for a specific section
  const loadContent = async (section: string) => {
    setLoadingStates(prev => ({ ...prev, [section]: true }));
    setErrorStates(prev => ({ ...prev, [section]: '' }));

    try {
      const response = await fetch(`/api/content/${section}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to load content');
      }

      setContentCache(prev => ({ ...prev, [section]: data.content }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorStates(prev => ({ ...prev, [section]: errorMessage }));
      setContentCache(prev => ({ ...prev, [section]: null }));
      console.error(`Failed to load content for section "${section}":`, error);
    } finally {
      setLoadingStates(prev => ({ ...prev, [section]: false }));
    }
  };

  // Preload specified sections on mount
  useEffect(() => {
    preloadSections.forEach(section => {
      if (!contentCache[section] && !loadingStates[section]) {
        loadContent(section);
      }
    });
  }, [preloadSections]);

  // Context methods
  const getContent = (section: string): MDXContent | null => {
    // Auto-load content if not already loaded or loading
    if (!contentCache[section] && !loadingStates[section] && !errorStates[section]) {
      loadContent(section);
    }
    return contentCache[section] || null;
  };

  const isLoading = (section: string): boolean => {
    return loadingStates[section] || false;
  };

  const getError = (section: string): string | null => {
    return errorStates[section] || null;
  };

  const reloadContent = (section: string) => {
    loadContent(section);
  };

  const validateAllContent = async (): Promise<ValidationResult> => {
    try {
      const response = await fetch('/api/content/validate', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        return {
          valid: data.validation.valid,
          missing: data.validation.missing,
          errors: {},
        };
      } else {
        return {
          valid: false,
          missing: [],
          errors: { validation: data.error },
        };
      }
    } catch (error) {
      return {
        valid: false,
        missing: [],
        errors: { validation: error instanceof Error ? error.message : 'Validation failed' },
      };
    }
  };

  const contextValue: MDXContextType = {
    getContent,
    isLoading,
    getError,
    reloadContent,
    validateAllContent,
  };

  return (
    <MDXContext.Provider value={contextValue}>
      <MDXErrorBoundary>
        {children}
      </MDXErrorBoundary>
    </MDXContext.Provider>
  );
}

/**
 * Hook to use MDX context
 */
export function useMDX() {
  const context = useContext(MDXContext);
  if (context === undefined) {
    throw new Error('useMDX must be used within an MDXProvider');
  }
  return context;
}

/**
 * Higher-order component for sections that need MDX content
 */
export function withMDXContent<P extends object>(
  WrappedComponent: React.ComponentType<P & { content: MDXContent | null }>,
  section: string
) {
  return function MDXContentWrapper(props: P) {
    const { getContent, isLoading, getError, reloadContent } = useMDX();
    
    const content = getContent(section);
    const loading = isLoading(section);
    const error = getError(section);

    if (loading) {
      return <MDXLoadingSpinner section={section} />;
    }

    if (error) {
      return (
        <MDXErrorMessage 
          error={error} 
          section={section} 
          onRetry={() => reloadContent(section)} 
        />
      );
    }

    return <WrappedComponent {...props} content={content} />;
  };
}

/**
 * Component for rendering MDX content with automatic loading and error handling
 */
interface MDXSectionProps {
  section: string;
  showTableOfContents?: boolean;
  className?: string;
  fallback?: React.ReactNode;
}

export function MDXSection({ 
  section, 
  showTableOfContents = false, 
  className = '',
  fallback 
}: MDXSectionProps) {
  const { getContent, isLoading, getError, reloadContent } = useMDX();
  
  const content = getContent(section);
  const loading = isLoading(section);
  const error = getError(section);

  if (loading) {
    return fallback || <MDXLoadingSpinner section={section} />;
  }

  if (error) {
    return (
      fallback || (
        <MDXErrorMessage 
          error={error} 
          section={section} 
          onRetry={() => reloadContent(section)} 
        />
      )
    );
  }

  if (!content) {
    return (
      fallback || (
        <MDXErrorMessage 
          error="Content not available" 
          section={section} 
          onRetry={() => reloadContent(section)} 
        />
      )
    );
  }

  // For now, return a placeholder since we need to handle React element serialization
  return (
    <div className={`mdx-section ${className}`}>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>MDX content for {section} section would be rendered here.</p>
        <p>Table of contents: {content.tableOfContents.length} items</p>
        {showTableOfContents && (
          <div className="mt-4">
            <h4>Table of Contents:</h4>
            <ul>
              {content.tableOfContents.map(item => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}