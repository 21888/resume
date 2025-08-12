/**
 * Page transition animation component
 */

'use client';

import { m, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PageTransitionProps } from '@/types';
import useAppStore from '@/store/app-store';

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => {
  const pathname = usePathname();
  const { reduceMotion } = useAppStore();

  // If user prefers reduced motion, or navigating with a hash (anchor),
  // disable page transition to avoid interfering with in-view animations.
  const hasHash = typeof window !== 'undefined' ? !!window.location.hash : false;
  if (reduceMotion || hasHash) {
    return <div className={className}>{children}</div>;
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        className={className}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
};

export default PageTransition;