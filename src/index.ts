/**
 * Project Achievement Cards Library
 * Main export file for the complete library
 */

// Components
export * from './components';

// Types
export * from './types';

// Utilities
export * from './utils';

// Hooks
export * from './hooks';

// Contexts (avoid re-exporting names that collide with components)
export { AnimationProvider as GlobalAnimationProvider, useAnimation as useGlobalAnimation } from './contexts/AnimationContext';

// Examples (for development/documentation)
export { CompleteExample } from './examples/CompleteExample';
export { SimpleExample } from './examples/SimpleExample';
export { MinimalExample } from './examples/MinimalExample';