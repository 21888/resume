/**
 * Optimized motion components with performance optimizations
 */

'use client';

import { m, useAnimation, useReducedMotion } from 'framer-motion';
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { throttle } from '@/utils/performance';

interface OptimizedMotionProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: any;
  onAnimationComplete?: () => void;
  onViewportEnter?: () => void;
  onViewportLeave?: () => void;
}

// Optimized motion.div with reduced re-renders
export const OptimizedMotionDiv: React.FC<OptimizedMotionProps> = ({
  children,
  className,
  variants,
  initial,
  animate,
  exit,
  transition,
  whileHover,
  whileTap,
  whileInView,
  viewport,
  onAnimationComplete,
  onViewportEnter,
  onViewportLeave,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const animationControls = useAnimation();
  const elementRef = useRef<HTMLDivElement>(null);

  // Optimize transitions for reduced motion
  const optimizedTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        ...transition,
      };

  // Memoized animation start
  const startAnimation = useCallback(async () => {
    if (shouldReduceMotion) {
      animationControls.set(animate);
      return;
    }

    if (animate) {
      await animationControls.start(animate, optimizedTransition);
    }
  }, [animate, animationControls, optimizedTransition, shouldReduceMotion]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  return (
    <m.div
      ref={elementRef}
      className={className}
      variants={shouldReduceMotion ? { visible: {} } : variants}
      initial={shouldReduceMotion ? false : initial}
      animate={animationControls}
      exit={shouldReduceMotion ? false : exit}
      transition={optimizedTransition}
      whileHover={shouldReduceMotion ? undefined : whileHover}
      whileTap={shouldReduceMotion ? undefined : whileTap}
      whileInView={shouldReduceMotion ? undefined : whileInView}
      viewport={{
        once: true,
        amount: 0.3,
        ...viewport,
      }}
      onAnimationComplete={onAnimationComplete}
      onViewportEnter={onViewportEnter}
      onViewportLeave={onViewportLeave}
    >
      {children}
    </m.div>
  );
};

// Lazy-loaded motion component
export const LazyMotionDiv: React.FC<OptimizedMotionProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible) {
    return <div ref={ref} className={props.className} />;
  }

  return <OptimizedMotionDiv {...props} />;
};

// Performance-optimized stagger container
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
      },
    },
  };

  return (
    <m.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {React.Children.map(children, (child, index) => (
        <m.div key={index} variants={itemVariants}>
          {child}
        </m.div>
      ))}
    </m.div>
  );
};

// Optimized scroll-triggered animation
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return {};
    
    switch (direction) {
      case 'up': return { opacity: 0, y: 50 };
      case 'down': return { opacity: 0, y: -50 };
      case 'left': return { opacity: 0, x: 50 };
      case 'right': return { opacity: 0, x: -50 };
      default: return { opacity: 0, y: 50 };
    }
  };

  const getAnimatePosition = () => ({
    opacity: 1,
    x: 0,
    y: 0,
  });

  return (
    <m.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : duration,
        delay: shouldReduceMotion ? 0 : delay,
      }}
    >
      {children}
    </m.div>
  );
};

// Performance-optimized parallax effect
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  className,
  offset = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [y, setY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    throttle(() => {
      if (!ref.current || shouldReduceMotion) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress = (scrollY - elementTop + windowHeight) / (windowHeight + elementHeight);
      const newY = offset + (scrollProgress - 0.5) * speed * 100;

      setY(newY);
    }, 16),
    [speed, offset, shouldReduceMotion]
  );

  useEffect(() => {
    if (shouldReduceMotion) return;

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ y }}
      initial={{ y: 0 }}
      animate={{ y }}
      transition={{ duration: 0.016, ease: 'linear' }}
    >
      {children}
    </m.div>
  );
};