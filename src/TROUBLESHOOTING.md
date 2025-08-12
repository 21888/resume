# 故障排除指南

## "Element type is invalid" 错误修复

如果您遇到 "Element type is invalid" 错误，请按以下步骤操作：

### 1. 使用安全导出

```typescript
// 在您的 AppProviders 中使用安全导出
import { SafeProvider, MinimalExample } from './src/safe-exports';

export const AppProviders = ({ children }) => {
  return (
    <SafeProvider>
      {children}
    </SafeProvider>
  );
};
```

### 2. 使用最小示例

```typescript
// 使用不依赖 framer-motion 的组件
import { SimpleContainer, SimpleCard } from './src/components';
import { MinimalExample } from './src/examples/MinimalExample';

// 直接使用最小示例
function App() {
  return <MinimalExample />;
}
```

### 3. 检查依赖项

确保安装了必需的依赖项：

```bash
npm install react react-dom
# 如果使用完整功能，还需要：
npm install framer-motion
```

### 4. 逐步集成

按以下顺序逐步添加组件：

1. 首先使用 `MinimalExample`
2. 然后尝试 `SimpleExample`
3. 最后使用 `CompleteExample`

### 5. 常见问题

**问题**: framer-motion 导入错误
**解决**: 使用 SimpleCard 和 SimpleContainer 组件

**问题**: 循环依赖
**解决**: 使用 safe-exports.ts 中的组件

**问题**: TypeScript 错误
**解决**: 确保所有类型都正确导入

### 6. 最小工作示例

```typescript
import React from 'react';
import { SimpleContainer } from './src/components/SimpleContainer';

const projects = [
  {
    id: '1',
    title: 'Test Project',
    description: 'A test project',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date(),
      duration: '1 month',
      isOngoing: false,
      milestones: [],
    },
    metrics: { primary: [], kpis: [] },
    team: [{ id: '1', name: 'Developer', role: 'Dev' }],
    technologies: [{ id: '1', name: 'React', category: 'frontend' }],
    tags: ['test'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export default function App() {
  return (
    <div className="p-8">
      <SimpleContainer projects={projects} />
    </div>
  );
}
```

这个示例应该可以正常工作，不会出现导入错误。