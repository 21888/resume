/**
 * Animation system types for Framer Motion
 */

import { Variants } from 'framer-motion';

export type AnimationVariants = Variants;

// Variants used by AnimationWrapper presets
export type CardAnimationVariants = Record<string, AnimationVariants> | AnimationVariants;

export interface ScrollAnimationConfig {
  threshold: number;
  rootMargin: string;
  triggerOnce: boolean;
}

export interface ScrollAnimationProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'slideDown' | 'scaleIn' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export interface CustomCursorProps {
  variant: 'default' | 'hover' | 'click';
  size?: number;
  color?: string;
}

export interface StaggerAnimationProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'slideDown' | 'scaleIn';
  className?: string;
}

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export interface MicroInteractionProps {
  children: React.ReactNode;
  type: 'hover' | 'tap' | 'focus';
  scale?: number;
  duration?: number;
  className?: string;
}

// Public animation config for cards (consumed by config.ts)
export interface CardAnimationConfig {
  variant: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'slideDown' | 'scaleIn' | 'stagger';
  duration: number;
  delay?: number;
  ease?: string;
  reducedMotion?: boolean;
  stagger?: {
    delayChildren?: number;
    staggerChildren?: number;
    when?: 'beforeChildren' | 'afterChildren';
  };
}

// Predefined animation variants
export const ANIMATION_VARIANTS: Record<string, AnimationVariants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  },
};