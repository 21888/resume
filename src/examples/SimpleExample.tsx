/**
 * Simple Project Achievement Cards Example
 * Basic usage example without complex dependencies
 */

'use client';

import React from 'react';
import { AchievementCard } from '../components/AchievementCard';
import { ProjectAchievement } from '../types/project-achievement';

// Simple sample project
const sampleProject: ProjectAchievement = {
  id: 'simple-project',
  title: 'Simple Project Example',
  description: 'This is a simple project example to demonstrate the basic functionality of the achievement card component.',
  category: 'web',
  status: 'completed',
  timeline: {
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-06-01'),
    duration: '5 months',
    isOngoing: false,
    milestones: [],
  },
  metrics: {
    primary: [
      {
        id: 'simple-metric',
        label: 'Success Rate',
        value: 95,
        unit: '%',
        type: 'percentage',
        trend: 'up',
        color: 'success',
      },
    ],
    kpis: [],
  },
  team: [
    {
      id: 'team-member-1',
      name: 'John Doe',
      role: 'Developer',
      isLead: true,
    },
  ],
  technologies: [
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
    },
  ],
  tags: ['web', 'react', 'typescript'],
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-06-01'),
};

export const SimpleExample: React.FC = () => {
  const handleCardClick = (project: ProjectAchievement) => {
    console.log('Card clicked:', project.title);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Simple Achievement Card
        </h1>
        
        <AchievementCard
          project={sampleProject}
          variant="default"
          actions={{
            onCardClick: handleCardClick,
          }}
        />
      </div>
    </div>
  );
};