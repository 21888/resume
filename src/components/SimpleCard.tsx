/**
 * Simple Achievement Card Component
 * Simplified version without framer-motion dependencies
 */

'use client';

import React, { useState, useCallback } from 'react';
import { ProjectAchievement } from '../types/project-achievement';
import { cn } from '../utils/cn';

interface SimpleCardProps {
  project: ProjectAchievement;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  className?: string;
  onClick?: (project: ProjectAchievement) => void;
}

export const SimpleCard: React.FC<SimpleCardProps> = ({
  project,
  variant = 'default',
  className,
  onClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = useCallback(() => {
    onClick?.(project);
  }, [onClick, project]);

  const handleExpandToggle = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  // Get status color
  const getStatusColor = (status: string) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      ongoing: 'bg-blue-100 text-blue-800 border-blue-200',
      paused: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      web: 'bg-purple-100 text-purple-800',
      mobile: 'bg-indigo-100 text-indigo-800',
      desktop: 'bg-cyan-100 text-cyan-800',
      api: 'bg-orange-100 text-orange-800',
      infrastructure: 'bg-gray-100 text-gray-800',
      research: 'bg-pink-100 text-pink-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const variantClasses = {
    default: 'p-6 min-h-[320px]',
    compact: 'p-4 min-h-[240px]',
    detailed: 'p-8 min-h-[400px]',
    minimal: 'p-4 min-h-[180px]',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        'cursor-pointer select-none transition-all duration-300 ease-out',
        'hover:shadow-lg hover:border-gray-300',
        variantClasses[variant],
        className
      )}
      onClick={handleClick}
      role="article"
      aria-label={`Project: ${project.title}`}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              getCategoryColor(project.category)
            )}>
              {project.category}
            </span>
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
              getStatusColor(project.status)
            )}>
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-xl line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Expand Button */}
        {variant !== 'minimal' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleExpandToggle();
            }}
            className="ml-2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
          >
            <svg
              className={cn(
                'w-5 h-5 transition-transform duration-200',
                isExpanded && 'rotate-180'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Description */}
        <p className={cn(
          'text-gray-600 leading-relaxed text-sm',
          variant === 'minimal' ? 'line-clamp-2' : 'line-clamp-3',
          isExpanded && 'line-clamp-none'
        )}>
          {project.description}
        </p>

        {/* Timeline */}
        {variant !== 'minimal' && (
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{project.timeline.startDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{project.timeline.duration}</span>
            </div>
          </div>
        )}

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, variant === 'minimal' ? 3 : 6).map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > (variant === 'minimal' ? 3 : 6) && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                +{project.technologies.length - (variant === 'minimal' ? 3 : 6)} more
              </span>
            )}
          </div>
        )}

        {/* Team */}
        {project.team.length > 0 && variant !== 'minimal' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Team</span>
              <span className="text-xs text-gray-500">{project.team.length} members</span>
            </div>
            <div className="flex -space-x-2">
              {project.team.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="relative"
                  title={`${member.name} - ${member.role}`}
                >
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              {project.team.length > 5 && (
                <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                  +{project.team.length - 5}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};