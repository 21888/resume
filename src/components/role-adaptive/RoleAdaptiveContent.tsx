/**
 * Component for rendering role-adaptive content
 */

'use client';

import { RoleAdaptiveContentProps } from '@/types';
import useAppStore from '@/store/app-store';

const RoleAdaptiveContent: React.FC<RoleAdaptiveContentProps> = ({
  hrContent,
  bossContent,
  fallback = null,
  className = '',
}) => {
  const { role } = useAppStore();

  // If no role is selected, show fallback or nothing
  if (!role) {
    return <div className={className}>{fallback}</div>;
  }

  // Render content based on role
  const content = role === 'hr' ? hrContent : bossContent;

  return <div className={className}>{content}</div>;
};

export default RoleAdaptiveContent;