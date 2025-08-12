/**
 * Hero section with role-based messaging
 */

'use client';

import { m } from 'framer-motion';
import { RoleSection, RoleText, ConditionalRender } from '@/components/role-adaptive';
import { useContent } from '@/components/role-adaptive';
import { resumeContent } from '@/data/resume-content';
import { StaggerAnimation, MicroInteraction, FadeIn, ScaleIn } from '@/components/animations';
import { useMobileAnimation } from '@/components/animations/MobileAnimationProvider';

const HeroSection: React.FC = () => {
  const { isHR, isBoss } = useContent();
  const { getAnimationVariants, getTransition } = useMobileAnimation();

  const containerVariants = getAnimationVariants({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    mobile: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.05,
        },
      },
    },
  });

  const itemVariants = getAnimationVariants({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: getTransition({
        duration: 0.6,
        ease: 'easeOut',
      }),
    },
    mobile: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: getTransition({
          duration: 0.4,
          ease: 'easeOut',
        }),
      },
    },
  });

  const avatarVariants = getAnimationVariants({
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: getTransition({
        duration: 0.8,
        ease: 'easeOut',
      }),
    },
    hover: {
      scale: 1.05,
      transition: getTransition({
        duration: 0.3,
      }),
    },
    mobile: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: getTransition({
          duration: 0.6,
          ease: 'easeOut',
        }),
      },
      hover: {
        scale: 1.02,
        transition: getTransition({
          duration: 0.2,
        }),
      },
    },
  });

  return (
    <RoleSection
      id="hero"
      title=""
      background="gradient"
      className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* Avatar */}
        <m.div
          variants={avatarVariants}
          whileHover="hover"
          className="mb-6 sm:mb-8"
        >
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse opacity-20"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold shadow-2xl">
              {resumeContent.personal.name.charAt(0)}
            </div>
            {/* Role indicator */}
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold shadow-lg ${isHR ? 'bg-blue-500' : 'bg-purple-500'
                }`}
            >
              {isHR ? 'HR' : 'Boss'}
            </m.div>
          </div>
        </m.div>

        {/* Name and Title */}
        <m.div variants={itemVariants} className="mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {resumeContent.personal.name}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400">
            <span>{resumeContent.personal.title}</span>
            <span className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>{resumeContent.personal.experience}经验</span>
            <span className="hidden sm:block w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>{resumeContent.personal.location}</span>
          </div>
        </m.div>

        {/* Role-based Tagline */}
        <m.div variants={itemVariants} className="mb-6 sm:mb-8">
          <RoleText
            content={resumeContent.personal.taglines}
            as="p"
            className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed px-4"
          />
        </m.div>

        {/* Role-specific highlights */}
        <m.div variants={itemVariants} className="mb-8 sm:mb-12">
          <ConditionalRender showForRoles={['hr']}>
            <StaggerAnimation
              staggerDelay={0.1}
              animation="scaleIn"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-4"
            >
              {[
                {
                  icon: '⚙️',
                  title: '架构设计',
                  description: '构建高可用微服务架构，支撑千万级并发访问'
                },
                {
                  icon: '🚀',
                  title: '性能优化',
                  description: '深入剖析系统瓶颈，响应速度提升60%'
                },
                {
                  icon: '🛠️',
                  title: '工程化实践',
                  description: '搭建 CI/CD 流水线，发布效率提升80%'
                }
              ]
                .map((item, index) => (
                  <MicroInteraction key={index} type="tap">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </MicroInteraction>
                ))}
            </StaggerAnimation>
          </ConditionalRender>

          <ConditionalRender showForRoles={['boss']}>
            <StaggerAnimation
              staggerDelay={0.1}
              animation="scaleIn"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-4"
            >
              {[
                {
                  icon: '💰',
                  title: '成本优化',
                  description: '为公司节省服务器成本500万+/年'
                },
                {
                  icon: '📈',
                  title: '业务增长',
                  description: '支撑业务GMV增长300%，ROI达1:8'
                },
                {
                  icon: '⚡',
                  title: '交付效率',
                  description: '系统稳定性99.9%，发布效率提升80%'
                }
              ].map((item, index) => (
                <MicroInteraction key={index} type="tap">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </MicroInteraction>
              ))}
            </StaggerAnimation>
          </ConditionalRender>
        </m.div>

        {/* CTA Buttons */}
        <m.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <MicroInteraction type="tap">
            <button
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              {isHR ? '深入了解这份简历' : '继续了解'}
            </button>
          </MicroInteraction>

          <MicroInteraction type="tap">
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 text-sm sm:text-base"
            >
              联系我
            </button>
          </MicroInteraction>
        </m.div>

        {/* Scroll indicator */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-12 sm:mt-16"
        >
          <m.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-gray-500 dark:text-gray-400"
          >
            <span className="text-sm mb-2">向下滚动了解更多</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </m.div>
        </m.div>
      </m.div>
    </RoleSection>
  );
};

export default HeroSection;