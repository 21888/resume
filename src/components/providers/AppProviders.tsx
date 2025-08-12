/**
 * Main providers wrapper for the application
 */

'use client';

import { ReactNode, useEffect } from 'react';
import { RoleProvider, ContentProvider } from '@/components/role-adaptive';
import { ThemeProvider } from './ThemeProvider';
import { ErrorBoundary } from './ErrorBoundary';
import { CustomCursor, AnimationProvider } from '@/components/animations';
import { ErrorToastContainer } from '@/components/error';
import { registerServiceWorker, monitorCache } from '@/lib/cache';
import { usePerformanceObserver, addResourceHints } from '@/utils/performance';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  usePerformanceObserver();

  useEffect(() => {
    // Register service worker for offline support
    registerServiceWorker();
    
    
    // Add performance resource hints
    addResourceHints();
    
    // Monitor cache performance in development
    if (process.env.NODE_ENV === 'development') {
      monitorCache();
    }
  }, []);

  return (
    <ErrorBoundary>
      <AnimationProvider>
        <ThemeProvider>
          <RoleProvider>
            <ContentProvider>
              {children}
              <CustomCursor variant="default" />
              <ErrorToastContainer />
            </ContentProvider>
          </RoleProvider>
        </ThemeProvider>
      </AnimationProvider>
    </ErrorBoundary>
  );
};