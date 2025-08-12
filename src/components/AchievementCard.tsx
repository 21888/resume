/**
 * Achievement Card Component
 * Core component for displaying project achievement cards with responsive design
 */

'use client';

import React, { useState, useCallback } from 'react';
import { m } from 'framer-motion';
import { AchievementCardProps } from '../types/components';
import { cn } from '../utils/cn';

// Card variant styles
const cardVariants = {
  default: {
    padding: 'p-6',
    spacing: 'space-y-3',
    minHeight: 'min-h-[300px]',
  },
  compact: {
    padding: 'p-4',
    spacing: 'space-y-2.5',
    minHeight: 'min-h-[240px]',
  },
  detailed: {
    padding: 'p-8',
    spacing: 'space-y-5',
    minHeight: 'min-h-[400px]',
  },
  minimal: {
    padding: 'p-4',
    spacing: 'space-y-2',
    minHeight: 'min-h-[180px]',
  },
};

// Animation variants for the card
const cardAnimationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const AchievementCard: React.FC<AchievementCardProps> = ({
  project,
  variant = 'default',
  showMetrics = true,
  showTeam = true,
  showTimeline = true,
  showTechnologies = true,
  animationDelay = 0,
  className,
  actions,
  isSelected = false,
  isExpanded = false,
  onExpand,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get variant styles
  const variantStyles = cardVariants[variant];

  // Handle card click
  const handleCardClick = useCallback(() => {
    actions?.onCardClick?.(project);
  }, [actions, project]);

  // Handle card hover
  const handleCardHover = useCallback((hovered: boolean) => {
    setIsHovered(hovered);
    actions?.onCardHover?.(hovered ? project : null);
  }, [actions, project]);

  // Handle expand toggle
  const handleExpandToggle = useCallback(() => {
    const newExpanded = !isExpanded;
    onExpand?.(newExpanded);
  }, [isExpanded, onExpand, actions, project.id]);

  // Handle image error
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

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

  const getCategoryText = (category: string) => {
    const map: Record<string, string> = {
      web: 'web',
      mobile: '移动',
      desktop: '桌面',
      api: 'API',
      infrastructure: '基础设施',
      research: '研究',
    };
    return map[category] || category;
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      completed: '已完成',
      ongoing: '进行中',
      paused: '暂停',
      cancelled: '取消',
    };
    return map[status] || status;
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  // Get primary image
  const primaryImage = project.images?.[0];

  return (
    <m.div
      variants={cardAnimationVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      transition={{
        delay: animationDelay,
      }}
      className={cn(
        // Base styles
         'bg-white rounded-xl border border-gray-200 shadow-sm',
        'cursor-pointer select-none',
        'transition-all duration-300 ease-out',
        'h-full flex flex-col',
        
        // Hover effects
        'hover:shadow-lg hover:border-gray-300',
        
        // Selected state
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        
        // Expanded state
        isExpanded && 'shadow-xl border-gray-300',
        
        // Variant padding and spacing
        variantStyles.padding,
        variantStyles.minHeight,
        
        className
      )}
      onClick={handleCardClick}
      onMouseEnter={() => handleCardHover(true)}
      onMouseLeave={() => handleCardHover(false)}
      role="article"
      aria-label={`Project: ${project.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              getCategoryColor(project.category)
            )}>
              {getCategoryText(project.category)}
            </span>
            <span className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
              getStatusColor(project.status)
            )}>
              {getStatusText(project.status)}
            </span>
          </div>

          {/* Title */}
          <h3 className={cn(
            'font-semibold text-gray-900 line-clamp-2',
            variant === 'minimal' ? 'text-lg' : 'text-xl'
          )}>
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
            className={cn(
              'ml-2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600',
              'hover:bg-gray-100 transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
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

      {/* Project Image */}
      {variant !== 'minimal' && (
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
          {primaryImage && !imageError ? (
            <img
              src={primaryImage.thumbnail || primaryImage.url}
              alt={primaryImage.alt}
              className="w-full h-full object-cover"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 7l2 12a2 2 0 002 2h10a2 2 0 002-2l2-12M3 7l4-4h10l4 4" />
              </svg>
              <span className="text-sm">No image</span>
            </div>
          )}
        </div>
      )}

        {/* Card Content */}
        <div className={cn(variantStyles.spacing, 'flex-1')}> 
        {/* Description */}
        <div>
          <p className={cn(
            'text-gray-600 leading-relaxed',
              variant === 'minimal' ? 'text-sm line-clamp-2' : 'text-sm line-clamp-2',
            isExpanded && 'line-clamp-none'
          )}>
            {project.description}
          </p>
        </div>

        {/* Timeline */}
        {showTimeline && variant !== 'minimal' && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 min-w-0">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="whitespace-nowrap">{formatDate(project.timeline.startDate)}</span>
            </div>
            {project.timeline.endDate && (
              <>
                <span className="whitespace-nowrap">→</span>
                <span className="whitespace-nowrap">{formatDate(project.timeline.endDate)}</span>
              </>
            )}
            <div className="flex items-center gap-1 w-full sm:w-auto sm:ml-auto whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{project.timeline.duration}</span>
            </div>
          </div>
        )}

        {/* Technologies */}
          {showTechnologies && project.technologies.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, variant === 'minimal' ? 3 : 4).map((tech) => (
                <span
                  key={tech.id}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions?.onTechnologyClick?.(tech.name, project);
                  }}
                >
                  {tech.name}
                </span>
              ))}
                {project.technologies.length > (variant === 'minimal' ? 3 : 4) && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                    +{project.technologies.length - (variant === 'minimal' ? 3 : 4)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Primary Metrics */}
          {showMetrics && project.metrics.primary.length > 0 && variant !== 'minimal' && (
            <div className="grid grid-cols-2 gap-3">
            {project.metrics.primary.slice(0, 2).map((metric) => (
              <div
                key={metric.id}
                  className="p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  actions?.onMetricClick?.(metric, project);
                }}
              >
                <div className="text-[11px] text-gray-500 mb-0.5">{metric.label}</div>
                <div className="text-base font-semibold text-gray-900">
                  {typeof metric.value === 'number' 
                    ? metric.value.toLocaleString() 
                    : metric.value}
                  {metric.unit && <span className="text-xs text-gray-500 ml-1">{metric.unit}</span>}
                </div>
                {metric.trend && (
                  <div className={cn(
                    'flex items-center gap-1 text-xs mt-1',
                    metric.trend === 'up' && 'text-green-600',
                    metric.trend === 'down' && 'text-red-600',
                    metric.trend === 'neutral' && 'text-gray-500'
                  )}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {metric.trend === 'up' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                      )}
                      {metric.trend === 'down' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                      )}
                      {metric.trend === 'neutral' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" />
                      )}
                    </svg>
                    <span>
                      {metric.trend === 'up' && '上涨'}
                      {metric.trend === 'down' && '下降'}
                      {metric.trend === 'neutral' && '稳定'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Team Members */}
        {showTeam && project.team.length > 0 && variant !== 'minimal' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">团队</span>
              <span className="text-xs text-gray-500">{project.team.length} 人</span>
            </div>
            <div className="flex -space-x-2">
              {project.team.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="relative group"
                  onClick={(e) => {
                    e.stopPropagation();
                    actions?.onTeamMemberClick?.(member, project);
                  }}
                >
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform duration-200 cursor-pointer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 hover:scale-110 transition-transform duration-200 cursor-pointer">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {member.name} - {member.role}
                  </div>
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

        {/* Tags */}
        {project.tags.length > 0 && (isExpanded || variant === 'detailed') && (
          <div>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer - Links */}
      {project.links && project.links.length > 0 && (isExpanded || variant === 'detailed') && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {project.links.slice(0, 3).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  actions?.onLinkClick?.(link.url, link.type);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </m.div>
  );
};