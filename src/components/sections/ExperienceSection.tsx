/**
 * Experience timeline with project showcase
 */

'use client';

import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RoleSection, RoleList, ConditionalRender } from '@/components/role-adaptive';
import { useContent } from '@/components/role-adaptive';
import { resumeContent } from '@/data/resume-content';

const ExperienceSection: React.FC = () => {
  const router = useRouter();
  const { isHR, isBoss, transformArray } = useContent();

  // Transform experience data based on role
  const experiences = transformArray(resumeContent.experience);

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/experience/${projectId}`);
  };

  return (
    <RoleSection
      id="experience"
      title="工作经历"
      subtitle={{
        hr: '我的部分工作经历时间线',
        boss: '我的技术管理和业务价值创造历程',
      }}
      background="default"
    >
      <m.div
        variants={timelineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform md:-translate-x-0.5"></div>

        {experiences.map((experience, index) => (
          <m.div
            key={experience.id}
            variants={itemVariants}
            className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white dark:bg-gray-900 border-4 border-blue-500 rounded-full transform md:-translate-x-2 z-10"></div>

            {/* Content card */}
            <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
              }`}>
              <m.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => handleProjectClick(experience.id)}
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {experience.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {experience.duration}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    {experience.company}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {experience.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {isHR ? '团队管理职责' : '核心职责'}
                  </h4>
                  <ul className="space-y-1">
                    {(Array.isArray(experience.responsibilities) ? experience.responsibilities : []).map((responsibility: string, respIndex: number) => (
                      <li key={respIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Metrics */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {isHR ? '团队成果' : '业务成果'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Array.isArray(experience.metrics) ? experience.metrics : []).map((metric: string, metricIndex: number) => (
                      <div
                        key={metricIndex}
                        className="text-xs bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-2 rounded-lg"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Details Button */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    点击查看详细信息
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </m.div>
            </div>

            {/* Date indicator for mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-8">
              <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                {experience.duration}
              </div>
            </div>
          </m.div>
        ))}
      </m.div>

      {/* Summary Statistics */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16"
      >
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {isHR ? '技术成果示例' : '业务价值创造总览'}
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ConditionalRender showForRoles={['hr']}>
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">核心插件开发</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">大型获客系统</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">微信/抖音小程序</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">门户网站开发</div>
                </div>
              </>
            </ConditionalRender>

            <ConditionalRender showForRoles={['boss']}>
              <>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1000万+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">业务价值</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500万+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">成本节省</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">系统稳定性</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">300%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">业务增长</div>
                </div>
              </>
            </ConditionalRender>
          </div>
        </div>
      </m.div>

      {/* Call to Action */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          {isHR
            ? '想了解更多技术架构和业务价值创造案例？'
            : '想了解更多技术架构和业务价值创造案例？'
          }
        </p>
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
              skillsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${isHR
              ? 'bg-gradient-to-r from-blue-600 to-blue-700'
              : 'bg-gradient-to-r from-purple-600 to-purple-700'
            }`}
        >
          {isHR ? '查看技术能力矩阵' : '查看技术能力矩阵'}
        </m.button>
      </m.div>
    </RoleSection>
  );
};

export default ExperienceSection;