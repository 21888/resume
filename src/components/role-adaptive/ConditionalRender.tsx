/**
 * Component for conditional rendering based on role
 */

'use client';

import { ReactNode } from 'react';
import { UserRole } from '@/types';
import { useRole } from './RoleProvider';

interface ConditionalRenderProps {
  children: ReactNode;
  showForRoles?: UserRole[];
  hideForRoles?: UserRole[];
  fallback?: ReactNode;
}

const ConditionalRender: React.FC<ConditionalRenderProps> = ({
  children,
  showForRoles,
  hideForRoles,
  fallback = null,
}) => {
  const { role } = useRole();

  if (!role) {
    return <>{fallback}</>;
  }

  // If showForRoles is specified, only show for those roles
  if (showForRoles && !showForRoles.includes(role)) {
    return <>{fallback}</>;
  }

  // If hideForRoles is specified, hide for those roles
  if (hideForRoles && hideForRoles.includes(role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ConditionalRender;