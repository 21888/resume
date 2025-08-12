/**
 * About section with role-adaptive content and core values presentation
 */

'use client';

import { m } from 'framer-motion';
import {
  RoleSection,
  RoleText,
  RoleList,
  RoleCard,
  ConditionalRender
} from '@/components/role-adaptive';
import { useContent } from '@/components/role-adaptive';
import { resumeContent } from '@/data/resume-content';

const AboutSection: React.FC = () => {
  const { isHR, isBoss } = useContent();

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const valueItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <RoleSection
      id="about"
      title="关于我"
      subtitle={{
        hr: '了解我的技术实力与前沿技术应用',
        boss: '了解我的业务价值创造与技术落地能力',
      }}
      background="muted"
    >
      <div className="space-y-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <RoleText
                content={{
                  hr: resumeContent.about.hr.tagline,
                  boss: resumeContent.about.boss.tagline,
                }}
                as="h3"
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
              />
              <RoleText
                content={{
                  hr: resumeContent.about.hr.description,
                  boss: resumeContent.about.boss.description,
                }}
                as="p"
                className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
              />
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                核心价值观
              </h4>
              <RoleList
                items={{
                  hr: resumeContent.about.hr.coreValues,
                  boss: resumeContent.about.boss.coreValues,
                }}
                className="space-y-4"
                itemClassName="group"
                renderItem={(item, index) => (
                  <m.div
                    variants={valueItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        isHR
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : 'bg-purple-100 dark:bg-purple-900'
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isHR
                            ? 'bg-blue-600 dark:bg-blue-400'
                            : 'bg-purple-600 dark:bg-purple-400'
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item}
                      </span>
                    </div>
                  </m.div>
                )}
              />
            </div>
          </m.div>

          {/* Right Column */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <RoleCard
              title={{
                hr: '技术专长',
                boss: '技术管理经验',
              }}
              description={{
                hr: '精通高可用系统架构设计与性能优化',
                boss: '8年技术管理经验，为公司创造千万级商业价值',
              }}
              className="border-l-4 border-blue-500"
              hover={false}
            />

            <RoleCard
              title={{
                hr: '工程化实践',
                boss: '业务成果',
              }}
              description={{
                hr: '搭建 CI/CD 流水线，发布效率提升 80%',
                boss: '主导多个核心项目，累计为公司节省成本 500 万+',
              }}
              className="border-l-4 border-green-500"
              hover={false}
            />

            <RoleCard
              title={{
                hr: '性能优化',
                boss: 'ROI 表现',
              }}
              description={{
                hr: '深度剖析系统瓶颈，系统响应速度提升 60%',
                boss: '技术投入产出比达到 1:8，远超行业平均水平',
              }}
              className="border-l-4 border-purple-500"
              hover={false}
            />
          </m.div>
        </div>

        {/* Key Statistics */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            {isHR ? '技术指标数据' : '业务成果数据'}
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ConditionalRender showForRoles={['hr']}>
              <>
                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">60%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">系统响应速度提升</div>
                </m.div>

                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">80%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">发布效率提升</div>
                </m.div>

                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">系统可用率</div>
                </m.div>

                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">50%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">系统吞吐量提升</div>
                </m.div>
              </>
            </ConditionalRender>

            <ConditionalRender showForRoles={['boss']}>
              <>
                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">500万+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">成本节省</div>
                </m.div>

                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">300%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">GMV增长</div>
                </m.div>

                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">1:8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">投资回报比</div>
                </m.div>

                <m.div
                  variants={statsVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">系统稳定性</div>
                </m.div>
              </>
            </ConditionalRender>
          </div>
        </m.div>

        {/* Call to Action */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {isHR ? '期待与您探讨技术指标与实践' : '期待为您的业务创造更大价值'}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {isHR
                ? '通过技术驱动与持续优化，共创系统卓越性能'
                : '通过技术创新和精细化管理，为您的企业带来可观的投资回报'
              }
            </p>
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const experienceSection = document.getElementById('experience');
                if (experienceSection) {
                  experienceSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                isHR
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                  : 'bg-gradient-to-r from-purple-600 to-purple-700'
              }`}
            >
              {isHR ? '查看技术经历' : '查看个人经历'}
            </m.button>
          </div>
        </m.div>
      </div>
    </RoleSection>
  );
};

export default AboutSection;
