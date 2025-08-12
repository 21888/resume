/**
 * Hook for adapting content based on user role
 */

import { useMemo } from 'react';
import { useRole } from '@/components/role-adaptive';
import { ContentVariant, UserRole } from '@/types';
import { getRoleContent, getRoleContentWithFallback, isRoleAdaptive } from '@/utils/role';

export const useContentAdapter = () => {
  const { role } = useRole();

  const adaptContent = useMemo(() => {
    return {
      /**
       * Get role-specific content from a ContentVariant
       */
      getContent: <T>(content: ContentVariant<T>): T | null => {
        if (!role) return null;
        return getRoleContent(content, role);
      },

      /**
       * Get role-specific content with fallback
       */
      getContentWithFallback: <T>(
        content: ContentVariant<T> | T,
        fallback?: T
      ): T | null => {
        if (!role) return fallback || null;
        return getRoleContentWithFallback(content, role, fallback);
      },

      /**
       * Check if content is role-adaptive
       */
      isAdaptive: isRoleAdaptive,

      /**
       * Transform an object with role-adaptive properties
       */
      transformObject: <T extends Record<string, any>>(obj: T): T => {
        if (!role) return obj;
        
        const transformed = { ...obj } as T;
        
        Object.keys(obj).forEach(key => {
          if (isRoleAdaptive(obj[key])) {
            (transformed as any)[key] = getRoleContent(obj[key], role);
          }
        });
        
        return transformed;
      },

      /**
       * Transform an array of objects with role-adaptive properties
       */
      transformArray: <T extends Record<string, any>>(items: T[]): T[] => {
        if (!role) return items;
        
        return items.map(item => {
          const transformed = { ...item } as T;
          
          Object.keys(item).forEach(key => {
            if (isRoleAdaptive(item[key])) {
              (transformed as any)[key] = getRoleContent(item[key], role);
            }
          });
          
          return transformed;
        });
      },

      /**
       * Get role-specific class names
       */
      getRoleClass: (baseClass: string, roleClasses?: ContentVariant<string>): string => {
        if (!role || !roleClasses) return baseClass;
        const roleClass = getRoleContent(roleClasses, role);
        return `${baseClass} ${roleClass}`;
      },

      /**
       * Get role-specific styles
       */
      getRoleStyle: (baseStyle: React.CSSProperties, roleStyles?: ContentVariant<React.CSSProperties>): React.CSSProperties => {
        if (!role || !roleStyles) return baseStyle;
        const roleStyle = getRoleContent(roleStyles, role);
        return { ...baseStyle, ...roleStyle };
      },

      /**
       * Current role
       */
      currentRole: role,

      /**
       * Check if current role matches
       */
      isRole: (targetRole: UserRole): boolean => role === targetRole,

      /**
       * Check if current role is HR
       */
      isHR: role === 'hr',

      /**
       * Check if current role is Boss
       */
      isBoss: role === 'boss',
    };
  }, [role]);

  return adaptContent;
};