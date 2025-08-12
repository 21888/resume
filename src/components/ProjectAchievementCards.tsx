/**
 * Project Achievement Cards Container
 * Main container component for displaying project achievement cards with enhanced layout
 */

'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ProjectAchievementCardsProps } from '../types/components';
import { ProjectAchievement } from '../types/project-achievement';
import { CardError } from '../types/error';
import { AchievementCard } from './AchievementCard';
import { StaggeredContainer } from './animations/StaggeredContainer';
import { AnimationProvider } from '../contexts/AnimationContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cn } from '../utils/cn';

// Loading skeleton component
const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
        >
          {/* Header skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          
          {/* Title skeleton */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />
          
          {/* Image skeleton */}
          <div className="h-48 w-full bg-gray-200 rounded-lg mb-4" />
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/6 bg-gray-200 rounded" />
          </div>
          
          {/* Technologies skeleton */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-14 bg-gray-200 rounded-full" />
          </div>
          
          {/* Team skeleton */}
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Error fallback component
const ErrorFallback: React.FC<{ 
  error: CardError; 
  onRetry?: () => void; 
  onReset?: () => void;
}> = ({ error, onRetry, onReset }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {error.userMessage || error.message || 'Failed to load project achievement cards'}
        </p>
        
        <div className="flex gap-3 justify-center">
          {onRetry && error.recoverable && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          )}
          
          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Reset
            </button>
          )}
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </m.div>
  );
};

// Empty state component
const EmptyState: React.FC = () => {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No projects found
      </h3>
      
      <p className="text-gray-600">
        There are no project achievement cards to display at the moment.
      </p>
    </m.div>
  );
};

export const ProjectAchievementCards: React.FC<ProjectAchievementCardsProps> = ({
  projects,
  initialFilter,
  initialSort,
  gridColumns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 3,
    ultrawide: 3,
  },
  showFilters = true,
  showSort = true,
  showSearch = true,
  animationDelay = 0,
  className,
  onProjectSelect,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<CardError | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState<number>(Math.min(9, projects.length));

  // Scroll animation for container
  const { ref: containerRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    delay: animationDelay,
  });

  // Reset visible count if projects list changes
  useEffect(() => {
    setVisibleCount(Math.min(9, projects.length));
  }, [projects]);

  // Handle project selection
  const handleProjectSelect = useCallback((project: ProjectAchievement) => {
    setSelectedProject(project.id);
    onProjectSelect?.(project);
  }, [onProjectSelect]);

  // Handle card expansion
  const handleCardExpand = useCallback((projectId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  }, []);

  // Handle errors
  const handleError = useCallback((error: CardError) => {
    setError(error);
    onError?.(error);
  }, [onError]);

  // Retry function
  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    
    // Simulate retry delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Reset function
  const handleReset = useCallback(() => {
    setError(null);
    setSelectedProject(null);
    setExpandedCards(new Set());
  }, []);

  // Get responsive grid classes
  const getGridClasses = useMemo(() => {
    return cn(
      'grid gap-6',
      'grid-cols-1', // mobile
      'md:grid-cols-2', // tablet
      'lg:grid-cols-3', // desktop
      'xl:grid-cols-3', // wide
      '2xl:grid-cols-3' // ultrawide
    );
  }, []);

  // Card actions
  const cardActions = useMemo(() => ({
    onCardClick: handleProjectSelect,
    onCardExpand: handleCardExpand,
    onCardHover: (project: ProjectAchievement | null) => {
      // Handle hover effects if needed
    },
    onMetricClick: (metric: any, project: ProjectAchievement) => {
      console.log('Metric clicked:', metric.label, 'in project:', project.title);
    },
    onTeamMemberClick: (member: any, project: ProjectAchievement) => {
      console.log('Team member clicked:', member.name, 'in project:', project.title);
    },
    onTechnologyClick: (technology: string, project: ProjectAchievement) => {
      console.log('Technology clicked:', technology, 'in project:', project.title);
    },
    onLinkClick: (url: string, type: string) => {
      window.open(url, '_blank', 'noopener,noreferrer');
    },
  }), [handleProjectSelect, handleCardExpand]);

  // Visible projects (pagination)
  const visibleProjects = useMemo(
    () => projects.slice(0, visibleCount),
    [projects, visibleCount]
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 6, projects.length));
  }, [projects.length]);

  // Error boundary effect
  useEffect(() => {
    const handleUnhandledError = (event: ErrorEvent) => {
      const cardError: CardError = {
        type: 'UNKNOWN_ERROR',
        message: event.message,
        severity: 'high',
        recoverable: true,
        retryCount: 0,
        maxRetries: 3,
        timestamp: new Date(),
        stack: event.error?.stack,
      };
      handleError(cardError);
    };

    window.addEventListener('error', handleUnhandledError);
    return () => window.removeEventListener('error', handleUnhandledError);
  }, [handleError]);

  // Render loading state
  if (isLoading) {
    return (
      <div className={cn('w-full', className)}>
        <LoadingSkeleton />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={cn('w-full', className)}>
        <ErrorFallback
          error={error}
          onRetry={error.recoverable ? handleRetry : undefined}
          onReset={handleReset}
        />
      </div>
    );
  }

  // Render empty state
  if (!projects || projects.length === 0) {
    return (
      <div className={cn('w-full', className)}>
        <EmptyState />
      </div>
    );
  }

  return (
    <AnimationProvider>
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className={cn('w-full', className)}
      >
        {/* Header Section */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                项目成果
              </h1>
              <p className="text-gray-600">
                展示 {projects.length} 个已完成与进行中的项目 <small>( 早年间项目未记录或不方便展示,仅展示近些年部分项目 )</small>
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div>已完成</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {projects.filter(p => p.status === 'ongoing').length}
                </div>
                <div>进行中</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {new Set(projects.flatMap(p => p.technologies.map(t => t.name))).size}
                </div>
                <div>技术栈</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          {(showFilters || showSort || showSearch) && (
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
              {showSearch && (
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {showFilters && (
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Categories</option>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    <option value="api">API</option>
                  </select>
                  
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              )}
              
              {showSort && (
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="updatedAt-desc">Recently Updated</option>
                  <option value="createdAt-desc">Recently Created</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              )}
            </div>
          )}
        </m.div>

        {/* Cards Grid */}
        <StaggeredContainer
          stagger={{
            delayChildren: 0.2,
            staggerChildren: 0.1,
            when: 'beforeChildren',
          }}
        >
          <div className={getGridClasses}>
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <m.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-full"
                >
                  <AchievementCard
                    project={project}
                    variant="default"
                    isSelected={selectedProject === project.id}
                    isExpanded={expandedCards.has(project.id)}
                    onExpand={(expanded) => {
                      if (expanded) {
                        handleCardExpand(project.id);
                      } else {
                        setExpandedCards(prev => {
                          const newSet = new Set(prev);
                          newSet.delete(project.id);
                          return newSet;
                        });
                      }
                    }}
                    actions={cardActions}
                    animationDelay={index * 0.05}
                    className="h-full"
                  />
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </StaggeredContainer>

        {/* Load More Button */}
        {visibleCount < projects.length && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Load More Projects
            </button>
          </m.div>
        )}
      </div>
    </AnimationProvider>
  );
};