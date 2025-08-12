/**
 * Simple Animation Provider
 * 简化的动画提供者，使用 CSS 动画而不是 framer-motion
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SimpleAnimationContextType {
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
  isAnimationEnabled: boolean;
}

const SimpleAnimationContext = createContext<SimpleAnimationContextType | undefined>(undefined);

interface SimpleAnimationProviderProps {
  children: ReactNode;
}

export const SimpleAnimationProvider: React.FC<SimpleAnimationProviderProps> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 检查用户的动画偏好 - 只在客户端执行
  const isAnimationEnabled = !reduceMotion && isClient && 
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <SimpleAnimationContext.Provider value={{
      reduceMotion,
      setReduceMotion,
      isAnimationEnabled
    }}>
      <div className={isClient && isAnimationEnabled ? 'animations-enabled' : 'animations-disabled'}>
        {children}
      </div>
    </SimpleAnimationContext.Provider>
  );
};

export const useSimpleAnimation = (): SimpleAnimationContextType => {
  const context = useContext(SimpleAnimationContext);
  if (context === undefined) {
    throw new Error('useSimpleAnimation must be used within a SimpleAnimationProvider');
  }
  return context;
};