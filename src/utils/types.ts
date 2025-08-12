/**
 * Utility types for role-based content adaptation
 */

import { UserRole, ContentVariant } from '@/types';

/**
 * Helper type to extract content based on role
 */
export type RoleContent<T> = T extends ContentVariant<infer U> ? U : T;

/**
 * Helper type to make certain properties role-adaptive
 */
export type MakeRoleAdaptive<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: ContentVariant<T[P]>;
};

/**
 * Helper type for components that need role prop
 */
export type WithRole<T = {}> = T & {
  role: UserRole;
};

/**
 * Helper type for optional role prop
 */
export type WithOptionalRole<T = {}> = T & {
  role?: UserRole;
};

/**
 * Utility function type for getting role-specific content
 */
export type ContentSelector<T> = (content: ContentVariant<T>, role: UserRole) => T;

/**
 * Type guard for checking if content is role-adaptive
 */
export type IsRoleAdaptive<T> = T extends ContentVariant<any> ? true : false;

/**
 * Helper type for creating role-specific configurations
 */
export type RoleConfig<T> = {
  [K in UserRole]: T;
};

/**
 * Type for components that can be conditionally rendered based on role
 */
export type ConditionalRoleComponent<T = {}> = T & {
  showForRoles?: UserRole[];
  hideForRoles?: UserRole[];
};

/**
 * Helper type for creating role-specific variants of components
 */
export type RoleVariant<T> = {
  [K in UserRole]?: T;
} & {
  default?: T;
};