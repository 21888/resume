/**
 * Responsive design utilities for mobile optimization
 */

import { useState, useEffect, useCallback } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeScreen: boolean;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  touch: boolean;
  reducedMotion: boolean;
}

interface ResponsiveCallbacks {
  handleResize: () => void;
  handleOrientationChange: () => void;
  isBreakpoint: (breakpoint: string) => boolean;
}

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useResponsive = (): ResponsiveState & ResponsiveCallbacks => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeScreen: false,
    screenSize: 'xs',
    width: 0,
    height: 0,
    orientation: 'portrait',
    touch: false,
    reducedMotion: false,
  });

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'landscape' : 'portrait';
    
    let screenSize: ResponsiveState['screenSize'] = 'xs';
    if (width >= BREAKPOINTS['2xl']) screenSize = '2xl';
    else if (width >= BREAKPOINTS.xl) screenSize = 'xl';
    else if (width >= BREAKPOINTS.lg) screenSize = 'lg';
    else if (width >= BREAKPOINTS.md) screenSize = 'md';
    else if (width >= BREAKPOINTS.sm) screenSize = 'sm';

    setState({
      isMobile: width < BREAKPOINTS.md,
      isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg,
      isDesktop: width >= BREAKPOINTS.lg,
      isLargeScreen: width >= BREAKPOINTS.xl,
      screenSize,
      width,
      height,
      orientation,
      touch: 'ontouchstart' in window,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  const handleOrientationChange = useCallback(() => {
    handleResize();
  }, [handleResize]);

  const isBreakpoint = useCallback((breakpoint: string) => {
    const value = BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS];
    return state.width >= value;
  }, [state.width]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize();

    // Handle resize
    window.addEventListener('resize', handleResize);
    
    // Handle orientation change
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle media query changes for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [handleResize, handleOrientationChange]);

  return {
    ...state,
    handleResize,
    handleOrientationChange,
    isBreakpoint,
  };
};

/**
 * Hook for mobile-specific optimizations
 */
export const useMobileOptimization = () => {
  const responsive = useResponsive();
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [supportsTouchAction, setSupportsTouchAction] = useState(false);
  
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
    setSupportsTouchAction('touchAction' in document.body.style);
  }, []);

  const disableBodyScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    // Persist scroll position on body dataset so we can restore later
    (document.body as any).dataset.scrollY = String(currentScrollY);

    // Prevent both vertical and horizontal scroll while keeping visual position
    document.body.style.overflowY = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100vw';
    // Reduce rubber-banding on supported browsers
    (document.body.style as any).overscrollBehavior = 'none';
  }, []);

  const enableBodyScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const stored = (document.body as any).dataset.scrollY;
    const previousScrollY = stored ? parseInt(stored, 10) : 0;

    // Reset styles
    document.body.style.overflowY = '';
    document.body.style.overflowX = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    (document.body.style as any).overscrollBehavior = '';
    delete (document.body as any).dataset.scrollY;

    // Restore scroll position
    if (previousScrollY > 0) {
      window.scrollTo(0, previousScrollY);
    }
  }, []);

  const preventZoom = useCallback((element: HTMLElement) => {
    if (!isTouchDevice) return;

    const preventDoubleTap = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    element.addEventListener('touchstart', preventDoubleTap, { passive: false });
    element.addEventListener('touchmove', preventPinch, { passive: false });

    return () => {
      element.removeEventListener('touchstart', preventDoubleTap);
      element.removeEventListener('touchmove', preventPinch);
    };
  }, [isTouchDevice]);

  return {
    ...responsive,
    isTouchDevice,
    supportsTouchAction,
    disableBodyScroll,
    enableBodyScroll,
    preventZoom,
  };
};

/**
 * Hook for viewport-based rendering
 */
export const useViewport = () => {
  const responsive = useResponsive();
  
  const isInViewport = useCallback((element: HTMLElement, offset = 0) => {
    if (typeof window === 'undefined') return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= offset &&
      rect.left >= offset &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) - offset
    );
  }, []);

  return {
    ...responsive,
    isInViewport,
  };
};