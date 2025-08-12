/**
 * Simplified Role Provider
 * 简化的角色提供者，避免复杂依赖
 */

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'hr' | 'tech_lead' | 'developer' | 'client' | null;

interface SimpleRoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isLoading: boolean;
}

const SimpleRoleContext = createContext<SimpleRoleContextType | undefined>(undefined);

interface SimpleRoleProviderProps {
  children: ReactNode;
}

export const SimpleRoleProvider: React.FC<SimpleRoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetRole = (newRole: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setRole(newRole);
      setIsLoading(false);
    }, 500);
  };

  return (
    <SimpleRoleContext.Provider value={{ role, setRole: handleSetRole, isLoading }}>
      {children}
    </SimpleRoleContext.Provider>
  );
};

export const useSimpleRole = (): SimpleRoleContextType => {
  const context = useContext(SimpleRoleContext);
  if (context === undefined) {
    throw new Error('useSimpleRole must be used within a SimpleRoleProvider');
  }
  return context;
};