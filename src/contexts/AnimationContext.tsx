/**
 * Animation Context for managing global animation settings
 */

'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnimationContextType {
  isAnimationEnabled: boolean;
  setAnimationEnabled: (enabled: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [isAnimationEnabled, setAnimationEnabled] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  const value = {
    isAnimationEnabled,
    setAnimationEnabled,
    animationSpeed,
    setAnimationSpeed,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}