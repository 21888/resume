/**
 * Card Team Component
 * Team section for achievement cards with member display and interactions
 */

'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardTeamProps } from '../types/components';
import { TeamMember } from '../types/project-achievement';
import { Avatar } from './ui/Avatar';
import { cn } from '../utils/cn';

// Role color mappings
const roleColors: Record<string, string> = {
  'lead': 'bg-purple-100 text-purple-800',
  'senior': 'bg-blue-100 text-blue-800',
  'developer': 'bg-green-100 text-green-800',
  'designer': 'bg-pink-100 text-pink-800',
  'manager': 'bg-orange-100 text-orange-800',
  'analyst': 'bg-cyan-100 text-cyan-800',
  'tester': 'bg-yellow-100 text-yellow-800',
  'default': 'bg-gray-100 text-gray-800',
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const memberVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
    },
  },
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
};

export const CardTeam: React.FC<CardTeamProps> = ({
  team,
  layout = 'avatars',
  maxVisible,
  showRoles = true,
  showContributions = false,
  avatarSize = 'medium',
  className,
  onMemberClick,
}) => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [showAllMembers, setShowAllMembers] = useState(false);

  // Get visible team members
  const maxVisibleResolved: number = typeof maxVisible === 'number' ? maxVisible : 5;
  const visibleMembers = showAllMembers ? team : team.slice(0, maxVisibleResolved);
  const hiddenCount = Math.max(0, team.length - maxVisibleResolved);

  // Get role color
  const getRoleColor = useCallback((role: string): string => {
    const roleKey = role.toLowerCase().split(' ')[0]; // Get first word of role
    return roleColors[roleKey] || roleColors.default;
  }, []);

  // Handle member click
  const handleMemberClick = useCallback((member: TeamMember) => {
    onMemberClick?.(member);
  }, [onMemberClick]);

  // Handle member hover
  const handleMemberHover = useCallback((memberId: string | null) => {
    setHoveredMember(memberId);
  }, []);

  // Format member name for display
  const formatMemberName = useCallback((member: TeamMember): string => {
    if (member.isLead) {
      return `${member.name} (Lead)`;
    }
    return member.name;
  }, []);

  // Render member avatar with tooltip
  const renderMemberAvatar = (member: TeamMember, index: number) => {
    const isHovered = hoveredMember === member.id;

    return (
      <motion.div
        key={member.id}
        variants={memberVariants}
        whileHover="hover"
        className="relative group"
        onMouseEnter={() => handleMemberHover(member.id)}
        onMouseLeave={() => handleMemberHover(null)}
      >
        <Avatar
          src={member.avatar}
          alt={member.name}
          size={avatarSize}
          className={cn(
            'cursor-pointer transition-all duration-200',
            member.isLead && 'ring-2 ring-yellow-400 ring-offset-2',
            'hover:shadow-lg'
          )}
          onClick={() => handleMemberClick(member)}
        />

        {/* Lead Crown Icon */}
        {member.isLead && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-xs">👑</span>
          </div>
        )}

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2',
                'px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg',
                'max-w-xs whitespace-nowrap pointer-events-none z-10'
              )}
            >
              <div className="font-medium">{formatMemberName(member)}</div>
              <div className="text-gray-300">{member.role}</div>
              {member.contribution && showContributions && (
                <div className="text-gray-400 mt-1 whitespace-normal max-w-48">
                  {member.contribution}
                </div>
              )}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Render member in list format
  const renderMemberList = (member: TeamMember, index: number) => {
    return (
      <motion.div
        key={member.id}
        variants={memberVariants}
        whileHover="hover"
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg',
          'hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
        )}
        onClick={() => handleMemberClick(member)}
      >
        <Avatar
          src={member.avatar}
          alt={member.name}
          size={avatarSize}
          className={cn(
            member.isLead && 'ring-2 ring-yellow-400 ring-offset-1'
          )}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-gray-900 truncate">
              {member.name}
            </h4>
            {member.isLead && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                Lead
              </span>
            )}
          </div>
          
          {showRoles && (
            <p className="text-sm text-gray-500 truncate">
              {member.role}
            </p>
          )}
          
          {member.contribution && showContributions && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {member.contribution}
            </p>
          )}
        </div>

        {/* Skills badges */}
        {member.skills && member.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 max-w-32">
            {member.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
            {member.skills.length > 2 && (
              <span className="text-xs text-gray-400">
                +{member.skills.length - 2}
              </span>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  // Render member in compact format
  const renderMemberCompact = (member: TeamMember, index: number) => {
    return (
      <motion.div
        key={member.id}
        variants={memberVariants}
        whileHover="hover"
        className={cn(
          'flex items-center gap-2 p-2 rounded-lg',
          'hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
        )}
        onClick={() => handleMemberClick(member)}
      >
        <Avatar
          src={member.avatar}
          alt={member.name}
          size="small"
          className={cn(
            member.isLead && 'ring-1 ring-yellow-400'
          )}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-900 truncate">
              {member.name}
            </span>
            {member.isLead && (
              <span className="text-xs">👑</span>
            )}
          </div>
          {showRoles && (
            <span className={cn(
              'inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium',
              getRoleColor(member.role)
            )}>
              {member.role}
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  // Render member in grid format
  const renderMemberGrid = (member: TeamMember, index: number) => {
    return (
      <motion.div
        key={member.id}
        variants={memberVariants}
        whileHover="hover"
        className={cn(
          'flex flex-col items-center p-4 rounded-lg border border-gray-200',
          'hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-pointer'
        )}
        onClick={() => handleMemberClick(member)}
      >
        <Avatar
          src={member.avatar}
          alt={member.name}
          size="large"
          className={cn(
            'mb-3',
            member.isLead && 'ring-2 ring-yellow-400 ring-offset-2'
          )}
        />

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <h4 className="font-medium text-gray-900 text-sm">
              {member.name}
            </h4>
            {member.isLead && (
              <span className="text-xs">👑</span>
            )}
          </div>
          
          {showRoles && (
            <span className={cn(
              'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
              getRoleColor(member.role)
            )}>
              {member.role}
            </span>
          )}
          
          {member.contribution && showContributions && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {member.contribution}
            </p>
          )}
        </div>
      </motion.div>
    );
  };

  // Get layout component
  const getLayoutComponent = () => {
    switch (layout) {
      case 'list':
        return (
          <div className="space-y-2">
            {visibleMembers.map(renderMemberList)}
          </div>
        );
      case 'compact':
        return (
          <div className="space-y-1">
            {visibleMembers.map(renderMemberCompact)}
          </div>
        );
      case 'grid':
        return (
          <div className="grid grid-cols-2 gap-3">
            {visibleMembers.map(renderMemberGrid)}
          </div>
        );
      case 'avatars':
      default:
        return (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {visibleMembers.map(renderMemberAvatar)}
            </div>
            
            {/* Show more indicator */}
            {hiddenCount > 0 && !showAllMembers && (
              <motion.button
                variants={memberVariants}
                whileHover="hover"
                onClick={() => setShowAllMembers(true)}
                className={cn(
                  'flex items-center justify-center rounded-full border-2 border-white shadow-sm',
                  'bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  avatarSize === 'small' && 'w-6 h-6 text-xs',
                  avatarSize === 'medium' && 'w-8 h-8 text-sm',
                  avatarSize === 'large' && 'w-12 h-12 text-base'
                )}
                aria-label={`Show ${hiddenCount} more team members`}
              >
                +{hiddenCount}
              </motion.button>
            )}
          </div>
        );
    }
  };

  if (team.length === 0) {
    return (
      <div className={cn('text-center py-6 text-gray-500', className)}>
        <svg className="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
        <p className="text-sm">No team members</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-4', className)}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Team</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>
            {team.length} {team.length === 1 ? 'member' : 'members'}
          </span>
          {team.some(member => member.isLead) && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span>👑</span>
                <span>
                  {team.filter(member => member.isLead).length} lead{team.filter(member => member.isLead).length !== 1 ? 's' : ''}
                </span>
              </span>
            </>
          )}
        </div>
      </div>

      {/* Team Members */}
      {getLayoutComponent()}

      {/* Show More/Less Button (for non-avatar layouts) */}
      {layout !== 'avatars' && hiddenCount > 0 && (
        <motion.div
          variants={memberVariants}
          className="text-center"
        >
          <button
            onClick={() => setShowAllMembers(!showAllMembers)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium',
              'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
              'rounded-lg transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
          >
            {showAllMembers ? (
              <>
                <span>Show Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Show {hiddenCount} More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Team Statistics (for detailed layouts) */}
      {(layout === 'grid' || layout === 'list') && showContributions && (
        <motion.div
          variants={memberVariants}
          className="mt-4 p-3 bg-gray-50 rounded-lg"
        >
          <h5 className="text-sm font-medium text-gray-700 mb-2">Team Overview</h5>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-500">Total Members:</span>
              <span className="ml-2 font-medium">{team.length}</span>
            </div>
            <div>
              <span className="text-gray-500">Team Leads:</span>
              <span className="ml-2 font-medium">{team.filter(m => m.isLead).length}</span>
            </div>
            <div>
              <span className="text-gray-500">Unique Roles:</span>
              <span className="ml-2 font-medium">
                {new Set(team.map(m => m.role)).size}
              </span>
            </div>
            <div>
              <span className="text-gray-500">With Skills:</span>
              <span className="ml-2 font-medium">
                {team.filter(m => m.skills && m.skills.length > 0).length}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};