/**
 * Main navigation component
 */

'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useRole } from '@/components/role-adaptive';
import { useTheme } from '@/components/providers';
import { ThemeToggle } from '@/components/ui';
import useAppStore from '@/store/app-store';
import { useMobileOptimization, useResponsive } from '@/hooks/useResponsive';

const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { role } = useRole();
  const { isDark, toggleMode } = useTheme();
  const { isMobile, isTablet } = useResponsive();
  const { disableBodyScroll, enableBodyScroll } = useMobileOptimization();
  const { resetRole } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile dropdown menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      disableBodyScroll();
      return () => enableBodyScroll();
    }
    return undefined;
  }, [isMobileMenuOpen, disableBodyScroll, enableBodyScroll]);

  // Ensure hooks are not called conditionally by initializing mount state before any early returns
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigationItems = [
    { name: '首页', href: '/home', icon: '🏠' },
    { name: '项目成果', href: '/projects', icon: '📊' },
    { name: '关于', href: '/home#about', icon: '👨‍💻' },
    { name: '经历', href: '/home#experience', icon: '💼' },
    { name: '技能', href: '/home#skills', icon: '🚀' },
    { name: '联系', href: '/home#contact', icon: '📞' },
  ];

  const handleNavigation = (href: string) => {
    const scrollWithRetry = (hash: string) => {
      let attempts = 0;
      const maxAttempts = 20;
      const tryScroll = () => {
        const element = document.getElementById(hash);
        if (element) {
          const navOffset = 80;
          const rect = element.getBoundingClientRect();
          const targetTop = rect.top + window.pageYOffset - navOffset;
          window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });

          const nudge = () => window.dispatchEvent(new Event('scroll'));
          requestAnimationFrame(nudge);
          setTimeout(nudge, 120);
          setTimeout(() => window.scrollBy({ top: 2, behavior: 'auto' }), 140);
          setTimeout(() => window.scrollBy({ top: -2, behavior: 'auto' }), 180);
          setTimeout(nudge, 280);
        } else if (attempts < maxAttempts) {
          attempts += 1;
          setTimeout(tryScroll, 120);
        } else {
          if (hash && window.location.hash.replace('#', '') !== hash) {
            window.location.hash = `#${hash}`;
          }
        }
      };
      requestAnimationFrame(tryScroll);
    };

    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (pathname !== path) {
        // Preserve hash in URL so destination page can also handle scrolling
        router.push(href);
      } else {
        scrollWithRetry(hash);
      }
    } else {
      router.push(href);
    }
    setIsMobileMenuOpen(false);
  };

  if (!role) {
    return null;
  }

  const nav = (
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <m.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push('/home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">李</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              李先生
            </span>
          </m.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navigationItems.map((item) => (
              <m.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.href)}
                className="flex items-center space-x-1 xl:space-x-2 px-2 py-2 xl:px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm lg:text-base"
              >
                <span className="text-sm">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </m.button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Role Indicator */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <div className={`w-2 h-2 rounded-full ${
                  role === 'hr' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  {role === 'hr' ? 'HR视角' : 'Boss视角'}
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Role Switch */}
            {!isMobile && !isTablet && (
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const { setRole, role: currentRole } = useAppStore.getState();
                  setRole(currentRole === 'hr' ? 'boss' : 'hr');
                  window.location.reload();
                }}
                className="hidden xl:block px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                切换身份
              </m.button>
            )}

            {/* Mobile Menu Button */}
            <m.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="打开菜单"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </m.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <m.button
                  key={item.name}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </m.button>
              ))}
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    const { setRole, role: currentRole } = useAppStore.getState();
                    setRole(currentRole === 'hr' ? 'boss' : 'hr');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <span>🔄</span>
                  <span className="font-medium">切换身份</span>
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  );

  // Render nav at body level to avoid being affected by transform wrappers (e.g., page transitions)
  return isMounted ? createPortal(nav, document.body) : nav;
};

export default Navigation;