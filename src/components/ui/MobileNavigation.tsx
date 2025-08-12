/**
 * Mobile-first navigation component with touch-friendly interactions
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, usePathname } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useMobileOptimization } from '@/hooks/useResponsive';
import { useRole } from '@/components/role-adaptive';
import { useTheme } from '@/components/providers';
import { ThemeToggle } from '@/components/ui';
import { Menu, X, Home, User, Briefcase, Settings, Mail, BarChart3 } from 'lucide-react';

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { role } = useRole();
  const { isMobile, isTouchDevice, disableBodyScroll, enableBodyScroll } = useMobileOptimization();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navigationItems = [
    { name: '首页', href: '/home', icon: Home, section: 'hero' },
    { name: '项目成果', href: '/projects', icon: BarChart3, section: 'projects' },
    { name: '关于我', href: '/home#about', icon: User, section: 'about' },
    { name: '工作经历', href: '/home#experience', icon: Briefcase, section: 'experience' },
    { name: '技能', href: '/home#skills', icon: Settings, section: 'skills' },
    { name: '联系', href: '/home#contact', icon: Mail, section: 'contact' },
  ];

  const handleNavigation = useCallback((href: string) => {
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
        // Preserve hash so destination page handles scroll on mount
        enableBodyScroll();
        router.push(href);
      } else {
        enableBodyScroll();
        scrollWithRetry(hash);
      }
    } else {
      enableBodyScroll();
      router.push(href);
    }
    setIsMenuOpen(false);
  }, [pathname, router]);

  const toggleMenu = useCallback(() => {
    const next = !isMenuOpen;
    setIsMenuOpen(next);
    if (next) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [isMenuOpen, disableBodyScroll, enableBodyScroll]);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.section);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  // Note: outside click handled by overlay itself. No document-level listener to avoid conflicts with portal rendering.

  // Cleanup on unmount
  useEffect(() => {
    setIsMounted(true);
    return () => {
      enableBodyScroll();
    };
  }, [enableBodyScroll]);

  if (!role) return null;

  return (
    <div className={`mobile-navigation ${className || ''}`}>
      {/* Floating Action Button (portal to body to avoid transform context issues) */}
      {isMounted && createPortal(
        (
          <m.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            // Ensure this button sits above Accessibility FAB to prevent hit-area conflicts
            className="fixed bottom-20 right-6 z-[70] md:bottom-6"
          >
            <m.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              <AnimatePresence mode="wait">
                <m.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </m.div>
              </AnimatePresence>
            </m.button>
          </m.div>
        ),
        document.body
      )}

      {/* Menu Overlay */}
      {isMenuOpen && isMounted && createPortal(
        <div
          // Use high z-index and create a new stacking context for iOS Safari overlay rendering
          className="fixed inset-0 z-[60] bg-black/80 supports-[backdrop-filter]:backdrop-blur-sm will-change-transform"
          onClick={toggleMenu}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    李
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">李先生</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{role === 'hr' ? 'HR视角' : 'Boss视角'}</p>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="px-4 py-4 space-y-1 max-h-[60vh] overflow-y-auto">
              {navigationItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center space-x-4 w-full px-4 py-4 rounded-xl text-left transition-all duration-200 ${
                    activeSection === item.section
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  router.push('/');
                  setIsMenuOpen(false);
                  enableBodyScroll();
                }}
                className="flex items-center space-x-3 w-full px-4 py-4 rounded-xl text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
              >
                <Home size={20} />
                <span className="font-medium">切换身份</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MobileNavigation;