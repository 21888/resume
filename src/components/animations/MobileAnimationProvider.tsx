/**
 * Mobile-optimized animation provider with reduced motion support
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useMobileOptimization } from '@/hooks/useResponsive';

interface MobileAnimationContext {
  reducedMotion: boolean;
  isMobile: boolean;
  isTouchDevice: boolean;
  getAnimationVariants: (variants: any) => any;
  getTransition: (options?: any) => any;
}

const MobileAnimationContext = createContext<MobileAnimationContext>({
  reducedMotion: false,
  isMobile: false,
  isTouchDevice: false,
  getAnimationVariants: (variants: any) => variants,
  getTransition: (options: any) => options,
});

export const useMobileAnimation = () => useContext(MobileAnimationContext);

interface MobileAnimationProviderProps {
  children: React.ReactNode;
}

export const MobileAnimationProvider: React.FC<MobileAnimationProviderProps> = ({ children }) => {
  const { reducedMotion, isMobile, isTouchDevice } = useMobileOptimization();

  const getAnimationVariants = useCallback((variants: any) => {
    if (reducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    }

    if (isMobile && variants.mobile) {
      return {
        ...variants,
        initial: variants.mobile.initial || variants.initial,
        animate: variants.mobile.animate || variants.animate,
        exit: variants.mobile.exit || variants.exit,
      };
    }

    return variants;
  }, [reducedMotion, isMobile]);

  const getTransition = useCallback((options: any = {}) => {
    const baseTransition = {
      duration: reducedMotion ? 0.1 : (isMobile ? 0.2 : 0.3),
      ease: 'easeOut',
    };

    if (isTouchDevice) {
      return {
        ...baseTransition,
        ...options,
        duration: Math.min(options.duration || 0.3, 0.2),
      };
    }

    return {
      ...baseTransition,
      ...options,
    };
  }, [reducedMotion, isMobile, isTouchDevice]);

  const contextValue: MobileAnimationContext = {
    reducedMotion,
    isMobile,
    isTouchDevice,
    getAnimationVariants,
    getTransition,
  };

  return (
    <MobileAnimationContext.Provider value={contextValue}>
      {children}
    </MobileAnimationContext.Provider>
  );
};

/**
 * Mobile-optimized animation variants
 */
export const mobileVariants = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    mobile: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
  },

  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    mobile: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 30 },
    },
  },

  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    mobile: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
  },

  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
    mobile: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
  },
};

/**
 * Touch-friendly gesture handlers
 */
export const useTouchGestures = () => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Only handle horizontal swipes if they are more horizontal than vertical
    if (absDeltaX > absDeltaY && absDeltaX > 50) {
      e.preventDefault();
      
      if (deltaX > 0) {
        return 'swipe-right';
      } else {
        return 'swipe-left';
      }
    }

    // Vertical swipes
    if (absDeltaY > absDeltaX && absDeltaY > 50) {
      e.preventDefault();
      
      if (deltaY > 0) {
        return 'swipe-down';
      } else {
        return 'swipe-up';
      }
    }

    return null;
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};