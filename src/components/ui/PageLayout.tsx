/**
 * Common page layout component
 */

'use client';

import { ReactNode } from 'react';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import { useResponsive } from '@/hooks/useResponsive';

interface PageLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showNavigation = true,
  className = '',
}) => {
  const { isMobile } = useResponsive();

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 ${className}`}>
      {showNavigation && (
        <>
          {!isMobile ? (
            <Navigation />
          ) : (
            <MobileNavigation />
          )}
        </>
      )}
      <main className={showNavigation && !isMobile ? 'pt-16' : ''}>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;