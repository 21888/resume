/**
 * Animation Wrapper Component
 * Wrapper component for applying consistent animations to achievement cards
 */

'use client';

import React, { useEffect, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { AnimationWrapperProps } from '../../types/components';
import { CardAnimationVariants } from '../../types/animation';
import { cn } from '../../utils/cn';

// Predefined animation variants
const animationPresets: Record<string, any> = {
  fadeIn: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  },
  slideUp: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      y: -12,
      scale: 1.03,
      boxShadow: '0 25px 30px -5px rgb(0 0 0 / 0.15), 0 10px 15px -6px rgb(0 0 0 / 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        duration: 0.1,
      },
    },
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.175, 0.885, 0.32, 1.275], // Back ease out
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: '0 30px 35px -5px rgb(0 0 0 / 0.2), 0 15px 20px -6px rgb(0 0 0 / 0.15)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  },
  slideInLeft: {
    hidden: {
      opacity: 0,
      x: -60,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      x: 4,
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  },
  slideInRight: {
    hidden: {
      opacity: 0,
      x: 60,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      x: -4,
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  },
};

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animation,
  trigger = 'mount',
  className,
  style,
  onAnimationStart,
  onAnimationComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Create a ref for intersection observer
  const ref = React.useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px',
    amount: 0.3 
  });

  // Get animation variants
  const variants = animationPresets[animation.variant] || animationPresets.fadeIn;

  // Handle animation triggers
  useEffect(() => {
    switch (trigger) {
      case 'mount':
        setIsVisible(true);
        break;
      case 'scroll':
        if (isInView && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
        break;
      case 'manual':
        // Controlled externally
        break;
      default:
        setIsVisible(true);
    }
  }, [trigger, isInView, hasAnimated]);

  // Handle reduced motion
  const getVariants = () => {
    if (shouldReduceMotion || animation.reducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.2 }
        },
        hover: { opacity: 1 },
        tap: { opacity: 1 },
      };
    }
    return variants;
  };

  // Handle animation callbacks
  const handleAnimationStart = () => {
    onAnimationStart?.();
  };

  const handleAnimationComplete = () => {
    onAnimationComplete?.();
  };

  return (
    <m.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={trigger === 'hover' ? "hover" : undefined}
      whileTap="tap"
      className={cn(className)}
      style={style}
      onAnimationStart={handleAnimationStart}
      onAnimationComplete={handleAnimationComplete}
      transition={{
        delay: animation.delay || 0,
        ...variants.visible.transition,
      }}
    >
      {children}
    </m.div>
  );
};