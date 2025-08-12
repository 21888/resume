/**
 * Minimal Example
 * Simplest possible usage without any complex dependencies
 */

'use client';

import React from 'react';
import { SimpleContainer } from '../components/SimpleContainer';
import { ProjectAchievement } from '../types/project-achievement';

// Minimal sample data
const minimalProjects: ProjectAchievement[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with React and TypeScript, featuring user authentication, product catalog, shopping cart, and payment integration.',
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
      primary: [
        {
          id: 'conversion-rate',
          label: 'Conversion Rate',
          value: 4.2,
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
        id: 'john-doe',
        name: 'John Doe',
        role: 'Lead Developer',
        isLead: true,
      },
      {
        id: 'jane-smith',
        name: 'Jane Smith',
        role: 'UX Designer',
        isLead: false,
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
      {
        id: 'nodejs',
        name: 'Node.js',
        category: 'backend',
      },
    ],
    tags: ['React', 'E-commerce', 'TypeScript'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-09-01'),
  },
  {
    id: 'project-2',
    title: 'Mobile Fitness App',
    description: 'AI-powered fitness tracking mobile application with personalized workout recommendations and social features.',
    category: 'mobile',
    status: 'ongoing',
    timeline: {
      startDate: new Date('2023-06-01'),
      duration: '8 months',
      isOngoing: true,
      milestones: [],
    },
    metrics: {
      primary: [
        {
          id: 'daily-users',
          label: 'Daily Active Users',
          value: 12500,
          type: 'number',
          trend: 'up',
          color: 'success',
        },
      ],
      kpis: [],
    },
    team: [
      {
        id: 'sarah-wilson',
        name: 'Sarah Wilson',
        role: 'Mobile Developer',
        isLead: true,
      },
    ],
    technologies: [
      {
        id: 'react-native',
        name: 'React Native',
        category: 'frontend',
      },
      {
        id: 'firebase',
        name: 'Firebase',
        category: 'backend',
      },
    ],
    tags: ['React Native', 'Mobile', 'AI'],
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-11-15'),
  },
];

export const MinimalExample: React.FC = () => {
  const handleProjectSelect = (project: ProjectAchievement) => {
    console.log('Selected project:', project.title);
    alert(`Selected: ${project.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <SimpleContainer
        projects={minimalProjects}
        onProjectSelect={handleProjectSelect}
      />
    </div>
  );
};