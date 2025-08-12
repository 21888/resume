/**
 * Card Header Component
 * Header section for achievement cards with title, category, status, and actions
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CardHeaderProps } from '../types/components';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

// Category icons mapping
const categoryIcons: Record<string, string> = {
  web: '🌐',
  mobile: '📱',
  desktop: '💻',
  api: '🔌',
  infrastructure: '🏗️',
  research: '🔬',
};

// Status icons mapping
const statusIcons: Record<string, string> = {
  completed: '✅',
  ongoing: '🔄',
  paused: '⏸️',
  cancelled: '❌',
};

// Category colors
const categoryColors: Record<string, string> = {
  web: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  mobile: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  desktop: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
  api: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  infrastructure: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  research: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
};

// Status colors
const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
  ongoing: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  paused: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
};

// Animation variants
const headerAnimationVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const badgeAnimationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

const titleAnimationVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  project,
  showCategory = true,
  showStatus = true,
  showActions = true,
  className,
  onTitleClick,
  onCategoryClick,
  onStatusClick,
}) => {
  // Format category display name
  const formatCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      web: 'Web App',
      mobile: 'Mobile App',
      desktop: 'Desktop App',
      api: 'API/Backend',
      infrastructure: 'Infrastructure',
      research: 'Research',
    };
    return categoryMap[category] || category;
  };

  // Format status display name
  const formatStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      completed: 'Completed',
      ongoing: 'In Progress',
      paused: 'Paused',
      cancelled: 'Cancelled',
    };
    return statusMap[status] || status;
  };

  // Handle title click
  const handleTitleClick = () => {
    onTitleClick?.(project);
  };

  // Handle category click
  const handleCategoryClick = () => {
    onCategoryClick?.(project.category);
  };

  // Handle status click
  const handleStatusClick = () => {
    onStatusClick?.(project.status);
  };

  return (
    <motion.div
      variants={headerAnimationVariants}
      initial="hidden"
      animate="visible"
      className={cn('flex items-start justify-between', className)}
    >
      <div className="flex-1 min-w-0">
        {/* Badges Row */}
        {(showCategory || showStatus) && (
          <motion.div
            className="flex items-center gap-2 mb-3"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {/* Category Badge */}
            {showCategory && (
              <motion.div variants={badgeAnimationVariants} whileHover="hover">
                <Badge
                  size="medium"
                  className={cn(
                    'cursor-pointer transition-all duration-200',
                    categoryColors[project.category] || categoryColors.web
                  )}
                  onClick={handleCategoryClick}
                >
                  <span className="mr-1.5" role="img" aria-label={project.category}>
                    {categoryIcons[project.category] || '📁'}
                  </span>
                  {formatCategory(project.category)}
                </Badge>
              </motion.div>
            )}

            {/* Status Badge */}
            {showStatus && (
              <motion.div variants={badgeAnimationVariants} whileHover="hover">
                <Badge
                  size="medium"
                  className={cn(
                    'cursor-pointer transition-all duration-200 border',
                    statusColors[project.status] || statusColors.completed
                  )}
                  onClick={handleStatusClick}
                >
                  <span className="mr-1.5" role="img" aria-label={project.status}>
                    {statusIcons[project.status] || '📋'}
                  </span>
                  {formatStatus(project.status)}
                </Badge>
              </motion.div>
            )}

            {/* Priority Indicator (if project has high priority metrics) */}
            {project.metrics.kpis.some(kpi => kpi.weight > 0.7) && (
              <motion.div variants={badgeAnimationVariants} whileHover="hover">
                <Badge
                  size="small"
                  variant="warning"
                  className="cursor-default"
                >
                  <span className="mr-1" role="img" aria-label="high priority">
                    ⭐
                  </span>
                  High Impact
                </Badge>
              </motion.div>
            )}

            {/* Team Lead Indicator */}
            {project.team.some(member => member.isLead) && (
              <motion.div variants={badgeAnimationVariants} whileHover="hover">
                <Badge
                  size="small"
                  variant="info"
                  className="cursor-default"
                >
                  <span className="mr-1" role="img" aria-label="has team lead">
                    👑
                  </span>
                  Led
                </Badge>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Project Title */}
        <motion.div variants={titleAnimationVariants}>
          <h3
            className={cn(
              'font-semibold text-gray-900 leading-tight',
              'text-xl sm:text-2xl lg:text-xl xl:text-2xl',
              'line-clamp-2 cursor-pointer',
              'hover:text-blue-600 transition-colors duration-200',
              'focus:outline-none focus:text-blue-600',
              onTitleClick && 'hover:underline'
            )}
            onClick={handleTitleClick}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && onTitleClick) {
                e.preventDefault();
                handleTitleClick();
              }
            }}
            tabIndex={onTitleClick ? 0 : undefined}
            role={onTitleClick ? 'button' : undefined}
            aria-label={`Project title: ${project.title}`}
          >
            {project.title}
          </h3>
        </motion.div>

        {/* Project Subtitle/Meta Info */}
        <motion.div
          className="mt-2 flex items-center gap-3 text-sm text-gray-500"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                delay: 0.3,
              },
            },
          }}
        >
          {/* Creation Date */}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
              }).format(project.createdAt)}
            </span>
          </div>

          {/* Team Size */}
          {project.team.length > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <span>
                  {project.team.length} {project.team.length === 1 ? 'member' : 'members'}
                </span>
              </div>
            </>
          )}

          {/* Technology Count */}
          {project.technologies.length > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <span>
                  {project.technologies.length} {project.technologies.length === 1 ? 'tech' : 'techs'}
                </span>
              </div>
            </>
          )}

          {/* Last Updated */}
          {project.updatedAt.getTime() !== project.createdAt.getTime() && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>
                  Updated{' '}
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                  }).format(project.updatedAt)}
                </span>
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <motion.div
          className="ml-4 flex items-center gap-2"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.4,
                delay: 0.4,
              },
            },
          }}
        >
          {/* Bookmark Button */}
          <motion.button
            className={cn(
              'p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Bookmark project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </motion.button>

          {/* Share Button */}
          <motion.button
            className={cn(
              'p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Share project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
          </motion.button>

          {/* More Options Button */}
          <motion.button
            className={cn(
              'p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="More options"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};