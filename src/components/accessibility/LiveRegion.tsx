/**
 * Live region for announcing dynamic content changes
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface LiveRegionProps {
  children: ReactNode;
  politeness?: 'polite' | 'assertive' | 'off';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text' | 'additions removals' | 'removals additions' | 'removals text' | 'text additions' | 'text removals';
  className?: string;
}

const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  politeness = 'polite',
  atomic = false,
  relevant = 'additions text',
  className = '',
}) => {
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the live region is properly announced
    if (regionRef.current && children) {
      // Force a re-announcement by briefly clearing and restoring content
      const originalContent = regionRef.current.innerHTML;
      regionRef.current.innerHTML = '';
      setTimeout(() => {
        if (regionRef.current) {
          regionRef.current.innerHTML = originalContent;
        }
      }, 10);
    }
  }, [children]);

  return (
    <div
      ref={regionRef}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={`sr-only ${className}`}
    >
      {children}
    </div>
  );
};

export default LiveRegion;