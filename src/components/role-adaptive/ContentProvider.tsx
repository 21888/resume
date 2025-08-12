/**
 * Content provider for role-adaptive content management
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useContentAdapter } from '@/hooks/useContentAdapter';

interface ContentProviderProps {
  children: ReactNode;
}

const ContentContext = createContext<ReturnType<typeof useContentAdapter> | undefined>(undefined);

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const contentAdapter = useContentAdapter();

  return (
    <ContentContext.Provider value={contentAdapter}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};