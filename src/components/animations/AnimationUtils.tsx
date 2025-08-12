/**
 * Animation utility components and helpers
 */

'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';
import useAppStore from '@/store/app-store';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
}) => {
  const { reduceMotion } = useAppStore();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export const SlideUp: React.FC<SlideUpProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 20,
  className = '',
}) => {
  const { reduceMotion } = useAppStore();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
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

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  scale = 0.8,
  className = '',
}) => {
  const { reduceMotion } = useAppStore();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, scale }}
      animate={{ opacity: 1, scale: 1 }}
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

interface FloatingProps {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  className?: string;
}

export const Floating: React.FC<FloatingProps> = ({
  children,
  amplitude = 10,
  duration = 3,
  className = '',
}) => {
  const { reduceMotion } = useAppStore();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </m.div>
  );
};

interface PulseProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  className?: string;
}

export const Pulse: React.FC<PulseProps> = ({
  children,
  scale = 1.05,
  duration = 2,
  className = '',
}) => {
  const { reduceMotion } = useAppStore();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </m.div>
  );
};