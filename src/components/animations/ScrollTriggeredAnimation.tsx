/**
 * Scroll-triggered animation wrapper component
 */

'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { ScrollAnimationProps, ANIMATION_VARIANTS } from '@/types';
import useAppStore from '@/store/app-store';

const ScrollTriggeredAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = '',
}) => {
  const ref = useRef(null);
  const { reduceMotion } = useAppStore();
  
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
    margin: '-50px 0px',
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = ANIMATION_VARIANTS[animation] || ANIMATION_VARIANTS.fadeIn;

  return (
    <m.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </m.div>
  );
};

export default ScrollTriggeredAnimation;