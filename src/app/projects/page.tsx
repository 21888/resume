'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/components/role-adaptive';
import { m } from 'framer-motion';
import PageLayout from '@/components/ui/PageLayout';
import { ProjectAchievementCards } from '@/components/ProjectAchievementCards';
import { projectsData, getProjectsByRole, getProjectStats } from '@/data/projects';
import { ProjectAchievement, ProjectCategory, ProjectStatus } from '@/types/project-achievement';

// 过滤和排序选项
const categoryOptions = [
  { value: '', label: '全部类别' },
  { value: 'web', label: 'Web应用' },
  { value: 'mobile', label: '移动应用' },
  { value: 'api', label: 'API服务' },
  { value: 'infrastructure', label: '基础设施' },
  { value: 'research', label: '研究项目' }
];

const statusOptions = [
  { value: '', label: '全部状态' },
  { value: 'completed', label: '已完成' },
  { value: 'ongoing', label: '进行中' },
  { value: 'paused', label: '暂停' }
];

const sortOptions = [
  { value: 'imagesCount-desc', label: '有图优先' },
  { value: 'updatedAt-desc', label: '最近更新' },
  { value: 'createdAt-desc', label: '最新创建' },
  { value: 'title-asc', label: '标题 A-Z' },
  { value: 'title-desc', label: '标题 Z-A' }
];

export default function ProjectsPage() {
  const { role } = useRole();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | ''>('');
  const [sortBy, setSortBy] = useState('imagesCount-desc');

  // 获取项目数据和统计信息
  const projects = useMemo(() => getProjectsByRole(role), [role]);
  const stats = useMemo(() => getProjectStats(), []);

  // 过滤和排序项目
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = !selectedCategory || project.category === selectedCategory;
      const matchesStatus = !selectedStatus || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // 排序
    const [field, direction] = sortBy.split('-') as [string, 'asc' | 'desc'];
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      if (field === 'title') {
        aValue = a.title;
        bValue = b.title;
      } else if (field === 'createdAt' || field === 'updatedAt') {
        aValue = a[field as keyof ProjectAchievement] as Date;
        bValue = b[field as keyof ProjectAchievement] as Date;
      } else if (field === 'imagesCount') {
        aValue = (a.images?.length ?? 0);
        bValue = (b.images?.length ?? 0);
      } else {
        // Fallback: keep original order if unknown field
        aValue = 0;
        bValue = 0;
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedStatus, sortBy]);

  // 处理项目选择
  const handleProjectSelect = (project: ProjectAchievement) => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <PageLayout>
      {/* 页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              项目成果展示
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {role === 'hr' 
                ? '展示技术能力、团队协作和项目管理经验，体现全面的技术领导力'
                : role === 'boss'
                ? '有合适贵公司的产品可以直接购买部署, 并提供技术支持'
                : '8年技术经验积累，涵盖Web应用、移动开发、AI算法、DevOps等多个领域'
              }
            </p>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-yellow-300">{stats.total}</div>
                <div className="text-blue-100">总项目数</div>
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-green-300">{stats.completed}</div>
                <div className="text-blue-100">已完成</div>
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-orange-300">{stats.ongoing}</div>
                <div className="text-blue-100">进行中</div>
              </m.div>
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-pink-300">{stats.totalTechnologies}</div>
                <div className="text-blue-100">技术栈</div>
              </m.div>
            </div>
          </m.div>
        </div>
      </div>

      {/* 过滤和搜索区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 搜索框 */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                搜索项目
              </label>
              <input
                id="search"
                type="text"
                placeholder="搜索项目名称、描述或标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* 类别筛选 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                项目类别
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | '')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 状态筛选 */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                项目状态
              </label>
              <select
                id="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | '')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 排序选项 */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                排序方式:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              显示 {filteredAndSortedProjects.length} / {projects.length} 个项目
            </div>
          </div>
        </m.div>

        {/* 项目卡片网格 */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <ProjectAchievementCards
            projects={filteredAndSortedProjects}
            onProjectSelect={handleProjectSelect}
            showFilters={false} // 我们已经有了自定义的过滤器
            showSort={false}
            showSearch={false}
            animationDelay={0.1}
          />
        </m.div>

        {/* 空状态 */}
        {filteredAndSortedProjects.length === 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              没有找到匹配的项目
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              尝试调整搜索条件或筛选选项
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedStatus('');
                setSortBy('imagesCount-desc');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              重置筛选条件
            </button>
          </m.div>
        )}
      </div>
    </PageLayout>
  );
}