/**
 * Focus management for modal and navigation
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface FocusManagerProps {
  children: ReactNode;
  isActive: boolean;
  restoreFocus?: boolean;
  autoFocus?: boolean;
}

const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  isActive,
  restoreFocus = true,
  autoFocus = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus the container or first focusable element
      if (autoFocus && containerRef.current) {
        const firstFocusable = containerRef.current.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          containerRef.current.focus();
        }
      }

      // Trap focus within the container
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && containerRef.current) {
          const focusableElements = containerRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    } else if (restoreFocus && previousFocusRef.current) {
      // Restore focus to the previously focused element
      previousFocusRef.current.focus();
    }
  }, [isActive, autoFocus, restoreFocus]);

  return (
    <div
      ref={containerRef}
      tabIndex={isActive ? -1 : undefined}
      className={isActive ? 'focus:outline-none' : undefined}
    >
      {children}
    </div>
  );
};

export default FocusManager;