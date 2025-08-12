/**
 * Safe Exports
 * Minimal exports that should work without dependency issues
 */

import React from 'react';

// Safe components (no framer-motion)
export { SimpleCard } from './components/SimpleCard';
export { SimpleContainer } from './components/SimpleContainer';

// Safe UI components
export { Badge } from './components/ui/Badge';
export { Avatar } from './components/ui/Avatar';
export { Card } from './components/ui/Card';

// Essential types
export type { ProjectAchievement } from './types/project-achievement';

// Utilities
export { cn } from './utils/cn';

// Safe example
export { MinimalExample } from './examples/MinimalExample';

// Simple context provider (if needed)
export const SafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="safe-provider">{children}</div>;
};

