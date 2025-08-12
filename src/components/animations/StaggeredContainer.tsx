/**
 * Staggered Container Component
 * Provides staggered animation effects for child elements
 */

'use client';

import React from 'react';
import { m } from 'framer-motion';
import { StaggerAnimationProps } from '@/types/components';

export const StaggeredContainer: React.FC<StaggerAnimationProps> = ({
  children,
  stagger = {
    delayChildren: 0,
    staggerChildren: 0.1,
    when: 'beforeChildren',
  },
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: stagger.delayChildren,
        staggerChildren: stagger.staggerChildren,
        when: stagger.when,
      },
    },
  };

  return (
    <m.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </m.div>
  );
};