/**
 * Animation provider for managing global animation settings
 */

'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import useAppStore from '@/store/app-store';

interface AnimationContextType {
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const { reduceMotion, setReduceMotion } = useAppStore();

  useEffect(() => {
    // Check for user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    // Set initial value
    setReduceMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setReduceMotion]);

  const value = {
    reduceMotion,
    setReduceMotion,
  };

  return (
    <AnimationContext.Provider value={value}>
      <LazyMotion features={domAnimation}>
        {children}
      </LazyMotion>
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;