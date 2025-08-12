/**
 * Badge Component
 * Reusable badge component for status indicators, categories, and tags
 */

'use client';

import React from 'react';
import { BadgeProps } from '../../types/components';
import { cn } from '../../utils/cn';

// Badge variant styles
const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  success: 'bg-green-100 text-green-800 hover:bg-green-200',
  warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  error: 'bg-red-100 text-red-800 hover:bg-red-200',
  info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
};

// Size variants
const sizeVariants: Record<'small' | 'medium' | 'large', string> = {
  small: 'px-2 py-0.5 text-xs',
  medium: 'px-2.5 py-0.5 text-xs',
  large: 'px-3 py-1 text-sm',
};

export const Badge: React.FC<BadgeProps & { onClick?: () => void }> = ({
  children,
  variant = 'default',
  size = 'medium',
  className,
  onClick,
}) => {
  const isInteractive = Boolean(onClick);

  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center rounded-full font-medium',
        'transition-colors duration-200',
        
        // Variant styles
        badgeVariants[variant],
        
        // Size styles
        sizeVariants[size || 'medium'],
        
        // Interactive styles
        isInteractive && 'cursor-pointer',
        
        className
      )}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {children}
    </span>
  );
};