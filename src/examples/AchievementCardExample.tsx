/**
 * Achievement Card Example
 * Example usage of the AchievementCard component with sample data
 */

import React, { useState } from 'react';
import { AchievementCard } from '../components';
import { ProjectAchievement } from '../types';

// Sample project data
const sampleProject: ProjectAchievement = {
  id: 'sample-project',
  title: 'E-Commerce Platform Redesign',
  description: 'Complete redesign and modernization of a legacy e-commerce platform, focusing on user experience, performance optimization, and mobile responsiveness. Implemented modern React architecture with TypeScript, integrated payment systems, and built comprehensive admin dashboard.',
  category: 'web',
  status: 'completed',
  timeline: {
    startDate: new Date('2023-01-15'),
    endDate: new Date('2023-08-30'),
    duration: '7 months',
    isOngoing: false,
    milestones: [
      {
        id: 'design-phase',
        title: 'Design System & Wireframes',
        description: 'Complete design system and user interface wireframes',
        date: new Date('2023-02-28'),
        completed: true,
        importance: 'high',
      },
    ],
  },
  metrics: {
    primary: [
      {
        id: 'conversion-rate',
        label: 'Conversion Rate',
        value: 4.2,
        unit: '%',
        type: 'percentage',
        trend: 'up',
        icon: 'trending-up',
        color: 'success',
        description: 'Increase in conversion rate after redesign',
        target: 4.0,
        previousValue: 2.8,
      },
      {
        id: 'page-load-time',
        label: 'Page Load Time',
        value: 1.2,
        unit: 's',
        type: 'number',
        trend: 'down',
        icon: 'clock',
        color: 'success',
        description: 'Average page load time improvement',
        target: 1.5,
        previousValue: 3.4,
      },
    ],
    kpis: [
      {
        id: 'user-satisfaction',
        label: 'User Satisfaction',
        value: 4.7,
        unit: '/5',
        type: 'number',
        trend: 'up',
        icon: 'star',
        color: 'success',
        description: 'Average user satisfaction rating',
        weight: 0.4,
        threshold: {
          excellent: 4.5,
          good: 4.0,
          acceptable: 3.5,
        },
      },
    ],
  },
  team: [
    {
      id: 'john-doe',
      name: 'John Doe',
      role: 'Lead Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      contribution: 'Led frontend architecture and React implementation',
      isLead: true,
      skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      contactInfo: {
        email: 'john.doe@example.com',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
      },
      joinDate: new Date('2023-01-15'),
    },
    {
      id: 'jane-smith',
      name: 'Jane Smith',
      role: 'UX/UI Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      contribution: 'Created design system and user experience flows',
      isLead: false,
      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
      contactInfo: {
        email: 'jane.smith@example.com',
        linkedin: 'https://linkedin.com/in/janesmith',
        portfolio: 'https://janesmith.design',
      },
      joinDate: new Date('2023-01-15'),
    },
  ],
  technologies: [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      icon: 'react',
      proficiency: 9,
      version: '18.2.0',
      description: 'Main frontend framework',
      website: 'https://reactjs.org',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      icon: 'typescript',
      proficiency: 8,
      version: '4.9.0',
      description: 'Type-safe JavaScript development',
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'backend',
      icon: 'nodejs',
      proficiency: 8,
      version: '18.0.0',
      description: 'Backend runtime environment',
    },
  ],
  links: [
    {
      id: 'live-demo',
      title: 'Live Demo',
      url: 'https://ecommerce-demo.example.com',
      type: 'demo',
      icon: 'external-link',
      description: 'View the live application',
    },
    {
      id: 'github-repo',
      title: 'GitHub Repository',
      url: 'https://github.com/example/ecommerce-platform',
      type: 'repository',
      icon: 'github',
      description: 'Source code repository',
    },
  ],
  images: [
    {
      id: 'homepage-screenshot',
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600',
      alt: 'E-commerce platform homepage screenshot',
      caption: 'Modern, responsive homepage design',
      type: 'screenshot',
      width: 800,
      height: 600,
      thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300',
    },
  ],
  tags: ['React', 'E-commerce', 'TypeScript', 'Responsive Design', 'Payment Integration'],
  createdAt: new Date('2023-01-15T10:00:00Z'),
  updatedAt: new Date('2023-09-01T14:30:00Z'),
};

