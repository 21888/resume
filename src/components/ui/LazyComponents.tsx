/**
 * Lazy-loaded components for code splitting
 */

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with loading states
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
);

// Lazy load heavy components
export const LazyHeroSection = dynamic(
  () => import('@/components/sections/HeroSection').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

export const LazyAboutSection = dynamic(
  () => import('@/components/sections/AboutSection').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

export const LazyExperienceSection = dynamic(
  () => import('@/components/sections/ExperienceSection').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

export const LazySkillsSection = dynamic(
  () => import('@/components/sections/SkillsSection').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

export const LazySalarySection = dynamic(
  () => import('@/components/sections/SalarySection').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

export const LazyContactSection = dynamic(
  () => import('@/components/sections/ContactSection').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

// Lazy load chart components - import individual components
export const LazyLineChart = dynamic(
  () => import('react-chartjs-2').then(mod => ({ default: mod.Line })),
  { 
    loading: LoadingSpinner,
    ssr: false
  }
);

export const LazyBarChart = dynamic(
  () => import('react-chartjs-2').then(mod => ({ default: mod.Bar })),
  { 
    loading: LoadingSpinner,
    ssr: false
  }
);

export const LazyDoughnutChart = dynamic(
  () => import('react-chartjs-2').then(mod => ({ default: mod.Doughnut })),
  { 
    loading: LoadingSpinner,
    ssr: false
  }
);

// Lazy load animation components
export const LazyAnimationProvider = dynamic(
  () => import('@/components/animations/AnimationProvider').then(mod => ({ default: mod.default })),
  { 
    loading: () => <div />,
    ssr: false
  }
);

export const LazyMobileAnimationProvider = dynamic(
  () => import('@/components/animations/MobileAnimationProvider').then(mod => ({ default: mod.MobileAnimationProvider })),
  { 
    loading: () => <div />,
    ssr: false
  }
);

// Lazy load accessibility components
export const LazyAccessibilityPanel = dynamic(
  () => import('@/components/accessibility/AccessibilityPanel').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

// Route-based code splitting
export const LazyHomePage = dynamic(
  () => import('@/app/home/page').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

export const LazyExperienceDetailPage = dynamic(
  () => import('@/app/experience/[id]/page').then(mod => mod.default),
  { 
    loading: LoadingSpinner,
    ssr: true
  }
);

// Create a wrapper component that handles loading states
interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback,
  minHeight = '200px'
}) => {
  return (
    <React.Suspense
      fallback={
        fallback || (
          <div 
            className="flex items-center justify-center" 
            style={{ minHeight }}
          >
            <LoadingSpinner />
          </div>
        )
      }
    >
      {children}
    </React.Suspense>
  );
};

// Hook for lazy loading heavy components
export const useLazyComponent = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  options?: { threshold?: number; rootMargin?: string }
) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          try {
            const { default: LoadedComponent } = await importFunc();
            setComponent(() => LoadedComponent);
          } catch (error) {
            console.error('Failed to load component:', error);
          }
          observer.disconnect();
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [importFunc, options]);

  return { ref, Component };
};

// Preload critical components
export const preloadComponents = async () => {
  const components = [
    () => import('@/components/sections/HeroSection'),
    () => import('@/components/ui/Navigation'),
    () => import('@/components/ui/PageLayout'),
  ];

  try {
    await Promise.all(components.map(importFunc => importFunc()));
  } catch (error) {
    console.warn('Failed to preload components:', error);
  }
};