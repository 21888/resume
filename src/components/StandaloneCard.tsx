/**
 * Standalone Card Component
 * Completely self-contained component with no external dependencies
 */

'use client';

import React from 'react';

// Simple utility function for class names (inline to avoid dependencies)
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Inline types to avoid import issues
interface StandaloneProject {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  technologies: Array<{ id: string; name: string }>;
  team: Array<{ id: string; name: string; role: string }>;
}

interface StandaloneCardProps {
  project: StandaloneProject;
  onClick?: (project: StandaloneProject) => void;
}

export const StandaloneCard: React.FC<StandaloneCardProps> = ({
  project,
  onClick,
}) => {
  const handleClick = () => {
    onClick?.(project);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web':
        return 'bg-purple-100 text-purple-800';
      case 'mobile':
        return 'bg-indigo-100 text-indigo-800';
      case 'desktop':
        return 'bg-cyan-100 text-cyan-800';
      case 'api':
        return 'bg-orange-100 text-orange-800';
      case 'infrastructure':
        return 'bg-gray-100 text-gray-800';
      case 'research':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      className={classNames(
        'bg-white rounded-xl border border-gray-200 shadow-sm p-6',
        'cursor-pointer select-none transition-all duration-300 ease-out',
        'hover:shadow-lg hover:border-gray-300',
        'min-h-[320px]'
      )}
      onClick={handleClick}
      role="article"
      aria-label={`Project: ${project.title}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-2">
            <span className={classNames(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              getCategoryColor(project.category)
            )}>
              {project.category}
            </span>
            <span className={classNames(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
              getStatusColor(project.status)
            )}>
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-xl mb-2">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-600 leading-relaxed text-sm line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <span
                key={tech.id}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 6 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-500">
                +{project.technologies.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Team */}
      {project.team && project.team.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Team</span>
            <span className="text-xs text-gray-500">{project.team.length} members</span>
          </div>
          <div className="flex -space-x-2">
            {project.team.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600"
                title={`${member.name} - ${member.role}`}
              >
                {member.name.charAt(0).toUpperCase()}
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
  );
};

// Standalone container component
interface StandaloneContainerProps {
  projects: StandaloneProject[];
  onProjectSelect?: (project: StandaloneProject) => void;
}

export const StandaloneContainer: React.FC<StandaloneContainerProps> = ({
  projects,
  onProjectSelect,
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No projects found
        </h3>
        <p className="text-gray-600">
          There are no projects to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Project Achievements
        </h1>
        <p className="text-gray-600">
          Showcasing {projects.length} projects
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <StandaloneCard
            key={project.id}
            project={project}
            onClick={onProjectSelect}
          />
        ))}
      </div>
    </div>
  );
};

// Standalone example with sample data
export const StandaloneExample: React.FC = () => {
  const sampleProjects: StandaloneProject[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with React and TypeScript, featuring user authentication, product catalog, shopping cart, and payment integration.',
      category: 'web',
      status: 'completed',
      technologies: [
        { id: 'react', name: 'React' },
        { id: 'typescript', name: 'TypeScript' },
        { id: 'nodejs', name: 'Node.js' },
      ],
      team: [
        { id: '1', name: 'John Doe', role: 'Lead Developer' },
        { id: '2', name: 'Jane Smith', role: 'UX Designer' },
      ],
    },
    {
      id: '2',
      title: 'Mobile Fitness App',
      description: 'AI-powered fitness tracking mobile application with personalized workout recommendations and social features.',
      category: 'mobile',
      status: 'ongoing',
      technologies: [
        { id: 'react-native', name: 'React Native' },
        { id: 'firebase', name: 'Firebase' },
      ],
      team: [
        { id: '3', name: 'Sarah Wilson', role: 'Mobile Developer' },
      ],
    },
  ];

  const handleProjectSelect = (project: StandaloneProject) => {
    console.log('Selected project:', project.title);
    alert(`Selected: ${project.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <StandaloneContainer
        projects={sampleProjects}
        onProjectSelect={handleProjectSelect}
      />
    </div>
  );
};