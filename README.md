# 李先生个人「产品化」简历网站

这是一个基于 Next.js 15 构建的现代化个人简历网站，具有角色自适应内容展示功能。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **图表**: Chart.js
- **状态管理**: Zustand
- **内容管理**: MDX

## 功能特性

- 🎯 角色自适应内容（HR vs Boss 视角）
- 🎨 现代化 UI 设计与动画效果
- 📱 响应式设计，支持移动端
- ♿ 完整的无障碍支持
- 🌙 深色/浅色主题切换
- 📊 交互式技能雷达图
- 📝 MDX 驱动的内容管理

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

## 项目结构

```
src/
├── app/                          # Next.js App Router
├── components/                   # 可复用组件
│   ├── ui/                      # 基础 UI 组件
│   ├── sections/                # 页面区块组件
│   ├── animations/              # 动画包装组件
│   └── role-adaptive/           # 角色自适应组件
├── content/                     # MDX 内容文件
├── hooks/                       # 自定义 React Hooks
├── lib/                         # 工具函数和配置
├── store/                       # Zustand 状态管理
├── types/                       # TypeScript 类型定义
└── utils/                       # 辅助函数
```

## 开发环境

推荐使用 VSCode Dev Containers 进行开发，确保环境一致性。

## 许可证

MIT License