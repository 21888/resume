/**
 * Expandable Section Component
 * Reusable expandable section with smooth animations
 */

'use client';

import React, { useState, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ExpandableSectionProps } from '../../types/components';
import { cn } from '../../utils/cn';

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants = {
  collapsed: { rotate: 0 },
  expanded: { 
    rotate: 180,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  icon,
  className,
  onToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = useCallback(() => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);
  }, [isExpanded, onToggle]);

  return (
    <div className={cn('border border-gray-200 rounded-lg overflow-hidden', className)}>
      {/* Section Header */}
      <button
        onClick={handleToggle}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'bg-gray-50 hover:bg-gray-100 transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
          isExpanded && 'bg-blue-50 border-b border-gray-200'
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex-shrink-0 text-gray-600">
              {icon}
            </div>
          )}
          <h3 className="text-left font-medium text-gray-900">
            {title}
          </h3>
        </div>

        <m.div
          variants={headerVariants}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          className="flex-shrink-0 text-gray-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </m.div>
      </button>

      {/* Section Content */}
      <AnimatePresence>
        {isExpanded && (
          <m.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="p-4 bg-white">
              {children}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};