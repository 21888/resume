/**
 * Animation components exports
 */

export { default as ScrollTriggeredAnimation } from './ScrollTriggeredAnimation';
export { default as StaggerAnimation } from './StaggerAnimation';
export { default as MicroInteraction } from './MicroInteraction';
export { default as CustomCursor } from './CustomCursor';
export { default as PageTransition } from './PageTransition';
export { default as AnimationProvider, useAnimation } from './AnimationProvider';

// Animation utility components
export { FadeIn, SlideUp, ScaleIn, Floating, Pulse } from './AnimationUtils';

// Re-export animation hooks
export { useScroll, useScrollTransform, useElementScroll, useScrollDirection } from '@/hooks/useScroll';