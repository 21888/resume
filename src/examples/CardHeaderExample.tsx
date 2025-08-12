/**
 * Card Header Example
 * Example usage of the CardHeader component with different configurations
 */

import React from 'react';
import { CardHeader } from '../components';
import { ProjectAchievement } from '../types';

// Sample projects with different statuses and categories
const sampleProjects: ProjectAchievement[] = [
  {
    id: 'web-project',
    title: 'E-Commerce Platform Redesign',
    description: 'Complete redesign of legacy e-commerce platform',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-08-30'),
      duration: '7 months',
      isOngoing: false,
      milestones: [],
    },
    metrics: {
      primary: [],
      kpis: [
        {
          id: 'impact',
          label: 'Business Impact',
          value: 85,
          type: 'percentage',
          weight: 0.8, // High impact
          threshold: { excellent: 80, good: 60, acceptable: 40 },
        },
      ],
    },
    team: [
      {
        id: 'lead',
        name: 'John Doe',
        role: 'Lead Developer',
        isLead: true,
      },
      {
        id: 'designer',
        name: 'Jane Smith',
        role: 'Designer',
        isLead: false,
      },
    ],
    technologies: [
      { id: 'react', name: 'React', category: 'frontend' },
      { id: 'node', name: 'Node.js', category: 'backend' },
    ],
    tags: ['React', 'E-commerce'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-09-01'),
  },
  {
    id: 'mobile-project',
    title: 'Fitness Tracking Mobile App',
    description: 'AI-powered fitness tracking application',
    category: 'mobile',
    status: 'ongoing',
    timeline: {
      startDate: new Date('2023-06-01'),
      duration: '8 months',
      isOngoing: true,
      milestones: [],
    },
    metrics: {
      primary: [],
      kpis: [
        {
          id: 'retention',
          label: 'User Retention',
          value: 65,
          type: 'percentage',
          weight: 0.6, // Medium impact
          threshold: { excellent: 70, good: 50, acceptable: 30 },
        },
      ],
    },
    team: [
      {
        id: 'mobile-dev',
        name: 'Sarah Wilson',
        role: 'Mobile Developer',
        isLead: true,
      },
    ],
    technologies: [
      { id: 'react-native', name: 'React Native', category: 'frontend' },
    ],
    tags: ['React Native', 'AI', 'Fitness'],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-11-15'),
  },
  {
    id: 'api-project',
    title: 'Microservices API Gateway',
    description: 'Scalable API gateway for microservices architecture',
    category: 'api',
    status: 'paused',
    timeline: {
      startDate: new Date('2023-03-01'),
      duration: '6 months',
      isOngoing: false,
      milestones: [],
    },
    metrics: {
      primary: [],
      kpis: [
        {
          id: 'performance',
          label: 'API Performance',
          value: 92,
          type: 'percentage',
          weight: 0.9, // Very high impact
          threshold: { excellent: 90, good: 75, acceptable: 60 },
        },
      ],
    },
    team: [
      {
        id: 'backend-dev',
        name: 'Mike Johnson',
        role: 'Backend Developer',
        isLead: false,
      },
    ],
    technologies: [
      { id: 'nodejs', name: 'Node.js', category: 'backend' },
      { id: 'docker', name: 'Docker', category: 'tool' },
    ],
    tags: ['API', 'Microservices', 'Docker'],
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-07-15'),
  },
  {
    id: 'research-project',
    title: 'Machine Learning Research Project',
    description: 'Research on advanced ML algorithms',
    category: 'research',
    status: 'cancelled',
    timeline: {
      startDate: new Date('2023-02-01'),
      duration: '4 months',
      isOngoing: false,
      milestones: [],
    },
    metrics: {
      primary: [],
      kpis: [
        {
          id: 'research-output',
          label: 'Research Output',
          value: 45,
          type: 'percentage',
          weight: 0.5, // Medium impact
          threshold: { excellent: 80, good: 60, acceptable: 40 },
        },
      ],
    },
    team: [
      {
        id: 'researcher',
        name: 'Dr. Alex Chen',
        role: 'Research Lead',
        isLead: true,
      },
    ],
    technologies: [
      { id: 'python', name: 'Python', category: 'backend' },
      { id: 'tensorflow', name: 'TensorFlow', category: 'platform' },
    ],
    tags: ['ML', 'Research', 'Python'],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-06-01'),
  },
];

export const CardHeaderExample: React.FC = () => {
  const handleTitleClick = (project: ProjectAchievement) => {
    console.log('Title clicked:', project.title);
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category);
  };

  const handleStatusClick = (status: string) => {
    console.log('Status clicked:', status);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Card Header Examples</h1>
        
        <div className="space-y-8">
          {/* Full Header Examples */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Full Headers</h2>
            <div className="grid gap-6">
              {sampleProjects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <CardHeader
                    project={project}
                    showCategory={true}
                    showStatus={true}
                    showActions={true}
                    onTitleClick={handleTitleClick}
                    onCategoryClick={handleCategoryClick}
                    onStatusClick={handleStatusClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Minimal Header Examples */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Minimal Headers (No Actions)</h2>
            <div className="grid gap-4">
              {sampleProjects.slice(0, 2).map((project) => (
                <div key={`minimal-${project.id}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <CardHeader
                    project={project}
                    showCategory={true}
                    showStatus={true}
                    showActions={false}
                    onTitleClick={handleTitleClick}
                    onCategoryClick={handleCategoryClick}
                    onStatusClick={handleStatusClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category Only Examples */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Category Only</h2>
            <div className="grid gap-4">
              {sampleProjects.slice(0, 2).map((project) => (
                <div key={`category-${project.id}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <CardHeader
                    project={project}
                    showCategory={true}
                    showStatus={false}
                    showActions={false}
                    onTitleClick={handleTitleClick}
                    onCategoryClick={handleCategoryClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Status Only Examples */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Status Only</h2>
            <div className="grid gap-4">
              {sampleProjects.slice(0, 2).map((project) => (
                <div key={`status-${project.id}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <CardHeader
                    project={project}
                    showCategory={false}
                    showStatus={true}
                    showActions={false}
                    onTitleClick={handleTitleClick}
                    onStatusClick={handleStatusClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Title Only Examples */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Title Only</h2>
            <div className="grid gap-4">
              {sampleProjects.slice(0, 2).map((project) => (
                <div key={`title-${project.id}`} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <CardHeader
                    project={project}
                    showCategory={false}
                    showStatus={false}
                    showActions={false}
                    onTitleClick={handleTitleClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Custom Styled Examples */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Custom Styled</h2>
            <div className="grid gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <CardHeader
                  project={sampleProjects[0]}
                  showCategory={true}
                  showStatus={true}
                  showActions={true}
                  className="text-blue-900"
                  onTitleClick={handleTitleClick}
                  onCategoryClick={handleCategoryClick}
                  onStatusClick={handleStatusClick}
                />
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <CardHeader
                  project={sampleProjects[1]}
                  showCategory={true}
                  showStatus={true}
                  showActions={true}
                  className="text-green-900"
                  onTitleClick={handleTitleClick}
                  onCategoryClick={handleCategoryClick}
                  onStatusClick={handleStatusClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Demo</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click on titles, categories, or status badges to see console output.
          </p>
          <CardHeader
            project={sampleProjects[0]}
            showCategory={true}
            showStatus={true}
            showActions={true}
            onTitleClick={handleTitleClick}
            onCategoryClick={handleCategoryClick}
            onStatusClick={handleStatusClick}
          />
        </div>
      </div>
    </div>
  );
};