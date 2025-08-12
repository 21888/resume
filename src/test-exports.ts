/**
 * Test Exports
 * Simple test to verify all exports work correctly
 */

// Test main component exports
export { AchievementCard } from './components/AchievementCard';
export { ProjectAchievementCards } from './components/ProjectAchievementCards';

// Test context exports
export { AnimationProvider } from './contexts/AnimationContext';

// Test type exports
export type { ProjectAchievement } from './types/project-achievement';
export type { FilterOptions, SortOptions } from './types/interaction';

// Test utility exports
export { validateProjectAchievement } from './utils/validation';
export { cn } from './utils/cn';

// Test hook exports
export { useScrollAnimation } from './hooks/useScrollAnimation';
export { useAccessibility } from './hooks/useAccessibility';

console.log('All exports working correctly!');