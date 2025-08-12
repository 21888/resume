/**
 * Hook for role detection from URL params and localStorage
 */

import { useEffect, useState } from 'react';
import useAppStore from '@/store/app-store';
import { UserRole, RoleDetectionHookReturn } from '@/types';

export const useRoleDetection = (): RoleDetectionHookReturn => {
  const { role, setRole, resetRole, setRoleModalOpen } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let safetyTimeout: ReturnType<typeof setTimeout> | null = null;

    const detectRole = () => {
      try {
        // 1) Try URL param first (client-side only)
        if (typeof window !== 'undefined') {
          const urlParams = new URLSearchParams(window.location.search);
          const urlRole = urlParams.get('role') as UserRole | null;
          
          if (urlRole && (urlRole === 'hr' || urlRole === 'boss')) {
            if (role !== urlRole) {
              setRole(urlRole);
            }
            setRoleModalOpen(false);
            setIsLoading(false);
            return;
          }

          // 2) If no URL role, try persisted role synchronously (Zustand persist)
          try {
            const raw = localStorage.getItem('resume-app-storage');
            if (raw) {
              const parsed = JSON.parse(raw) as { state?: { role?: UserRole } };
              const persistedRole = parsed?.state?.role ?? null;
              if (persistedRole && (persistedRole === 'hr' || persistedRole === 'boss')) {
                if (role !== persistedRole) {
                  setRole(persistedRole);
                }
                setRoleModalOpen(false);
                setIsLoading(false);
                return;
              }
            }
          } catch {
            // ignore JSON/localStorage errors and continue
          }
        }

        // 3) No role found → show modal
        if (!role) {
          setRoleModalOpen(true);
        } else {
          setRoleModalOpen(false);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Role detection failed:', error);
        setRoleModalOpen(true);
        setIsLoading(false);
      }
    };

    // Safety: ensure isLoading will end even if something unexpected happens
    safetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    detectRole();

    return () => {
      if (safetyTimeout) clearTimeout(safetyTimeout);
    };
  }, [role, setRole, setRoleModalOpen]);

  // Handle system theme preference for reduce motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const { setReduceMotion } = useAppStore.getState();
      
      setReduceMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setReduceMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return {
    role,
    setRole: (newRole: UserRole) => {
      setRole(newRole);
      setRoleModalOpen(false);
    },
    isLoading,
    resetRole,
  };
};