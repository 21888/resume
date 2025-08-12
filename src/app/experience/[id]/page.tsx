'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useRole } from '@/components/role-adaptive';
import { m } from 'framer-motion';
import PageLayout from '@/components/ui/PageLayout';

export default function ExperienceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { role, isLoading } = useRole();
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      setProjectId(params.id as string);
    }
  }, [params.id]);

  // Redirect to landing if no role is selected
  useEffect(() => {
    if (!role && !isLoading) {
      router.push('/');
    }
  }, [role, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">正在加载项目详情...</p>
        </m.div>
      </div>
    );
  }

  if (!role || !projectId) {
    return null;
  }

  return (
    <PageLayout>
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <m.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回</span>
        </m.button>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Project Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                项目 #{projectId}
              </h1>
              <p className="text-xl opacity-90">
                {role === 'hr' 
                  ? '团队协作与人员管理视角的项目详情' 
                  : '业务成果与ROI视角的项目详情'
                }
              <small>...(有空再写)</small>
              </p>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    项目概述
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    这里将展示项目的详细信息，包括技术栈、开发周期、团队规模等内容。
                    根据您选择的身份（{role === 'hr' ? 'HR' : 'Boss'}），
                    内容将重点展示{role === 'hr' ? '团队协作和人员管理' : '业务价值和投资回报'}相关信息。
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {role === 'hr' ? '团队管理亮点' : '业务成果亮点'}
                  </h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {role === 'hr' 
                            ? `团队协作成果 ${item}：具体的团队管理和培养成果描述...`
                            : `业务成果 ${item}：具体的业务指标和ROI数据描述...`
                          }
                        </p>
                      </div>
                    ))}
                  </div>
                </m.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <m.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    项目信息
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">项目周期</span>
                      <p className="text-gray-900 dark:text-white">6个月</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">团队规模</span>
                      <p className="text-gray-900 dark:text-white">8人</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">技术栈</span>
                      <p className="text-gray-900 dark:text-white">React, Node.js, MongoDB</p>
                    </div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    相关链接
                  </h3>
                  <div className="space-y-2">
                    <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                      项目演示
                    </a>
                    <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                      技术文档
                    </a>
                    <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                      代码仓库
                    </a>
                  </div>
                </m.div>
              </div>
            </div>
        </m.div>
      </div>
    </PageLayout>
  );
}