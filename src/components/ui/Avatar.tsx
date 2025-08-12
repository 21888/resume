/**
 * Avatar Component
 * Reusable avatar component for displaying user profile images
 */

'use client';

import React, { useState } from 'react';
import { AvatarProps } from '../../types/components';
import { cn } from '../../utils/cn';

// Size variants
const sizeVariants = {
  small: 'w-6 h-6 text-xs',
  medium: 'w-8 h-8 text-sm',
  large: 'w-12 h-12 text-base',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'medium',
  fallback,
  className,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInteractive = Boolean(onClick);

  // Generate fallback text from alt text
  const fallbackText = fallback || alt.charAt(0).toUpperCase();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center',
        'rounded-full border-2 border-white shadow-sm',
        'bg-gray-300 text-gray-600 font-medium',
        'overflow-hidden',
        
        // Size styles
        sizeVariants[size],
        
        // Interactive styles
        isInteractive && 'cursor-pointer hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        
        className
      )}
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={alt}
    >
      {src && !imageError ? (
        <>
          <img
            src={src}
            alt={alt}
            className={cn(
              'w-full h-full object-cover',
              'transition-opacity duration-200',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
          )}
        </>
      ) : (
        <span className="select-none">
          {fallbackText}
        </span>
      )}
    </div>
  );
};