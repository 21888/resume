/**
 * Skills section with interactive radar chart
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { RoleSection, ConditionalRender } from '@/components/role-adaptive';
import { useContent } from '@/components/role-adaptive';
import { resumeContent } from '@/data/resume-content';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillsSection: React.FC = () => {
  const { isHR, isBoss } = useContent();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'radar' | 'bars'>('radar');
  const chartRef = useRef<ChartJS<'radar'>>(null);

  const skills = resumeContent.skills;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryColors = {
    frontend: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20' },
    backend: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50 dark:bg-green-900/20' },
    devops: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50 dark:bg-purple-900/20' },
    management: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50 dark:bg-orange-900/20' },
    other: { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50 dark:bg-gray-900/20' },
  };

  const categoryNames = {
    frontend: '前端技术',
    backend: '后端技术',
    devops: '爬虫逆向',
    management: '运维技术',
    other: '其他技能',
  };

  // Radar chart data
  const radarData = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: '技能水平',
        data: skills.map(skill => skill.level),
        backgroundColor: isHR ? 'rgba(59, 130, 246, 0.2)' : 'rgba(147, 51, 234, 0.2)',
        borderColor: isHR ? 'rgba(59, 130, 246, 1)' : 'rgba(147, 51, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: isHR ? 'rgba(59, 130, 246, 1)' : 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: isHR ? 'rgba(59, 130, 246, 1)' : 'rgba(147, 51, 234, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const skill = skills[context.dataIndex];
            return [
              `${skill.name}: ${skill.level}/10`,
              `经验: ${skill.experience}`,
              `案例: ${skill.examples.join(', ')}`,
            ];
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
          color: 'rgba(156, 163, 175, 0.8)',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        angleLines: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        pointLabels: {
          color: 'rgba(75, 85, 99, 1)',
          font: {
            size: 12,
          },
        },
      },
    },
    onHover: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedSkill(skills[index].name);
      } else {
        setSelectedSkill(null);
      }
    },
  };

  return (
    <RoleSection
      id="skills"
      title="技能专长"
      subtitle={{
        hr: '我的技术能力和团队管理技能矩阵',
        boss: '我的技术实力和业务价值创造能力',
      }}
      background="muted"
    >
      <div className="space-y-12">
        {/* View Mode Toggle */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('radar')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'radar'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                雷达图
              </button>
              <button
                onClick={() => setViewMode('bars')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'bars'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                进度条
              </button>
            </div>
          </div>
        </m.div>

        <AnimatePresence mode="wait">
          {viewMode === 'radar' ? (
            <m.div
              key="radar"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Radar Chart */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                  <div className="h-96">
                    <Radar ref={chartRef} data={radarData} options={radarOptions} />
                  </div>
                </div>
                
                {/* Selected Skill Info */}
                <AnimatePresence>
                  {selectedSkill && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-2 rounded-lg text-sm whitespace-nowrap"
                    >
                      {selectedSkill}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Skills Legend */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                  技能详情
                </h4>
                
                <div className="space-y-4">
                  {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <m.div
                      key={category}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`p-4 rounded-xl ${categoryColors[category as keyof typeof categoryColors].light}`}
                    >
                      <h5 className={`font-semibold mb-3 ${categoryColors[category as keyof typeof categoryColors].text}`}>
                        {categoryNames[category as keyof typeof categoryNames]}
                      </h5>
                      <div className="space-y-2">
                        {categorySkills.map((skill) => (
                          <div key={skill.name} className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                              {skill.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                {[...Array(10)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < skill.level
                                        ? categoryColors[category as keyof typeof categoryColors].bg
                                        : 'bg-gray-200 dark:bg-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                {skill.level}/10
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </m.div>
                  ))}
                </div>
              </div>
            </m.div>
          ) : (
            <m.div
              key="bars"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <m.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                >
                  <h4 className={`text-xl font-bold mb-6 ${categoryColors[category as keyof typeof categoryColors].text}`}>
                    {categoryNames[category as keyof typeof categoryNames]}
                  </h4>
                  
                  <div className="space-y-6">
                    {categorySkills.map((skill, index) => (
                      <m.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group cursor-pointer"
                        onMouseEnter={() => setSelectedSkill(skill.name)}
                        onMouseLeave={() => setSelectedSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </h5>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>{skill.experience}</span>
                            <span>•</span>
                            <span>{skill.level}/10</span>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <m.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level * 10}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-3 rounded-full ${categoryColors[category as keyof typeof categoryColors].bg} group-hover:shadow-lg transition-shadow duration-200`}
                            />
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {skill.examples.map((example, exampleIndex) => (
                            <span
                              key={exampleIndex}
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </m.div>
                    ))}
                  </div>
                </m.div>
              ))}
            </m.div>
          )}
        </AnimatePresence>

        {/* Skills Summary */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {isHR ? '技能发展历程' : '技术能力优势'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ConditionalRender showForRoles={['hr']}>
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">团队技能培养</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    建立技能发展路径，帮助团队成员提升技术能力
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">知识传承</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    组织技术分享，建立知识库，确保技术经验传承
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">技能评估</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    建立技能评估体系，制定个性化成长计划
                  </p>
                </div>
              </>
            </ConditionalRender>

            <ConditionalRender showForRoles={['boss']}>
              <>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">技术创新</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    运用前沿技术，推动产品创新和业务增长
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">性能优化</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    系统性能提升60%，为公司节省大量服务器成本
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">架构设计</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    设计高可用架构，支撑千万级用户访问
                  </p>
                </div>
              </>
            </ConditionalRender>
          </div>
        </m.div>
      </div>
    </RoleSection>
  );
};

export default SkillsSection;