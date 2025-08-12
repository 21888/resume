/**
 * Card Content Component
 * Content section for achievement cards with description and technology display
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContentProps } from '../types/components';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

// Technology category colors
const technologyColors: Record<string, string> = {
  frontend: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  backend: 'bg-green-100 text-green-800 hover:bg-green-200',
  database: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  tool: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  platform: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
};

// Technology category icons
const technologyIcons: Record<string, string> = {
  frontend: '🎨',
  backend: '⚙️',
  database: '🗄️',
  tool: '🔧',
  platform: '☁️',
};

// Animation variants
const contentAnimationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const descriptionAnimationVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const technologyAnimationVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
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

const expandButtonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export const CardContent: React.FC<CardContentProps> = ({
  project,
  maxLines = 3,
  showExpandButton = true,
  showTechnologies = true,
  maxTechnologies = 6,
  className,
  onExpandClick,
  onTechnologyClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);

  // Check if description needs truncation
  const needsTruncation = project.description.length > 200 || project.description.split('\n').length > maxLines;
  
  // Get truncated description
  const getTruncatedDescription = useCallback(() => {
    if (!needsTruncation || isExpanded) {
      return project.description;
    }
    
    const words = project.description.split(' ');
    if (words.length <= 30) {
      return project.description;
    }
    
    return words.slice(0, 30).join(' ') + '...';
  }, [project.description, needsTruncation, isExpanded]);

  // Handle expand/collapse
  const handleExpandToggle = useCallback(() => {
    setIsExpanded(!isExpanded);
    onExpandClick?.();
  }, [isExpanded, onExpandClick]);

  // Handle technology click
  const handleTechnologyClick = useCallback((technology: any) => {
    onTechnologyClick?.(technology);
  }, [onTechnologyClick]);

  // Handle show all technologies
  const handleShowAllTechnologies = useCallback(() => {
    setShowAllTechnologies(!showAllTechnologies);
  }, [showAllTechnologies]);

  // Get visible technologies
  const visibleTechnologies = showAllTechnologies 
    ? project.technologies 
    : project.technologies.slice(0, maxTechnologies);

  const hiddenTechnologiesCount = Math.max(0, project.technologies.length - maxTechnologies);

  return (
    <motion.div
      variants={contentAnimationVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-4', className)}
    >
      {/* Description Section */}
      <div className="space-y-3">
        <motion.div
          className="relative"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? 'expanded' : 'collapsed'}
              variants={descriptionAnimationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'text-gray-600 leading-relaxed text-sm',
                !isExpanded && `line-clamp-${maxLines}`,
                'transition-colors duration-200'
              )}
            >
              {getTruncatedDescription()}
            </motion.p>
          </AnimatePresence>

          {/* Expand/Collapse Button */}
          {needsTruncation && showExpandButton && (
            <motion.button
              variants={expandButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={handleExpandToggle}
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                'text-blue-600 hover:text-blue-700',
                'transition-colors duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-1'
              )}
              aria-label={isExpanded ? 'Show less' : 'Show more'}
            >
              <span>{isExpanded ? 'Show less' : 'Read more'}</span>
              <svg
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
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
            </motion.button>
          )}
        </motion.div>

        {/* Key Highlights (if expanded) */}
        {isExpanded && project.timeline.milestones && project.timeline.milestones.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 p-3 bg-gray-50 rounded-lg"
          >
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Milestones</h4>
            <div className="space-y-2">
              {project.timeline.milestones.slice(0, 3).map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-2 text-sm">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                  )} />
                  <span className={cn(
                    milestone.completed ? 'text-gray-900' : 'text-gray-500'
                  )}>
                    {milestone.title}
                  </span>
                  {milestone.importance === 'critical' && (
                    <span className="text-xs text-red-600 font-medium">Critical</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Technologies Section */}
      {showTechnologies && project.technologies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">Technologies</h4>
            <span className="text-xs text-gray-500">
              {project.technologies.length} {project.technologies.length === 1 ? 'technology' : 'technologies'}
            </span>
          </div>

          {/* Technology Badges */}
          <motion.div
            className="flex flex-wrap gap-2"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {visibleTechnologies.map((technology) => (
              <motion.div
                key={technology.id}
                variants={technologyAnimationVariants}
                whileHover="hover"
              >
                <Badge
                  size="medium"
                  className={cn(
                    'cursor-pointer transition-all duration-200',
                    technologyColors[technology.category] || technologyColors.tool,
                    'hover:shadow-sm'
                  )}
                  onClick={() => handleTechnologyClick(technology)}
                >
                  <span className="mr-1.5" role="img" aria-label={technology.category}>
                    {technologyIcons[technology.category] || '🔧'}
                  </span>
                  {technology.name}
                  {technology.version && (
                    <span className="ml-1 text-xs opacity-75">
                      v{technology.version}
                    </span>
                  )}
                </Badge>
              </motion.div>
            ))}

            {/* Show More Technologies Button */}
            {hiddenTechnologiesCount > 0 && !showAllTechnologies && (
              <motion.button
                variants={technologyAnimationVariants}
                whileHover="hover"
                onClick={handleShowAllTechnologies}
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                +{hiddenTechnologiesCount} more
              </motion.button>
            )}

            {/* Show Less Technologies Button */}
            {showAllTechnologies && hiddenTechnologiesCount > 0 && (
              <motion.button
                variants={technologyAnimationVariants}
                whileHover="hover"
                onClick={handleShowAllTechnologies}
                className={cn(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  'bg-gray-100 text-gray-600 hover:bg-gray-200',
                  'transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                Show less
              </motion.button>
            )}
          </motion.div>

          {/* Technology Categories Summary (if expanded) */}
          {(isExpanded || showAllTechnologies) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-3 p-3 bg-gray-50 rounded-lg"
            >
              <h5 className="text-xs font-medium text-gray-700 mb-2">Technology Stack</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(
                  project.technologies.reduce((acc, tech) => {
                    acc[tech.category] = (acc[tech.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-gray-600 capitalize">
                      {technologyIcons[category] || '🔧'} {category}
                    </span>
                    <span className="text-gray-500">{count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Additional Content (if expanded) */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-4"
        >
          {/* Project Links Preview */}
          {project.links && project.links.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <h5 className="text-sm font-medium text-blue-900 mb-2">Quick Links</h5>
              <div className="flex flex-wrap gap-2">
                {project.links.slice(0, 3).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 text-xs',
                      'text-blue-700 hover:text-blue-800',
                      'bg-blue-100 hover:bg-blue-200 rounded-md',
                      'transition-colors duration-200'
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Project Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">Tags</h5>
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
        </motion.div>
      )}
    </motion.div>
  );
};