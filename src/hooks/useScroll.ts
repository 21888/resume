/**
 * Custom hook for scroll-based animations
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useScroll as useFramerScroll, useTransform, MotionValue } from 'framer-motion';

interface UseScrollOptions {
  threshold?: number;
  offset?: string[];
}

interface ScrollState {
  scrollY: number;
  scrollYProgress: number;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  hasScrolled: boolean;
}

export const useScroll = (options: UseScrollOptions = {}) => {
  const { threshold = 50, offset = ["start end", "end start"] } = options;
  const { scrollY, scrollYProgress } = useFramerScroll();
  
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollYProgress: 0,
    isScrollingUp: false,
    isScrollingDown: false,
    hasScrolled: false,
  });

  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const unsubscribeY = scrollY.on('change', (latest) => {
      const isScrollingUp = latest < lastScrollY;
      const isScrollingDown = latest > lastScrollY;
      const hasScrolled = latest > threshold;

      setScrollState(prev => ({
        ...prev,
        scrollY: latest,
        isScrollingUp,
        isScrollingDown,
        hasScrolled,
      }));

      setLastScrollY(latest);
    });

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      setScrollState(prev => ({
        ...prev,
        scrollYProgress: latest,
      }));
    });

    return () => {
      unsubscribeY();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress, lastScrollY, threshold]);

  return scrollState;
};

export const useScrollTransform = <T extends string | number>(
  inputRange: number[],
  outputRange: T[]
): MotionValue<T> => {
  const { scrollYProgress } = useFramerScroll();
  return useTransform(scrollYProgress, inputRange, outputRange);
};

export const useElementScroll = (elementRef: React.RefObject<HTMLElement>) => {
  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
    scrollProgress: 0,
  });

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
    const scrollProgress = scrollHeight > clientHeight 
      ? scrollTop / (scrollHeight - clientHeight) 
      : 0;

    setScrollState({
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollProgress,
    });
  }, [elementRef]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, elementRef]);

  return scrollState;
};

export const useScrollDirection = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return scrollDirection;
};