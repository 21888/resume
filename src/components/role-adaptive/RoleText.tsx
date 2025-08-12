/**
 * Component for displaying role-adaptive text content
 */

'use client';

import { ElementType } from 'react';
import { ContentVariant } from '@/types';
import { useContent } from './ContentProvider';

interface RoleTextProps {
  content: ContentVariant<string>;
  fallback?: string;
  className?: string;
  as?: ElementType;
}

const RoleText: React.FC<RoleTextProps> = ({
  content,
  fallback = '',
  className = '',
  as: Component = 'span',
}) => {
  const { getContentWithFallback } = useContent();
  
  const text = getContentWithFallback(content, fallback);

  return (
    <Component className={className}>
      {text}
    </Component>
  );
};

export default RoleText;