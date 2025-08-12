import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '页面未找到 - 404',
  description: '抱歉，您访问的页面不存在',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">页面未找到</h2>
          <p className="text-lg text-gray-600 mb-8">
            抱歉，您访问的页面不存在或已被移动
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            返回首页
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>如果您认为这是一个错误，请联系网站管理员</p>
          </div>
        </div>
      </div>
    </div>
  );
}