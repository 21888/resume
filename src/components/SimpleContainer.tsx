/**
 * Simple Container Component
 * Simplified container without complex dependencies
 */

'use client';

import React from 'react';
import { ProjectAchievement } from '../types/project-achievement';
import { SimpleCard } from './SimpleCard';
import { cn } from '../utils/cn';

interface SimpleContainerProps {
  projects: ProjectAchievement[];
  className?: string;
  onProjectSelect?: (project: ProjectAchievement) => void;
  gridColumns?: {
    mobile: number;
    tablet: number;
    desktop: number;
    wide: number;
    ultrawide: number;
  };
}

export const SimpleContainer: React.FC<SimpleContainerProps> = ({
  projects,
  className,
  onProjectSelect,
  gridColumns = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 3,
    ultrawide: 3,
  },
}) => {
  // Handle project selection
  const handleProjectSelect = (project: ProjectAchievement) => {
    onProjectSelect?.(project);
  };

  // Get responsive grid classes
  const getGridClasses = () => {
    return cn(
      'grid gap-6',
      'grid-cols-1', // mobile
      'md:grid-cols-2', // tablet
      'lg:grid-cols-3', // desktop
      'xl:grid-cols-3', // wide
      '2xl:grid-cols-3' // ultrawide
    );
  };

  if (!projects || projects.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
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
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Project Achievements
            </h1>
            <p className="text-gray-600">
              Showcasing {projects.length} projects
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div>Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {projects.filter(p => p.status === 'ongoing').length}
              </div>
              <div>Ongoing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {new Set(projects.flatMap(p => p.technologies.map(t => t.name))).size}
              </div>
              <div>Technologies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={getGridClasses()}>
        {projects.map((project) => (
          <SimpleCard
            key={project.id}
            project={project}
            variant="default"
            onClick={handleProjectSelect}
          />
        ))}
      </div>
    </div>
  );
};