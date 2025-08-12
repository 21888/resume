'use client';

import { useRouter } from 'next/navigation';
import { useRole } from '@/components/role-adaptive';
import { m } from 'framer-motion';
import { projectsData, getProjectStats } from '@/data/projects';
import { ArrowRight, TrendingUp, Users, Code, Award } from 'lucide-react';

export default function ProjectAchievementSection() {
  const router = useRouter();
  const { role } = useRole();
  const stats = getProjectStats();

  // 获取前3个最重要的项目作为预览
  const featuredProjects = projectsData
    .filter(p => p.status === 'completed')
    .slice(0, 3);

  const handleViewAllProjects = () => {
    router.push('/projects');
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const getRoleSpecificContent = () => {
    if (role === 'hr') {
      return {
        title: '项目管理与团队协作',
        subtitle: '展示技术领导力、团队管理和项目交付能力',
        highlights: [
          { icon: Users, label: '团队管理', value: '20+人' },
          { icon: Award, label: '项目成功率', value: '95%' },
          { icon: TrendingUp, label: '效率提升', value: '平均40%' }
        ]
      };
    } else if (role === 'boss') {
      return {
        title: '技术驱动的商业价值',
        subtitle: '聚焦ROI、成本优化和业务增长的技术解决方案',
        highlights: [
          { icon: TrendingUp, label: '业务增长', value: '平均30%' },
          { icon: Award, label: '成本节省', value: '500万+' },
          { icon: Code, label: '技术创新', value: '6项专利' }
        ]
      };
    } else {
      return {
        title: '项目成果展示',
        subtitle: '8年技术经验，涵盖多个领域的成功项目',
        highlights: [
          { icon: Code, label: '完成项目', value: `${stats.completed}个` },
          { icon: Users, label: '技术栈', value: `${stats.totalTechnologies}种` },
          { icon: TrendingUp, label: '进行中', value: `${stats.ongoing}个` }
        ]
      };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            {content.subtitle}
          </p>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.highlights.map((highlight, index) => (
              <m.div
                key={highlight.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <highlight.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {highlight.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {highlight.label}
                </div>
              </m.div>
            ))}
          </div>
        </m.div>

        {/* Featured Projects Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleProjectClick(project.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Project Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    已完成
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.timeline.duration}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {project.metrics.primary.slice(0, 2).map((metric) => (
                    <div key={metric.id} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {metric.value}{metric.unit}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech.id}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                    >
                      {tech.name}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Team Size */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.team.length}人团队</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    <span>查看详情</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={handleViewAllProjects}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
          >
            <span>查看所有项目</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-4 text-gray-600 dark:text-gray-400">
            共 {stats.total} 个项目 · {stats.completed} 个已完成 · {stats.ongoing} 个进行中
          </div>
        </m.div>

        {/* Role-specific Call to Action */}
        {role && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {role === 'hr' 
                  ? '技术管理能力展示' 
                  : role === 'boss'
                  ? '技术投资回报分析'
                  : '技术能力概览'
                }
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {role === 'hr'
                  ? '每个项目都体现了从技术架构到团队管理的全方位能力，注重人才培养和知识传承。'
                  : role === 'boss'
                  ? '技术决策直接驱动业务增长，平均为企业节省成本30%以上，提升运营效率40%。'
                  : '从前端到后端，从移动应用到AI算法，全栈技术能力助力业务成功。'
                }
              </p>
              <button
                onClick={handleViewAllProjects}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                深入了解项目详情
              </button>
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
}