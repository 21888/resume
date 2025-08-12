/**
 * Main Zustand store for application state
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AppState, UserRole, ThemeMode, ErrorState } from '@/types';

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Role management
      role: null,
      setRole: (role: UserRole) => {
        set({ role });
        // Update URL with role parameter
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.set('role', role);
          window.history.replaceState({}, '', url.toString());
        }
      },
      resetRole: () => {
        set({ role: null, isRoleModalOpen: true });
        // Remove role from URL and clear localStorage
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('role');
          window.history.replaceState({}, '', url.toString());
          
          // Force clear the role from localStorage
          localStorage.removeItem('resume-app-storage');
          window.location.reload(); // Force reload to ensure state reset
        }
      },
      switchRole: () => {
        set((state: any) => {
          const newRole = state.role === 'hr' ? 'boss' : 'hr';
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('role', newRole);
            window.history.replaceState({}, '', url.toString());
          }
          return { role: newRole };
        });
      },

      // Theme management
      theme: 'light',
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        
        // Apply theme to document
        if (typeof window !== 'undefined') {
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
      setTheme: (theme: ThemeMode) => {
        set({ theme });
        
        // Apply theme to document
        if (typeof window !== 'undefined') {
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },

      // UI state
      isRoleModalOpen: false,
      setRoleModalOpen: (open: boolean) => set({ isRoleModalOpen: open }),
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      // Content preferences
      preferredLanguage: 'zh',
      setLanguage: (lang: 'zh' | 'en') => set({ preferredLanguage: lang }),

      // Error state
      error: null,
      errorHistory: [],
      setError: (error: ErrorState | null) => {
        set((state: any) => ({
          error,
          ...(error && { errorHistory: [...state.errorHistory.slice(-9), error] })
        }));
      },
      clearError: () => set({ error: null }),
      dismissError: (timestamp?: number) => {
        set((state: any) => ({
          error: timestamp ? ((state as any).error?.timestamp === timestamp ? null : (state as any).error) : null,
          ...(timestamp && { errorHistory: (state as any).errorHistory.filter((e: ErrorState) => e.timestamp !== timestamp) })
        }));
      },

      // Navigation state
      activeSection: 'hero',
      setActiveSection: (section: string) => set({ activeSection: section }),

      // Animation preferences
      reduceMotion: false,
      setReduceMotion: (reduce: boolean) => set({ reduceMotion: reduce }),

      // Accessibility preferences
      fontSize: 'medium',
      setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => {
        set({ fontSize: size });
        // Apply font size to document
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
          switch (size) {
            case 'small':
              root.classList.add('text-sm');
              break;
            case 'medium':
              root.classList.add('text-base');
              break;
            case 'large':
              root.classList.add('text-lg');
              break;
            case 'extra-large':
              root.classList.add('text-xl');
              break;
          }
        }
      },
    }),
    {
      name: 'resume-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: any) => ({
        role: state.role,
        theme: state.theme,
        preferredLanguage: state.preferredLanguage,
        reduceMotion: state.reduceMotion,
        fontSize: state.fontSize,
      }),
    }
  )
);

export default useAppStore;