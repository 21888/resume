/**
 * Zustand store types
 */

import { UserRole } from './role';
import { ThemeMode } from './theme';
import { ErrorState } from './error';

export interface AppState {
  // Role management
  role: UserRole | null;
  setRole: (role: UserRole) => void;
  resetRole: () => void;
  
  // Theme management
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  
  // UI state
  isRoleModalOpen: boolean;
  setRoleModalOpen: (open: boolean) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Content preferences
  preferredLanguage: 'zh' | 'en';
  setLanguage: (lang: 'zh' | 'en') => void;
  
  // Error state
  error: ErrorState | null;
  errorHistory: ErrorState[];
  setError: (error: ErrorState | null) => void;
  clearError: () => void;
  dismissError: (timestamp?: number) => void;
  
  // Navigation state
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // Animation preferences
  reduceMotion: boolean;
  setReduceMotion: (reduce: boolean) => void;
  
  // Accessibility preferences
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void;
}

export interface StoreSlice<T> {
  (...args: any[]): T;
}

export interface PersistConfig {
  name: string;
  storage: any;
  partialize?: (state: any) => any;
  version?: number;
  migrate?: (persistedState: any, version: number) => any;
}