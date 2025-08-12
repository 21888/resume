/**
 * Test page to verify the setup works
 */

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          测试页面
        </h1>
        <p className="text-gray-600">
          如果你能看到这个页面，说明基本设置正常工作了！
        </p>
        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <p className="text-green-800">
            ✅ React 组件正常渲染
          </p>
          <p className="text-green-800">
            ✅ Tailwind CSS 样式正常加载
          </p>
          <p className="text-green-800">
            ✅ Next.js 路由正常工作
          </p>
        </div>
      </div>
    </div>
  );
}