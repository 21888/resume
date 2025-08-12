/**
 * Utility functions for role-based content management
 */

import { UserRole, ContentVariant } from '@/types';

/**
 * Get content based on user role
 */
export const getRoleContent = <T>(
  content: ContentVariant<T>,
  role: UserRole
): T => {
  return content[role];
};

/**
 * Check if content is role-adaptive
 */
export const isRoleAdaptive = (content: any): content is ContentVariant<any> => {
  return (
    typeof content === 'object' &&
    content !== null &&
    'hr' in content &&
    'boss' in content
  );
};

/**
 * Get role-specific content with fallback
 */
export const getRoleContentWithFallback = <T>(
  content: ContentVariant<T> | T,
  role: UserRole,
  fallback?: T
): T => {
  if (isRoleAdaptive(content)) {
    return getRoleContent(content, role);
  }
  
  if (content !== undefined && content !== null) {
    return content as T;
  }
  
  return fallback as T;
};

/**
 * Transform array of items with role-adaptive content
 */
export const transformRoleAdaptiveArray = <T extends Record<string, any>>(
  items: T[],
  role: UserRole
): T[] => {
  return items.map(item => {
    const transformed = { ...item } as T;
    
    Object.keys(item).forEach(key => {
      if (isRoleAdaptive(item[key])) {
        (transformed as any)[key] = getRoleContent(item[key], role);
      }
    });
    
    return transformed;
  });
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const roleNames = {
    hr: 'HR',
    boss: 'Boss',
  };
  
  return roleNames[role];
};

/**
 * Get role description
 */
export const getRoleDescription = (role: UserRole): string => {
  const descriptions = {
    hr: '关注团队协作、人员管理和培养能力',
    boss: '关注业务成果、ROI 和项目交付能力',
  };
  
  return descriptions[role];
};

/**
 * Validate role value
 */
export const isValidRole = (role: string): role is UserRole => {
  return role === 'hr' || role === 'boss';
};

/**
 * Get role from URL or storage
 */
export const getRoleFromUrl = (): UserRole | null => {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  
  return roleParam && isValidRole(roleParam) ? roleParam : null;
};

/**
 * Set role in URL
 */
export const setRoleInUrl = (role: UserRole): void => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  url.searchParams.set('role', role);
  window.history.replaceState({}, '', url.toString());
};

/**
 * Remove role from URL
 */
export const removeRoleFromUrl = (): void => {
  if (typeof window === 'undefined') return;
  
  const url = new URL(window.location.href);
  url.searchParams.delete('role');
  window.history.replaceState({}, '', url.toString());
};