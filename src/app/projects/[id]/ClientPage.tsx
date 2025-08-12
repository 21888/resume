'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import PageLayout from '@/components/ui/PageLayout';
import { useRole } from '@/components/role-adaptive';
import { DetailedProjectView } from '@/components/expandable';
import { projectsData } from '@/data/projects';
import type { ProjectAchievement } from '@/types/project-achievement';

export default function ClientPage() {
  const router = useRouter();
  const params = useParams();
  const { role, isLoading } = useRole();
  const [project, setProject] = useState<ProjectAchievement | null>(null);

  useEffect(() => {
    const id = params?.id as string | undefined;
    if (id) {
      const found = projectsData.find(p => p.id === id) || null;
      setProject(found);
    }
  }, [params]);

  // 若未选择角色，则返回首页要求选择
  useEffect(() => {
    if (!role && !isLoading) {
      router.push('/');
    }
  }, [role, isLoading, router]);

  if (isLoading || !params?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">正在加载项目详情...</p>
        </m.div>
      </div>
    );
  }

  if (!project) {
    return (
      <PageLayout>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-semibold mb-2">未找到该项目</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">请检查链接是否正确，或返回项目列表。</p>
            <button
              onClick={() => router.push('/projects')}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              返回项目列表
            </button>
          </m.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <m.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>返回</span>
        </m.button>

        <DetailedProjectView project={project} />
      </div>
    </PageLayout>
  );
}

