/**
 * Screen reader only content component
 */

'use client';

import { ReactNode, ElementType } from 'react';

interface ScreenReaderOnlyProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({
  children,
  as: Component = 'span',
  className = '',
}) => {
  return (
    <Component className={`sr-only ${className}`}>
      {children}
    </Component>
  );
};

export default ScreenReaderOnly;