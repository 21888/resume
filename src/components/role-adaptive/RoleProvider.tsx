/**
 * Provider component for role context
 */

'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRoleDetection } from '@/hooks/useRoleDetection';
import { RoleDetectionHookReturn } from '@/types';
import RoleSelectionModal from './RoleSelectionModal';
import useAppStore from '@/store/app-store';

const RoleContext = createContext<RoleDetectionHookReturn | undefined>(undefined);

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const roleDetection = useRoleDetection();
  const { isRoleModalOpen, setRoleModalOpen, role } = useAppStore();

  // If modal is closed while role is still null, reopen to enforce selection
  useEffect(() => {
    if (!role && !isRoleModalOpen) {
      setRoleModalOpen(true);
    }
  }, [role, isRoleModalOpen, setRoleModalOpen]);

  return (
    <RoleContext.Provider value={roleDetection}>
      {children}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onRoleSelect={roleDetection.setRole}
        onClose={() => setRoleModalOpen(true)}
      />
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleDetectionHookReturn => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};