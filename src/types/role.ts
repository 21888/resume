/**
 * Role system types for content adaptation
 */

export type UserRole = 'hr' | 'boss';

export interface RoleState {
  currentRole: UserRole | null;
  setRole: (role: UserRole) => void;
  resetRole: () => void;
}

export interface RoleSelectionModalProps {
  isOpen: boolean;
  onRoleSelect: (role: UserRole) => void;
  onClose?: () => void;
}

export interface RoleDetectionHookReturn {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
  resetRole: () => void;
}

export interface RoleAdaptiveContentProps {
  hrContent: React.ReactNode;
  bossContent: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export interface ContentVariant<T = any> {
  hr: T;
  boss: T;
}