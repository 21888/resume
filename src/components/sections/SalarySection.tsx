/**
 * Salary section with role-based benefits display
 */

'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RoleSection, RoleText, RoleList, ConditionalRender } from '@/components/role-adaptive';
import { useContent } from '@/components/role-adaptive';
import { resumeContent } from '@/data/resume-content';

const SalarySection: React.FC = () => {
  const { isHR, isBoss } = useContent();
  const [showBenefits, setShowBenefits] = useState(false);

  const salary = resumeContent.salary;

  return (
    <RoleSection
      id="salary"
      title="薪资期望"
      subtitle={{
        hr: '具有竞争力的薪资待遇和完善的福利体系',
        boss: '合理的投资回报，创造更大的商业价值',
      }}
      background="gradient"
    >
      <div className="max-w-4xl mx-auto">
        {/* Main Salary Info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {salary.range}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {salary.location} · {salary.negotiable ? '可面议' : '固定薪资'}
                </p>
              </div>
            </div>
            
            {salary.notes && (
              <RoleText
                content={salary.notes}
                as="p"
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              />
            )}
          </div>

          {/* Salary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ConditionalRender showForRoles={['hr']}>
              <>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    10K-35K
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">基本月薪</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    固定双休
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">节假日</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    根据业绩调整
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">长期激励</div>
                </div>
              </>
            </ConditionalRender>

            <ConditionalRender showForRoles={['boss']}>
              <>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    1:8
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">投资回报比</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    500万+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">年度价值创造</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    可面议
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">根据业绩调整</div>
                </div>
              </>
            </ConditionalRender>
          </div>

          {/* Benefits Toggle */}
          <ConditionalRender >
            <div className="text-center">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBenefits(!showBenefits)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {showBenefits ? '收起技术顾问详情' : '查看成为技术顾问'}
              </m.button>
            </div>
          </ConditionalRender>
        </m.div>

        {/* Benefits Details */}
        <ConditionalRender >
          <AnimatePresence>
            {showBenefits && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
              >
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  技术顾问价格
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs">💻</span>
                      </span>
                      远程服务
                    </h5>
                    <RoleList
                      items={salary.benefits}
                      className="space-y-2"
                      itemClassName="flex items-start space-x-2"
                      renderItem={(item, index) => (
                        <>
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{item}</span>
                        </>
                      )}
                    />
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs">🏠</span>
                      </span>
                      上门服务 (全国范围内差旅费都需要报销)
                    </h5>
                    <ul className="space-y-2">
                      {[
                        '单次: 每次上门服务收费 1000元/次',
                        '包月: 上门服务 2000元/3次',
                        '超过套餐次数后，每次上门服务收费 500元/次',
                        '包月套餐合作期间每月可提供免费远程服务1次'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </ConditionalRender>

        {/* Value Proposition */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center"
        >
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {isHR ? '投资于人才，收获于未来' : '合理投资，创造价值'}
          </h4>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            {isHR 
              ? '我相信优秀的团队管理者值得相应的回报，同时我也会用实际行动证明这份投资的价值。'
              : '我的技术能力和管理经验将为公司创造远超薪资成本的商业价值，这是一笔值得的投资。'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-8 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                isHR 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-700'
              }`}
            >
              {isHR ? '联系我详谈' : '商务洽谈'}
            </m.button>
            
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(resumeContent.contact.pdfUrl, '_blank')}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
            >
              下载简历PDF
            </m.button>
          </div>
        </m.div>
      </div>
    </RoleSection>
  );
};

export default SalarySection;