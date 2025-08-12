/**
 * Theme provider for dark/light mode
 */

'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import useAppStore from '@/store/app-store';
import { ThemeState } from '@/types';

const ThemeContext = createContext<ThemeState | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme, toggleTheme } = useAppStore();

  // Apply theme to document on mount and theme change
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        const root = document.documentElement;
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      };
      
      // Set initial theme based on system preference
      handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent);
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const themeState: ThemeState = {
    mode: theme,
    setMode: setTheme,
    toggleMode: toggleTheme,
    isDark: theme === 'dark' || (theme === 'system' && 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-color-scheme: dark)').matches),
  };

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeState => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};