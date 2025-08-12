/**
 * Contact section with multiple contact methods
 */

'use client';

import { useState } from 'react';
import { m } from 'framer-motion';
import { RoleSection, ConditionalRender } from '@/components/role-adaptive';
import { useContent } from '@/components/role-adaptive';
import { resumeContent } from '@/data/resume-content';

const ContactSection: React.FC = () => {
  const { isHR, isBoss } = useContent();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contact = resumeContent.contact;

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const contactMethods = [
    {
      id: 'phone',
      icon: '📱',
      label: '手机号码',
      value: contact.phone,
      action: () => window.open(`tel:${contact.phone}`),
      copyable: true,
    },
    {
      id: 'email',
      icon: '📧',
      label: '邮箱地址',
      value: contact.email,
      action: () => window.open(`mailto:${contact.email}`),
      copyable: true,
    },
    {
      id: 'wechat',
      icon: '💬',
      label: '微信号',
      value: contact.wechat,
      action: () => {},
      copyable: true,
    },
    {
      id: 'github',
      icon: '🔗',
      label: 'GitHub',
      value: 'github.com/21888',
      action: () => window.open(contact.github, '_blank'),
      copyable: false,
    },
    {
      id: 'Telegram',
      icon: '🤖',
      label: 'Telegram',
      value: '#',
      action: () => window.open(contact.linkedin, '_blank'),
      copyable: false,
    },
  ];

  return (
    <RoleSection
      id="contact"
      title="联系方式"
      subtitle={{
        hr: '期待与您深入交流团队管理经验',
        boss: '期待与您探讨技术合作机会',
      }}
      background="default"
    >
      <div className="max-w-4xl mx-auto">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <m.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={method.action}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{method.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {method.label}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {method.value}
                </p>
                
                {method.copyable && (
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(method.value, method.id);
                    }}
                    className={`px-4 py-2 text-xs rounded-lg font-medium transition-all duration-200 ${
                      copiedField === method.id
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {copiedField === method.id ? '已复制!' : '复制'}
                  </m.button>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {/* QR Code Section */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12"
        >
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              微信扫码联系
            </h4>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    微信二维码
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {contact.wechat}
                  </p>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {isHR ? '扫码添加，深入交流' : '扫码添加，商务合作'}
                </h5>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <ConditionalRender showForRoles={['hr']}>
                    <>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        团队管理经验分享
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        人才培养方案讨论
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        技术团队建设咨询
                      </li>
                    </>
                  </ConditionalRender>
                  
                  <ConditionalRender showForRoles={['boss']}>
                    <>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        技术架构方案讨论
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        业务价值创造分析
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        项目合作机会探讨
                      </li>
                    </>
                  </ConditionalRender>
                </ul>
              </div>
            </div>
          </div>
        </m.div>

        {/* Call to Action */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {isHR ? '让我们一起打造卓越团队' : '让我们一起创造商业价值'}
            </h4>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {isHR 
                ? '我相信通过有效的团队管理和人才培养，我们可以打造一支高效、稳定、持续成长的技术团队。'
                : '我相信通过技术创新和精细化管理，我们可以为您的企业创造可观的商业价值和投资回报。'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`mailto:${contact.email}?subject=${isHR ? '团队管理职位咨询' : '技术合作洽谈'}`)}
                className={`px-8 py-4 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isHR 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-700'
                }`}
              >
                {isHR ? '发送邮件咨询' : '发送合作邮件'}
              </m.button>
              
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`tel:${contact.phone}`)}
                className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 transition-all duration-300"
              >
                电话联系
              </m.button>
              
              <m.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(contact.pdfUrl, '_blank')}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                下载简历
              </m.button>
            </div>
          </div>
        </m.div>

        {/* Footer Links */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center space-x-6">
            <m.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </m.a>
            
            <m.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </m.a>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            © 2024 李先生. 期待与您的合作机会.
          </p>
        </m.div>
      </div>
    </RoleSection>
  );
};

export default ContactSection;