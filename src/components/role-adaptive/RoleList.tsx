/**
 * Component for displaying role-adaptive lists
 */

'use client';

import { ReactNode, ElementType } from 'react';
import { ContentVariant } from '@/types';
import { useContent } from './ContentProvider';

interface RoleListProps {
  items: ContentVariant<string[]>;
  fallback?: string[];
  className?: string;
  itemClassName?: string;
  renderItem?: (item: string, index: number) => ReactNode;
  as?: ElementType;
  itemAs?: ElementType;
}

const RoleList: React.FC<RoleListProps> = ({
  items,
  fallback = [],
  className = '',
  itemClassName = '',
  renderItem,
  as: Component = 'ul',
  itemAs: ItemComponent = 'li',
}) => {
  const { getContentWithFallback } = useContent();
  
  const listItems = getContentWithFallback(items, fallback) || [];

  return (
    <Component className={className}>
      {listItems.map((item, index) => (
        <ItemComponent key={index} className={itemClassName}>
          {renderItem ? renderItem(item, index) : item}
        </ItemComponent>
      ))}
    </Component>
  );
};

export default RoleList;