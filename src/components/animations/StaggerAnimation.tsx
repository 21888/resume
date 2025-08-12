/**
 * Stagger animation component for animating lists and groups
 */

'use client';

import { useRef } from 'react';
import { m, useInView } from 'framer-motion';
import { StaggerAnimationProps, ANIMATION_VARIANTS } from '@/types';
import useAppStore from '@/store/app-store';

const StaggerAnimation: React.FC<StaggerAnimationProps> = ({
  children,
  staggerDelay = 0.1,
  animation = 'fadeIn',
  className = '',
}) => {
  const ref = useRef(null);
  const { reduceMotion } = useAppStore();
  
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true,
    margin: '-50px 0px',
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = ANIMATION_VARIANTS[animation] || ANIMATION_VARIANTS.fadeIn;

  return (
    <m.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children.map((child, index) => (
        <m.div
          key={index}
          variants={itemVariants}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  );
};

export default StaggerAnimation;