export const AchievementCardExample: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (project: ProjectAchievement) => {
    setSelectedCard(project.id);
    console.log('Card clicked:', project.title);
  };

  const handleCardExpand = (projectId: string) => {
    setExpandedCard(expandedCard === projectId ? null : projectId);
  };

  const handleTechnologyClick = (technology: string, project: ProjectAchievement) => {
    console.log('Technology clicked:', technology, 'in project:', project.title);
  };

  const handleMetricClick = (metric: any, project: ProjectAchievement) => {
    console.log('Metric clicked:', metric.label, 'in project:', project.title);
  };

  const handleTeamMemberClick = (member: any, project: ProjectAchievement) => {
    console.log('Team member clicked:', member.name, 'in project:', project.title);
  };

  const handleLinkClick = (url: string, type: string) => {
    console.log('Link clicked:', url, 'type:', type);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Achievement Card Examples</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default variant */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Default</h2>
            <AchievementCard
              project={sampleProject}
              variant="default"
              isSelected={selectedCard === sampleProject.id}
              isExpanded={expandedCard === sampleProject.id}
              onExpand={() => handleCardExpand(sampleProject.id)}
              actions={{
                onCardClick: handleCardClick,
                onTechnologyClick: handleTechnologyClick,
                onMetricClick: handleMetricClick,
                onTeamMemberClick: handleTeamMemberClick,
                onLinkClick: handleLinkClick,
              }}
            />
          </div>

          {/* Compact variant */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Compact</h2>
            <AchievementCard
              project={sampleProject}
              variant="compact"
              actions={{
                onCardClick: handleCardClick,
                onTechnologyClick: handleTechnologyClick,
                onMetricClick: handleMetricClick,
                onTeamMemberClick: handleTeamMemberClick,
                onLinkClick: handleLinkClick,
              }}
            />
          </div>

          {/* Detailed variant */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Detailed</h2>
            <AchievementCard
              project={sampleProject}
              variant="detailed"
              actions={{
                onCardClick: handleCardClick,
                onTechnologyClick: handleTechnologyClick,
                onMetricClick: handleMetricClick,
                onTeamMemberClick: handleTeamMemberClick,
                onLinkClick: handleLinkClick,
              }}
            />
          </div>

          {/* Minimal variant */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Minimal</h2>
            <AchievementCard
              project={sampleProject}
              variant="minimal"
              showMetrics={false}
              showTeam={false}
              showTimeline={false}
              actions={{
                onCardClick: handleCardClick,
                onTechnologyClick: handleTechnologyClick,
              }}
            />
          </div>

          {/* With animation delay */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">With Animation</h2>
            <AchievementCard
              project={sampleProject}
              variant="default"
              animationDelay={0.2}
              actions={{
                onCardClick: handleCardClick,
                onTechnologyClick: handleTechnologyClick,
                onMetricClick: handleMetricClick,
                onTeamMemberClick: handleTeamMemberClick,
                onLinkClick: handleLinkClick,
              }}
            />
          </div>

          {/* Custom styling */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Custom Style</h2>
            <AchievementCard
              project={sampleProject}
              variant="default"
              className="border-2 border-blue-200 bg-blue-50"
              actions={{
                onCardClick: handleCardClick,
                onTechnologyClick: handleTechnologyClick,
                onMetricClick: handleMetricClick,
                onTeamMemberClick: handleTeamMemberClick,
                onLinkClick: handleLinkClick,
              }}
            />
          </div>
        </div>

        {/* State display */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Component State</h3>
          <div className="text-sm text-gray-600">
            <p>Selected Card: {selectedCard || 'None'}</p>
            <p>Expanded Card: {expandedCard || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};