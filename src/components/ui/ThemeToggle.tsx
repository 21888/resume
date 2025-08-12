/**
 * Theme toggle button component
 */

'use client';

import { m } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';
import { MicroInteraction } from '@/components/animations';
import { ScreenReaderOnly } from '@/components/accessibility';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode, isDark } = useTheme();

  const getThemeIcon = () => {
    switch (mode) {
      case 'light':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getThemeLabel = () => {
    switch (mode) {
      case 'light':
        return '切换到深色模式';
      case 'dark':
        return '切换到系统模式';
      case 'system':
        return '切换到浅色模式';
    }
  };

  return (
    <MicroInteraction type="hover" scale={1.1}>
      <m.button
        onClick={toggleMode}
        className={`
          relative p-2 rounded-lg transition-colors duration-200
          ${isDark 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        whileTap={{ scale: 0.95 }}
        aria-label={getThemeLabel()}
        title={getThemeLabel()}
      >
        <ScreenReaderOnly>{getThemeLabel()}</ScreenReaderOnly>
        <m.div
          key={mode}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {getThemeIcon()}
        </m.div>
      </m.button>
    </MicroInteraction>
  );
};

export default ThemeToggle;