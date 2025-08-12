/**
 * Base Card Component
 * Reusable card wrapper component with consistent styling
 */

'use client';

import React from 'react';
import { m } from 'framer-motion';
import { CardProps } from '../../types/components';
import { cn } from '../../utils/cn';

// Card variant styles
const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm',
  outlined: 'bg-white border-2 border-gray-300 shadow-none',
  elevated: 'bg-white border-0 shadow-lg',
  flat: 'bg-gray-50 border-0 shadow-none',
};

// Padding variants
const paddingVariants: Record<'none' | 'small' | 'medium' | 'large', string> = {
  none: '',
  small: 'p-4',
  medium: 'p-6',
  large: 'p-8',
};

export const Card: React.FC<CardProps & { onClick?: () => void; onHover?: (hovered: boolean) => void }> = ({
  children,
  variant = 'default',
  padding = 'medium',
  className,
  onClick,
  onHover,
}) => {
  const isInteractive = Boolean(onClick);

  return (
    <m.div
      className={cn(
        // Base styles
        'rounded-xl transition-all duration-300 ease-out',
        
        // Variant styles
        cardVariants[variant],
        
        // Padding
        paddingVariants[padding || 'medium'],
        
        // Interactive styles
        isInteractive && 'cursor-pointer select-none hover:shadow-lg hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        
        className
      )}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      whileHover={isInteractive ? { y: -2 } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
    >
      {children}
    </m.div>
  );
};