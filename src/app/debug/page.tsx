/**
 * Debug page to test functionality
 */

'use client';

import { useSimpleRole, SimpleRoleProvider } from '@/components/simple/SimpleRoleProvider';
import Link from 'next/link';

function DebugContent() {
  const { role, setRole, isLoading } = useSimpleRole();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">调试页面</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">角色状态</h2>
          <div className="space-y-2">
            <p><strong>当前角色:</strong> {role || '未选择'}</p>
            <p><strong>加载状态:</strong> {isLoading ? '加载中' : '已完成'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">角色切换</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['hr', 'tech_lead', 'developer', 'client'].map((roleType) => (
              <button
                key={roleType}
                onClick={() => setRole(roleType as any)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  role === roleType 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {roleType}
              </button>
            ))}
          </div>
          <button
            onClick={() => setRole(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            清除角色
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">导航测试</h2>
          <div className="space-x-4">
            <Link href="/" className="text-blue-600 hover:underline">首页</Link>
            <Link href="/home" className="text-blue-600 hover:underline">主页</Link>
            <Link href="/test" className="text-blue-600 hover:underline">测试页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DebugPage() {
  return (
    <SimpleRoleProvider>
      <DebugContent />
    </SimpleRoleProvider>
  );
}