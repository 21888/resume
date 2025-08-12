/**
 * Accessibility settings panel
 */

'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import useAppStore from '@/store/app-store';
import { useTheme } from '@/components/providers/ThemeProvider';
import { MicroInteraction } from '@/components/animations';
import { ScreenReaderOnly, FocusManager } from '@/components/accessibility';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useMobileOptimization } from '@/hooks/useResponsive';

const AccessibilityPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { reduceMotion, setReduceMotion, fontSize, setFontSize } = useAppStore();
  const { mode, setMode } = useTheme();
  const { disableBodyScroll, enableBodyScroll } = useMobileOptimization();

  useKeyboardNavigation({
    onEscape: () => setIsOpen(false),
    enabled: isOpen,
  });

  const fontSizeOptions = [
    { value: 'small', label: '小', size: 'text-sm' },
    { value: 'medium', label: '中', size: 'text-base' },
    { value: 'large', label: '大', size: 'text-lg' },
    { value: 'extra-large', label: '特大', size: 'text-xl' },
  ];

  const themeOptions = [
    { value: 'light', label: '浅色模式', icon: '☀️' },
    { value: 'dark', label: '深色模式', icon: '🌙' },
    { value: 'system', label: '跟随系统', icon: '💻' },
  ];

  // Lock and unlock body scroll when panel visibility changes
  useEffect(() => {
    if (isOpen) {
      disableBodyScroll();
      return () => enableBodyScroll();
    }
    return undefined;
  }, [isOpen, disableBodyScroll, enableBodyScroll]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        // Raise z-index slightly below mobile menu FAB to avoid overlap conflicts
        className="fixed bottom-4 right-4 z-40 md:z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
        aria-label="打开无障碍设置"
        aria-expanded={isOpen}
      >
        <ScreenReaderOnly>无障碍设置</ScreenReaderOnly>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Avoid iOS Safari only showing the dim overlay by forcing stacking and transform context
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 supports-[backdrop-filter]:backdrop-blur-sm will-change-transform"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <FocusManager isActive={isOpen} autoFocus>
              <m.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="accessibility-title"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h2 id="accessibility-title" className="text-xl font-semibold text-gray-900 dark:text-white">
                    无障碍设置
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    aria-label="关闭设置面板"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Settings Content */}
                <div className="px-6 py-4 space-y-6">
                  {/* Motion Preference */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      动画偏好
                    </h3>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reduceMotion}
                        onChange={(e) => setReduceMotion(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        减少动画效果
                      </span>
                    </label>
                  </div>

                  {/* Font Size */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      字体大小
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {fontSizeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFontSize(option.value as any)}
                          className={`
                            p-3 rounded-lg border-2 transition-all duration-200
                            ${fontSize === option.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          aria-pressed={fontSize === option.value}
                        >
                          <span className={option.size}>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Selection */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      主题模式
                    </h3>
                    <div className="space-y-2">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setMode(option.value as any)}
                          className={`
                            w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3
                            ${mode === option.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                          `}
                          aria-pressed={mode === option.value}
                        >
                          <span className="text-xl" aria-hidden="true">{option.icon}</span>
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    设置将自动保存并应用到整个网站
                  </p>
                </div>
              </m.div>
            </FocusManager>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AccessibilityPanel;