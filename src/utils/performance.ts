/**
 * Performance utilities for optimized rendering and animations
 */

import React, { useEffect, useRef, useCallback, useState } from 'react';

// RAF-based animation loop for 60fps
export const createAnimationLoop = () => {
  let frameId: number;
  const callbacks = new Set<(deltaTime: number) => void>();

  const loop = (now: number) => {
    const deltaTime = now - lastTime;
    lastTime = now;
    
    callbacks.forEach(callback => {
      try {
        callback(deltaTime);
      } catch (error) {
        console.error('Animation loop error:', error);
      }
    });
    
    frameId = requestAnimationFrame(loop);
  };

  let lastTime = performance.now();
  frameId = requestAnimationFrame(loop);

  return {
    add: (callback: (deltaTime: number) => void) => {
      callbacks.add(callback);
      return () => callbacks.delete(callback);
    },
    stop: () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    }
  };
};

// Throttle utility for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce utility for input and search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Intersection Observer wrapper for lazy loading
export const useIntersectionObserver = (
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isIntersecting };
};

// Performance observer for metrics
export const usePerformanceObserver = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor largest contentful paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });

    // Monitor first input delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ('processingStart' in entry) {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        }
      }
    });

    // Monitor cumulative layout shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        const perfEntry = entry as any;
        if (!perfEntry.hadRecentInput) {
          clsValue += perfEntry.value;
        }
      }
      console.log('CLS:', clsValue);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      // Handle browsers that don't support these APIs
      console.warn('Performance observer not supported:', error);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);
};

// Image preloading utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};


// Memory management for large datasets
export const useMemoryOptimization = <T>(data: T[], maxItems = 100) => {
  const [optimizedData, setOptimizedData] = useState<T[]>(data.slice(0, maxItems));

  useEffect(() => {
    if (data.length > maxItems) {
      setOptimizedData(data.slice(0, maxItems));
    } else {
      setOptimizedData(data);
    }
  }, [data, maxItems]);

  return optimizedData;
};

// Resource hints for critical resources
export const addResourceHints = () => {
  if (typeof window === 'undefined') return;

  // Preconnect to critical domains
  const preconnectUrls = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Prefetch critical resources
  const prefetchUrls = [
    '/api/content/about',
    '/api/content/skills',
    '/api/content/experience',
  ];

  prefetchUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Frame rate monitoring
export const monitorFrameRate = () => {
  let lastTime = performance.now();
  let frames = 0;
  let fps = 60;

  const updateFPS = () => {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frames * 1000) / (currentTime - lastTime));
      frames = 0;
      lastTime = currentTime;
      
      if (fps < 30) {
        console.warn('Low FPS detected:', fps);
      }
    }
    
    requestAnimationFrame(updateFPS);
  };

  requestAnimationFrame(updateFPS);
  return () => {
    // Cleanup function
  };
};