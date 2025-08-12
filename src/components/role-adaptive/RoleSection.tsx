/**
 * Component for role-adaptive section content
 */

'use client';

import { ReactNode } from 'react';
import { m } from 'framer-motion';
import { ContentVariant } from '@/types';
import { useContent } from './ContentProvider';

interface RoleSectionProps {
  title: ContentVariant<string> | string;
  subtitle?: ContentVariant<string> | string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  id?: string;
  background?: 'default' | 'gradient' | 'muted';
}

const RoleSection: React.FC<RoleSectionProps> = ({
  title,
  subtitle,
  children,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  contentClassName = '',
  id,
  background = 'default',
}) => {
  const { getContentWithFallback } = useContent();
  
  const sectionTitle = getContentWithFallback(title, '');
  const sectionSubtitle = subtitle ? getContentWithFallback(subtitle, '') : '';

  const backgroundClasses = {
    default: 'bg-white dark:bg-gray-900',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900',
    muted: 'bg-gray-50 dark:bg-gray-800',
  };

  return (
    <section 
      id={id}
      className={`py-16 scroll-mt-24 md:scroll-mt-28 ${backgroundClasses[background]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(sectionTitle || sectionSubtitle) && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {sectionTitle && (
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 ${titleClassName}`}>
                {sectionTitle}
              </h2>
            )}
            
            {sectionSubtitle && (
              <p className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ${subtitleClassName}`}>
                {sectionSubtitle}
              </p>
            )}
          </m.div>
        )}
        
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default RoleSection;