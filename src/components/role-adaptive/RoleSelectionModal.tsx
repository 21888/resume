/**
 * Modal component for role selection
 */

'use client';

import { useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RoleSelectionModalProps, UserRole } from '@/types';
import { FocusManager, ScreenReaderOnly } from '@/components/accessibility';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onRoleSelect,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useKeyboardNavigation({
    onEscape: () => {
      // Prevent closing when role not selected: keep modal open
      if (onClose) {
        onClose();
      }
    },
    enabled: isOpen,
  });

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Announce modal opening to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = '角色选择对话框已打开';
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleRoleSelect = (role: UserRole) => {
    onRoleSelect(role);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Do not close modal if no role is chosen; RoleProvider will reopen if closed
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="role-modal-title"
          aria-describedby="role-modal-description"
        >
          <FocusManager isActive={isOpen} autoFocus>
            <m.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-[92vw] sm:w-full max-w-sm sm:max-w-md mx-auto sm:mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto focus:outline-none"
              tabIndex={-1}
            >
              {/* Close button for screen readers */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  aria-label="关闭对话框"
                >
                  <ScreenReaderOnly>关闭</ScreenReaderOnly>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Header */}
              <div className="px-6 py-8 text-center border-b border-gray-200 dark:border-gray-700">
                <m.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 id="role-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    欢迎访问李先生的简历
                  </h2>
                  <p id="role-modal-description" className="text-gray-600 dark:text-gray-400">
                    请选择您的身份，我们将为您展示最相关的内容
                  </p>
                </m.div>
              </div>

            {/* Role Selection Buttons */}
            <div className="px-6 py-8 space-y-4">
              <m.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('hr')}
                className="w-full p-6 text-left bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 group"
                aria-describedby="hr-role-description"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      我是 HR
                    </h3>
                    <p id="hr-role-description" className="text-sm text-gray-600 dark:text-gray-400">
                      关注团队协作、人员管理和培养能力
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </m.button>

              <m.button
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('boss')}
                className="w-full p-6 text-left bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 focus:border-purple-400 dark:focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 group"
                aria-describedby="boss-role-description"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-700 transition-colors">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      我是 Boss
                    </h3>
                    <p id="boss-role-description" className="text-sm text-gray-600 dark:text-gray-400">
                      关注业务成果、ROI 和项目交付能力
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </m.button>
            </div>

            {/* Footer */}
            <m.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-center"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                您的选择将被保存，可随时在设置中更改
              </p>
            </m.div>
            </m.div>
          </FocusManager>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default RoleSelectionModal;