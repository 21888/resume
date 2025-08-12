/**
 * Component for role-adaptive card content
 */

'use client';

import { ReactNode } from 'react';
import { m } from 'framer-motion';
import { ContentVariant } from '@/types';
import { useContent } from './ContentProvider';

interface RoleCardProps {
  title: ContentVariant<string> | string;
  description: ContentVariant<string> | string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  hover?: boolean;
  onClick?: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  children,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  hover = true,
  onClick,
}) => {
  const { getContentWithFallback } = useContent();
  
  const cardTitle = getContentWithFallback(title, '');
  const cardDescription = getContentWithFallback(description, '');

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hover ? { scale: 1.02, y: -2 } : {},
    tap: { scale: 0.98 },
  };

  return (
    <m.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 
        ${hover ? 'cursor-pointer hover:shadow-xl' : ''} 
        transition-shadow duration-300 
        ${className}
      `}
    >
      {cardTitle && (
        <h3 className={`text-xl font-semibold text-gray-900 dark:text-white mb-3 ${titleClassName}`}>
          {cardTitle}
        </h3>
      )}
      
      {cardDescription && (
        <p className={`text-gray-600 dark:text-gray-400 leading-relaxed ${descriptionClassName}`}>
          {cardDescription}
        </p>
      )}
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </m.div>
  );
};

export default RoleCard;