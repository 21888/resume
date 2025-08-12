/**
 * 项目成果数据
 * 包含所有项目的详细信息和成果展示
 */

import { ProjectAchievement } from '@/types/project-achievement';

export const projectsData: ProjectAchievement[] = [
  {
    id: 'ecommerce-platform',
    title: '电商平台重构项目',
    description: '主导完成大型电商平台的技术重构，提升系统性能和用户体验，支持日均百万级订单处理。',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-08-30'),
      duration: '7.5个月',
      isOngoing: false,
      milestones: [
        {
          id: 'm1',
          title: '需求分析完成',
          date: new Date('2023-02-15'),
          completed: true,
          importance: 'high'
        },
        {
          id: 'm2',
          title: '架构设计完成',
          date: new Date('2023-03-30'),
          completed: true,
          importance: 'critical'
        },
        {
          id: 'm3',
          title: '核心功能开发完成',
          date: new Date('2023-06-15'),
          completed: true,
          importance: 'high'
        },
        {
          id: 'm4',
          title: '系统上线',
          date: new Date('2023-08-30'),
          completed: true,
          importance: 'critical'
        }
      ]
    },
    metrics: {
      primary: [
        {
          id: 'performance',
          label: '性能提升',
          value: 85,
          unit: '%',
          type: 'percentage',
          trend: 'up',
          color: 'success',
          icon: '⚡'
        },
        {
          id: 'orders',
          label: '日均订单处理',
          value: '120万',
          type: 'text',
          color: 'info',
          icon: '📦'
        },
        {
          id: 'uptime',
          label: '系统可用性',
          value: 99.9,
          unit: '%',
          type: 'percentage',
          color: 'success',
          icon: '🔧'
        }
      ],
      secondary: [
        {
          id: 'cost-saving',
          label: '成本节省',
          value: 300,
          unit: '万元/年',
          type: 'currency',
          color: 'success',
          icon: '💰'
        }
      ],
      kpis: [
        {
          id: 'user-satisfaction',
          label: '用户满意度',
          value: 4.8,
          unit: '/5.0',
          type: 'number',
          weight: 0.4,
          color: 'success',
          threshold: { excellent: 4.5, good: 4.0, acceptable: 3.5 }
        }
      ]
    },
    team: [
      {
        id: 'lead',
        name: '李先生',
        role: '技术负责人',
        isLead: true,
        contribution: '架构设计、团队管理、核心开发'
      },
      {
        id: 'dev1',
        name: '张工程师',
        role: '前端开发',
        contribution: '用户界面开发'
      },
      {
        id: 'dev2',
        name: '王工程师',
        role: '后端开发',
        contribution: 'API开发、数据库优化'
      },
      {
        id: 'qa',
        name: '刘测试',
        role: '测试工程师',
        contribution: '质量保证、自动化测试'
      }
    ],
    technologies: [
      { id: 'react', name: 'React', category: 'frontend', proficiency: 9 },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 9 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'mongodb', name: 'MongoDB', category: 'database', proficiency: 8 },
      { id: 'redis', name: 'Redis', category: 'database', proficiency: 7 },
      { id: 'docker', name: 'Docker', category: 'tool', proficiency: 8 },
      { id: 'k8s', name: 'Kubernetes', category: 'platform', proficiency: 7 }
    ],
    links: [
      {
        id: 'demo',
        title: '项目演示',
        url: '#',
        type: 'demo',
        description: '在线演示环境'
      },
      {
        id: 'docs',
        title: '技术文档',
        url: '#',
        type: 'documentation',
        description: '详细的技术文档'
      }
    ],
    tags: ['电商', '重构', '高并发', '微服务'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-08-30')
  },
  {
    id: 'plugin-suite',
    title: '插件类项目合集',
    description: '包含自动填充内容、修改经纬度、ChatGPT Code 预览 HTML（Claude 效果）、Dify 网页转换知识库、转录博客以及公司内部辅佐等插件，覆盖内容创作、研发效率与知识沉淀等场景。',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-05-05'),
      duration: '5个月',
      isOngoing: false
    },
    metrics: {
      primary: [
        { id: 'plugin-count', label: '插件数量', value: '10+', type: 'text', color: 'info', icon: '🧩' },
        { id: 'workflow-coverage', label: '覆盖工作流', value: '公司内用', type: 'text', color: 'success', icon: '🛠️' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人', isLead: true, contribution: '架构与核心开发' }
    ],
    technologies: [
      { id: 'ts', name: 'TypeScript', category: 'frontend', proficiency: 9 },
      { id: 'react', name: 'React', category: 'frontend', proficiency: 9 },
      { id: 'chrome-ext', name: 'Chrome Extension', category: 'platform', proficiency: 8 }
    ],
    links: [
      { id: 'docs', title: '插件说明文档', url: '#', type: 'documentation' }
    ],
    tags: ['自动填充内容插件', '修改经纬度插件', 'Code 预览 HTML 插件', 'Dify 知识库插件', '转录博客插件', '内部辅佐插件'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-05-05')
  },
  {
    id: 'comfyui-nlp-integration',
    title: 'ComfyUI Stable Diffusion 插件集成 NLP 开发',
    description: '将 ComfyUI 与 NLP 能力深度融合，实现基于自然语言的生成式工作流与可控图像生成。',
    category: 'research',
    status: 'completed',
    timeline: {
      startDate: new Date('2023-03-15'),
      duration: '已完成',
      isOngoing: false,
      estimatedCompletion: new Date('2023-03-15')
    },
    metrics: {
      primary: [
        { id: 'modules', label: '集成模块', value: '大语言模型', type: 'text', color: 'info', icon: '🧠' },
        { id: 'pipeline', label: '生成管线', value: '文本-图像/图像增强', type: 'text', color: 'success', icon: '🖼️' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人', isLead: true, contribution: '方案设计/算法集成' }
    ],
    technologies: [
      { id: 'python', name: 'Python', category: 'backend', proficiency: 9 },
      { id: 'pytorch', name: 'PyTorch', category: 'tool', proficiency: 8 },
      { id: 'comfyui', name: 'ComfyUI', category: 'platform', proficiency: 8 }
    ],
    tags: ['Stable Diffusion', 'NLP', '生成式AI', '工作流'],
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15')
  },
  {
    id: 'chromium-fingerprint-browser',
    title: '基于 Chromium 的指纹浏览器',
    description: '自研指纹浏览器，支持多实例环境隔离、指纹模拟与策略管理，适配矩阵运营与自动化场景。',
    category: 'desktop',
    status: 'completed',
    timeline: {
      startDate: new Date('2022-03-15'),
      endDate: new Date('2022-03-25'),
      duration: '10天',
      isOngoing: false
    },
    metrics: {
      primary: [
        { id: 'isolation', label: '环境隔离', value: '多配置/多实例', type: 'text', color: 'success', icon: '🧪' },
        { id: 'automation', label: '自动化能力', value: '脚本/批量策略', type: 'text', color: 'info', icon: '🤖' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '架构与核心开发', isLead: true }
    ],
    technologies: [
      { id: 'chromium', name: 'Chromium', category: 'platform', proficiency: 8 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'electron', name: 'Electron', category: 'platform', proficiency: 7 }
    ],
    tags: ['指纹', '环境隔离', '自动化'],
    createdAt: new Date('2022-03-15'),
    updatedAt: new Date('2022-03-25')
  },
  {
    id: 'live-stream-lead-gen',
    title: '某音截流获客系统',
    description: '面向某音/某书平台的直播评论数据采集与线索截流系统，稳定处理亿级数据，显著提升获客效率。',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2022-05-01'),
      endDate: new Date('2024-12-31'),
      duration: '2年8个月',
      isOngoing: false
    },
    metrics: {
      primary: [
        { id: 'volume', label: '数据规模', value: '亿级', type: 'text', color: 'info', icon: '🧮' },
        { id: 'efficiency', label: '获客效率', value: '显著提升', type: 'text', color: 'success', icon: '📈' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人', isLead: true, contribution: '系统架构/性能优化' }
    ],
    technologies: [
      { id: 'go', name: 'Go', category: 'backend', proficiency: 8 },
      { id: 'kafka', name: 'Apache Kafka', category: 'platform', proficiency: 7 },
      { id: 'clickhouse', name: 'ClickHouse', category: 'database', proficiency: 7 }
    ],
    images:[
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/1.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/2.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/3.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/4.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/5.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/6.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/7.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/8.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/9.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/10.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/11.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/12.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/13.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/14.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/15.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/live-stream-lead-gen/16.png', alt: '某音截流获客系统', type: 'screenshot', width: 1440, height: 900 },
    ],
    tags: ['实时采集', '大数据', '获客'],
    createdAt: new Date('2022-05-01'),
    updatedAt: new Date('2024-12-31')
  },
  {
    id: 'douyin-matrix-suite',
    title: '某音矩阵软件',
    description: '多账号养号/统计/自动发布一体化，支持自动化养号与环境隔离，面向矩阵运营的效率工具。',
    category: 'desktop',
    status: 'completed',
    timeline: {
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-05'),
      duration: '5天',
      isOngoing: false
    },
    metrics: {
      primary: [
        { id: 'accounts', label: '账号管理', value: '多账号矩阵', type: 'text', color: 'info', icon: '👥' },
        { id: 'isolation', label: '环境隔离', value: '指纹/容器', type: 'text', color: 'success', icon: '🧫' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '架构与核心开发', isLead: true }
    ],
    technologies: [
      { id: 'electron', name: 'Electron', category: 'platform', proficiency: 7 },
      { id: 'ts', name: 'TypeScript', category: 'frontend', proficiency: 9 },
      { id: 'sqlite', name: 'SQLite', category: 'database', proficiency: 7 }
    ],
    tags: ['矩阵', '自动化', '环境隔离', '统计'],
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-10-05')
  },
  {
    id: 'dify-workflow-integration',
    title: 'Dify 工作流集成',
    description: '自动生成 Dify/Coze 工作流配置文件，实现多场景的工作流快速装配与复用，提升团队效率。',
    category: 'api',
    status: 'completed',
    timeline: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      duration: '5天',
      isOngoing: false
    },
    metrics: {
      primary: [
        { id: 'config-gen', label: '配置生成', value: '自动化', type: 'text', color: 'success', icon: '⚙️' },
        { id: 'efficiency', label: '团队效率', value: '显著提升', type: 'text', color: 'info', icon: '🚀' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人', isLead: true }
    ],
    technologies: [
      { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 8 },
      { id: 'golang', name: 'Golang', category: 'backend', proficiency: 7 },
      { id: 'dify', name: 'Dify', category: 'platform', proficiency: 7 }
    ],
    tags: ['工作流', '自动化', 'Dify', 'Coze'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: 'douyin-miniapp-fun-tests',
    title: '抖音小程序（趣味测试类）',
    description: '覆盖心理、情感、性格、游戏、星座、趣味等多种娱乐测试类产品，实现规模化分发与商业化。',
    category: 'mobile',
    status: 'completed',
    timeline: {
      startDate: new Date('2020-06-01'),
      endDate: new Date('2022-02-28'),
      duration: '1年8个月',
      isOngoing: false
    },
    metrics: {
      primary: [
        { id: 'uv', label: '全网用户人次', value: '1000万+', type: 'text', color: 'success', icon: '📈' },
        { id: 'reg', label: '授权注册用户', value: '10万+', type: 'text', color: 'info', icon: '📝' },
        { id: 'ads', label: '单日视频广告监控收益', value: '8K+', type: 'text', color: 'success', icon: '💰' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '产品与全栈开发', isLead: true }
    ],
    technologies: [
      { id: 'douyin-miniapp', name: '抖音小程序', category: 'platform', proficiency: 8 },
      { id: 'ts', name: 'TypeScript', category: 'frontend', proficiency: 8 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'java', name: 'Java', category: 'backend', proficiency: 8 },
      { id: 'mysql', name: 'MySQL', category: 'database', proficiency: 8 },
      { id: 'redis', name: 'Redis', category: 'database', proficiency: 8 }
    ],
    images: [
      { id: 'hero', url: '/images/projects/douyin-miniapp-fun-tests/1.jpg', alt: '抖音小程序（趣味测试类）', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/douyin-miniapp-fun-tests/2.jpg', alt: '抖音小程序（趣味测试类）', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/douyin-miniapp-fun-tests/3.jpg', alt: '抖音小程序（趣味测试类）', type: 'screenshot', width: 1440, height: 900 },
    ],
    tags: ['心理', '情感', '性格', '游戏', '星座', '趣味测试', '商业化'],
    createdAt: new Date('2020-06-01'),
    updatedAt: new Date('2021-12-31')
  },
  {
    id: 'wechat-miniapp-suite',
    title: '微信小程序合集',
    description: '覆盖洗车、红娘、星座测试、菜单食谱、车友群、动态二维码、友链互换、点餐、跑腿、校园租赁、AI 扫描王（OCR+AI）等多行业定制化需求。(多平台, 包含但不限于微信/抖音/快手)',
    category: 'mobile',
    status: 'ongoing',
    timeline: {
      startDate: new Date('2017-05-01'),
      // endDate: new Date('2020-04-30'),
      duration: '进行中',
      isOngoing: true
    },
    metrics: {
      primary: [
        { id: 'coverage', label: '行业覆盖', value: '多行业定制化', type: 'text', color: 'info', icon: '🏷️' },
        { id: 'scenarios', label: '服务场景', value: '广泛', type: 'text', color: 'success', icon: '📦' }
      ],
      kpis: []
    },
    team: [
      { id: 'lead', name: '李先生', role: '全栈开发', isLead: true }
    ],
    technologies: [
      { id: 'wechat-miniapp', name: '微信小程序', category: 'platform', proficiency: 9 },
      { id: 'taro', name: 'Taro', category: 'frontend', proficiency: 7 },
      { id: 'mysql', name: 'MySQL', category: 'database', proficiency: 8 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'java', name: 'Java', category: 'backend', proficiency: 8 },
      { id: 'redis', name: 'Redis', category: 'database', proficiency: 8 },
      { id: 'more', name: '更多', category: 'tool', proficiency: 8 }
    ],
    tags: ['洗车', '红娘', '星座', '菜单食谱', '车友群', '动态二维码', '友链互换', '点餐', '跑腿', '校园租赁', 'AI 扫描王'],
    createdAt: new Date('2016-01-01'),
    updatedAt: new Date('2024-12-31')
  },
  {
    id: 'mobile-app',
    title: '企业移动办公应用',
    description: '开发跨平台移动办公应用，支持考勤、审批、通讯等核心功能，服务企业员工5000+人。',
    category: 'mobile',
    status: 'completed',
    timeline: {
      startDate: new Date('2022-09-01'),
      endDate: new Date('2023-03-15'),
      duration: '6.5个月',
      isOngoing: false
    },
    metrics: {
      primary: [
        {
          id: 'users',
          label: '活跃用户',
          value: '5200+',
          type: 'text',
          color: 'info',
          icon: '👥'
        },
        {
          id: 'rating',
          label: '应用评分',
          value: 4.6,
          unit: '/5.0',
          type: 'number',
          color: 'success',
          icon: '⭐'
        },
        {
          id: 'efficiency',
          label: '办公效率提升',
          value: 40,
          unit: '%',
          type: 'percentage',
          trend: 'up',
          color: 'success',
          icon: '📈'
        }
      ],
      kpis: [
        {
          id: 'adoption-rate',
          label: '用户采用率',
          value: 92,
          unit: '%',
          type: 'percentage',
          weight: 0.5,
          color: 'success',
          threshold: { excellent: 90, good: 80, acceptable: 70 }
        }
      ]
    },
    team: [
      {
        id: 'lead',
        name: '李先生',
        role: '项目经理',
        isLead: true,
        contribution: '项目管理、技术架构'
      },
      {
        id: 'mobile-dev',
        name: '陈开发',
        role: '移动端开发',
        contribution: 'React Native开发'
      },
      {
        id: 'ui-designer',
        name: '林设计',
        role: 'UI设计师',
        contribution: '界面设计、用户体验'
      }
    ],
    technologies: [
      { id: 'react-native', name: 'React Native', category: 'frontend', proficiency: 8 },
      { id: 'expo', name: 'Expo', category: 'platform', proficiency: 7 },
      { id: 'firebase', name: 'Firebase', category: 'backend', proficiency: 7 },
      { id: 'figma', name: 'Figma', category: 'tool', proficiency: 6 }
    ],
    tags: ['移动应用', '企业办公', '跨平台', 'React Native'],
    createdAt: new Date('2022-09-01'),
    updatedAt: new Date('2023-03-15')
  },
  // 微服务架构迁移
  {
    id: 'microservices-migration',
    title: '微服务架构迁移',
    description: '将单体应用拆分为微服务架构, 提升系统可扩展性和维护性, 后续已拓展golang等多语言版本内部自用微服务框架, 并已使用到多个项目中',
    category: 'infrastructure',
    status: 'completed',
    timeline: {
      startDate: new Date('2021-01-15'),
      endDate: new Date('2021-10-30'),
      duration: '9.5个月',
      isOngoing: false
    },
    metrics: {
      primary: [
        {
          id: 'services-count',
          label: '微服务数量',
          value: 18,
          type: 'number',
          color: 'info',
          icon: '🔧'
        },
        {
          id: 'scalability',
          label: '扩展性提升',
          value: 200,
          unit: '%',
          type: 'percentage',
          trend: 'up',
          color: 'success',
          icon: '📈'
        },
        {
          id: 'maintenance',
          label: '维护效率提升',
          value: 50,
          unit: '%',
          type: 'percentage',
          trend: 'up',
          color: 'success',
          icon: '🛠️'
        }
      ],
      kpis: [
        {
          id: 'service-reliability',
          label: '服务可靠性',
          value: 99.5,
          unit: '%',
          type: 'percentage',
          weight: 0.8,
          color: 'success',
          threshold: { excellent: 99, good: 98, acceptable: 95 }
        }
      ]
    },
    team: [
      {
        id: 'lead',
        name: '李先生',
        role: '架构师',
        isLead: true,
        contribution: '微服务架构设计'
      },
      {
        id: 'backend-team',
        name: '后端团队',
        role: '后端开发',
        contribution: '服务拆分与开发'
      }
    ],
    technologies: [
      { id: 'spring-boot', name: 'Spring Boot', category: 'backend', proficiency: 9 },
      { id: 'spring-cloud', name: 'Spring Cloud', category: 'backend', proficiency: 8 },
      { id: 'consul', name: 'Consul', category: 'tool', proficiency: 7 },
      { id: 'istio', name: 'Istio', category: 'platform', proficiency: 6 }
    ],
    tags: ['微服务', '架构迁移', 'Spring Cloud', '分布式'],
    createdAt: new Date('2021-01-15'),
    updatedAt: new Date('2021-10-30')
  },
  // 割草机外贸网站
  {
    id: 'lawnmower-international-site',
    title: '割草机外贸网站',
    description: '面向欧美市场的 B2B 外贸独立站，支持多语言与询盘表单，集成 CRM 管理线索，重点进行 SEO 与性能优化以提升自然流量与转化率。',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2023-04-01'),
      endDate: new Date('2023-06-30'),
      duration: '3个月',
      isOngoing: false,
      milestones: [
        { id: 'lm-m1', title: '信息架构与原型设计', date: new Date('2023-04-10'), completed: true, importance: 'high' },
        { id: 'lm-m2', title: '多语言与询盘表单打通', date: new Date('2023-05-15'), completed: true, importance: 'critical' },
        { id: 'lm-m3', title: '上线与 SEO 基础建设', date: new Date('2023-06-30'), completed: true, importance: 'high' }
      ]
    },
    metrics: {
      primary: [
        { id: 'inquiries-monthly', label: '月均询盘', value: 120, type: 'number', color: 'info', icon: '✉️' },
        { id: 'conversion-improve', label: '转化率提升', value: 65, unit: '%', type: 'percentage', trend: 'up', color: 'success', icon: '📈' },
        { id: 'pagespeed-mobile', label: 'PageSpeed(移动端)', value: 92, type: 'number', color: 'success', icon: '⚡' }
      ],
      secondary: [
        { id: 'organic-growth', label: '自然流量增长', value: 180, unit: '%', type: 'percentage', trend: 'up', color: 'success' }
      ],
      kpis: [
        {
          id: 'lead-quality',
          label: '高质量线索占比',
          value: 0.72,
          type: 'number',
          weight: 0.5,
          color: 'success',
          threshold: { excellent: 0.7, good: 0.6, acceptable: 0.5 }
        }
      ]
    },
    team: [
      { id: 'lead', name: '李先生', role: '全栈开发/项目负责人', isLead: true, contribution: '架构设计、SEO/性能优化、表单与 CRM 集成' },
      // { id: 'designer', name: '王设计', role: 'UI/UX 设计', contribution: '品牌视觉与组件库' }
    ],
    technologies: [
      { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 9 },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 9 },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', proficiency: 8 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'mysql', name: 'MySQL', category: 'database', proficiency: 7 },
      { id: 'nginx', name: 'Nginx', category: 'platform', proficiency: 7 }
    ],
    links: [
      { id: 'demo', title: '线上演示', url: 'http://lawnbot.cn/', type: 'demo' },
      { id: 'docs', title: '项目说明', url: '#', type: 'documentation' }
    ],
    images: [
      { id: 'hero', url: '/images/projects/lawnmower-international-site/1.png', alt: '割草机外贸网站首页', type: 'screenshot', width: 1280, height: 720 },
      { id: 'hero', url: '/images/projects/lawnmower-international-site/2.png', alt: '割草机外贸网站首页', type: 'screenshot', width: 1280, height: 720 },
    ],
    tags: ['外贸独立站', 'B2B', '多语言', 'SEO', '询盘'],
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date('2023-06-30')
  },
  // 机械行业大型全球国际站
  {
    id: 'industrial-global-site',
    title: '机械行业大型全球国际站',
    description: '对标主流国际站的机械行业大型官网，覆盖多语言与多地区交付。利用 AI 大模型接管客服问答、产品介绍与产品对比等传统操作，显著提升转化率与服务效率。',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      duration: '12个月',
      isOngoing: false,
      milestones: [
        { id: 'ig-m1', title: '架构与国际化方案确定（i18n/多区域）', date: new Date('2024-02-01'), completed: true, importance: 'critical' },
        { id: 'ig-m2', title: 'AI 客服/产品顾问接入（对话/对比/推荐）', date: new Date('2024-06-01'), completed: true, importance: 'critical' },
        { id: 'ig-m3', title: '全球加速与 SEO 深度优化（CDN/SSR/预渲染）', date: new Date('2024-09-01'), completed: true, importance: 'high' },
        { id: 'ig-m4', title: '正式上线与转化漏斗优化', date: new Date('2024-12-31'), completed: true, importance: 'high' }
      ]
    },
    metrics: {
      primary: [
        { id: 'ai-coverage', label: 'AI 接管覆盖率', value: 85, unit: '%', type: 'percentage', trend: 'up', color: 'success', icon: '🤖' },
        { id: 'csat', label: '客服满意度', value: 4.99, unit: '/5.0', type: 'number', color: 'success', icon: '⭐' },
        { id: 'rt', label: '平均响应时间', value: 0.3, unit: '秒', type: 'number', color: 'info', icon: '⚡' }
      ],
      secondary: [
        { id: 'organic', label: '自然流量同比', value: 220, unit: '%', type: 'percentage', trend: 'up', color: 'success' },
        { id: 'conversion', label: '询盘转化率', value: 35, unit: '%', type: 'percentage', trend: 'up', color: 'success' }
      ],
      kpis: [
        {
          id: 'self-service',
          label: '自助解决率',
          value: 0.68,
          type: 'number',
          weight: 0.5,
          color: 'success',
          threshold: { excellent: 0.65, good: 0.55, acceptable: 0.45 }
        },
        {
          id: 'global-ttfb',
          label: '全球平均 TTFB(秒)',
          value: 0.45,
          type: 'number',
          weight: 0.3,
          color: 'info',
          threshold: { excellent: 0.6, good: 0.8, acceptable: 1.2 }
        }
      ]
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人/全栈独立开发', isLead: true, contribution: '整体架构、国际化、性能与 SEO、AI 能力接入' },
      { id: 'ai-eng', name: '翰岳集团', role: '新媒体全部成员', contribution: '新媒体部门成员全部参与数据训练等阶段' }
    ],
    technologies: [
      { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 9 },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 9 },
      { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', proficiency: 8 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'postgres', name: 'PostgreSQL', category: 'database', proficiency: 7 },
      { id: 'redis', name: 'Redis', category: 'database', proficiency: 7 },
      { id: 'nginx', name: 'Nginx', category: 'platform', proficiency: 7 },
      { id: 'langchain', name: 'LangChain', category: 'tool', proficiency: 8 },
      { id: 'openai', name: 'OpenAI API', category: 'platform', proficiency: 8 },
      { id: 'vercel-ai', name: 'Vercel AI SDK', category: 'tool', proficiency: 7 },
      { id: 'cloudflare', name: 'Cloudflare CDN', category: 'platform', proficiency: 7 }
    ],
    links: [
      { id: 'demo', title: '线上网站', url: '#', type: 'demo' },
      { id: 'docs', title: '技术方案', url: '#', type: 'documentation' }
    ],
    images: [
      { id: 'hero', url: '/images/projects/industrial-global-site/1.jpg', alt: '机械行业全球国际站首页', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/industrial-global-site/2.jpg', alt: '机械行业全球国际站首页', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/industrial-global-site/3.jpg', alt: '机械行业全球国际站首页', type: 'screenshot', width: 1440, height: 900 },
    ],
    tags: ['全球化', '多语言', 'AI 客服', '产品对比', 'SEO', '对标主流'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-31')
  },
  // 地板外贸网站
  {
    id: 'softlay-floor-site',
    title: '地板外贸网站（Soft Lay Floor）',
    description: '长期服务客户 Soft Lay Floor 的外贸独立站，围绕 Vinyl Soft Lay Floor 产品打造营销与转化闭环，支持多语言、询盘表单、内容营销与 SEO 持续优化（2022-2025 持续服务）。参考站点内容：Vinyl Soft Lay Floor，Perfect soft touch，Silent to walk，Water resistant 等产品卖点。',
    category: 'web',
    status: 'ongoing',
    timeline: {
      startDate: new Date('2022-01-01'),
      duration: '进行中',
      isOngoing: true,
      milestones: [
        { id: 'sf-m1', title: '首版上线（品牌与产品线梳理）', date: new Date('2022-06-01'), completed: true, importance: 'high' },
        { id: 'sf-m2', title: 'SEO 与内容运营体系搭建', date: new Date('2023-03-01'), completed: true, importance: 'high' },
        { id: 'sf-m3', title: '移动端体验与性能（Core Web Vitals）优化', date: new Date('2024-04-01'), completed: true, importance: 'critical' },
        { id: 'sf-m4', title: '新品与场景内容扩充（持续）', date: new Date('2025-01-01'), completed: true, importance: 'medium' }
      ]
    },
    metrics: {
      primary: [
        { id: 'organic-growth', label: '自然流量增长', value: 150, unit: '%', type: 'percentage', trend: 'up', color: 'success', icon: '📈' },
        { id: 'inquiries', label: '月均询盘', value: 60, type: 'number', color: 'info', icon: '✉️' },
        { id: 'ps-mobile', label: 'PageSpeed(移动端)', value: 90, type: 'number', color: 'success', icon: '⚡' }
      ],
      secondary: [
        { id: 'bounce-reduce', label: '跳出率下降', value: 30, unit: '%', type: 'percentage', trend: 'up', color: 'success' }
      ],
      kpis: [
        {
          id: 'lead-conv',
          label: '询盘转化率',
          value: 0.22,
          type: 'number',
          weight: 0.5,
          color: 'success',
          threshold: { excellent: 0.2, good: 0.15, acceptable: 0.1 }
        }
      ]
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人/全栈', isLead: true, contribution: '前后端与部署、性能/SEO 优化、转化漏斗搭建' }
    ],
    technologies: [
      { id: 'wordpress', name: 'WordPress', category: 'platform', proficiency: 8 },
      { id: 'javascript', name: 'JavaScript', category: 'frontend', proficiency: 8 },
      { id: 'php', name: 'PHP', category: 'backend', proficiency: 7 },
      { id: 'mysql', name: 'MySQL', category: 'database', proficiency: 7 },
      { id: 'nginx', name: 'Nginx', category: 'platform', proficiency: 7 },
      { id: 'cloudflare', name: 'Cloudflare CDN', category: 'platform', proficiency: 7 },
      { id: 'ga4', name: 'Google Analytics 4', category: 'tool', proficiency: 7 }
    ],
    links: [
      { id: 'site', title: '官网（Soft Lay Floor）', url: 'https://www.softlayfloor.com/', type: 'demo' }
    ],
    images: [
      { id: 'hero', url: '/images/projects/softlay-floor-site/1.png', alt: 'Soft Lay Floor 官网首页', type: 'screenshot', width: 1440, height: 900 },
      { id: 'hero', url: '/images/projects/softlay-floor-site/2.png', alt: 'Soft Lay Floor 官网首页', type: 'screenshot', width: 1440, height: 900 },
    ],
    tags: ['地板', '外贸', '多语言', 'SEO', '询盘'],
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2024-10-01')
  },
  // wordpress自动发布文章coze工作流
  {
    id: 'wp-auto-post-coze-workflow',
    title: 'WordPress 自动发布文章（Coze 工作流）',
    description: '通过 Coze 工作流与 WordPress REST API 打通，实现从内容生成、审核到自动发布的一体化自动化流程。支持定时触发、草稿审核、图片自动处理与多分类分发。',
    category: 'api',
    status: 'completed',
    timeline: {
      startDate: new Date('2025-01-05'),
      endDate: new Date('2025-01-05'),
      duration: '1天',
      isOngoing: false,
      milestones: [
        { id: 'wpcoze-m1', title: 'Coze 工作流编排与测试', date: new Date('2025-01-05'), completed: true, importance: 'high' },
        { id: 'wpcoze-m2', title: '对接 WordPress REST API 并验证发布', date: new Date('2025-01-05'), completed: true, importance: 'critical' }
      ]
    },
    metrics: {
      primary: [
        { id: 'posts-per-run', label: '累计收录文章', value: '10w+', type: 'number', color: 'info', icon: '📰' },
        { id: 'time-saved', label: '人力节省', value: 90, unit: '%', type: 'percentage', trend: 'up', color: 'success', icon: '⏱️' }
      ],
      secondary: [
        { id: 'image-auto', label: '图片自动处理覆盖率', value: 80, unit: '%', type: 'percentage', trend: 'up', color: 'success' }
      ],
      kpis: [
        {
          id: 'success-rate',
          label: '自动发布成功率',
          value: 98,
          unit: '%',
          type: 'percentage',
          weight: 0.6,
          color: 'success',
          threshold: { excellent: 95, good: 90, acceptable: 80 }
        }
      ]
    },
    team: [
      { id: 'lead', name: '李先生', role: '全栈/自动化集成', isLead: true, contribution: 'Coze 编排、WP API 对接、鉴权与容错' }
    ],
    technologies: [
      { id: 'wordpress', name: 'WordPress', category: 'platform', proficiency: 8 },
      { id: 'wp-rest', name: 'WordPress REST API', category: 'tool', proficiency: 8 },
      { id: 'coze', name: 'Coze', category: 'platform', proficiency: 8 },
      { id: 'openai', name: 'OpenAI API', category: 'platform', proficiency: 7 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 7 }
    ],
    links: [
      { id: 'site', title: 'coze链接', url: 'https://www.coze.cn/store/project/7520551560565456936?bid=6h5gfe87g9g18&entity_id=1', type: 'demo' }
    ],
    images: [
      { id: 'flow', url: '/images/projects/wp-auto-post-coze-workflow/1.png', alt: 'WordPress × Coze 自动发布流程图', type: 'diagram', width: 1280, height: 720 },
      { id: 'flow', url: '/images/projects/wp-auto-post-coze-workflow/2.png', alt: 'WordPress × Coze 自动发布流程图', type: 'diagram', width: 1280, height: 720 },
      { id: 'flow', url: '/images/projects/wp-auto-post-coze-workflow/3.png', alt: 'WordPress × Coze 自动发布流程图', type: 'diagram', width: 1280, height: 720 },
    ],
    tags: ['WordPress', 'Coze', '自动化', '内容发布', 'REST API'],
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05')
  },
  // 某因根据关键词批量私信用户矩阵系统
  {
    id: 'douyin-keyword-dm-matrix',
    title: '某因关键词批量私信矩阵系统',
    description: '网页客户端将关键词添加至队列，Python GUI 客户端调用指纹浏览器进行多实例并发，按限速策略对目标用户批量发送私信；包含队列去重、黑白名单、失败重试、状态回写与监控告警等功能（在指纹浏览器与自动化基础上迭代完成）。',
    category: 'web',
    status: 'completed',
    timeline: {
      startDate: new Date('2025-07-05'),
      endDate: new Date('2025-07-07'),
      duration: '3天',
      isOngoing: false,
      milestones: [
        { id: 'dm-m1', title: '关键词队列与限速/黑白名单策略', date: new Date('2025-07-05'), completed: true, importance: 'high' },
        { id: 'dm-m2', title: 'Python GUI × 指纹浏览器并发发送', date: new Date('2025-07-06'), completed: true, importance: 'critical' },
        { id: 'dm-m3', title: '联调上线与监控告警', date: new Date('2025-07-07'), completed: true, importance: 'high' }
      ]
    },
    metrics: {
      primary: [
        { id: 'daily-throughput', label: '日均发送量', value: '视账号数而定', type: 'text', color: 'info', icon: '📨' },
        { id: 'success-rate', label: '发送成功率', value: 95, unit: '%', type: 'percentage', trend: 'up', color: 'success', icon: '✅' },
        { id: 'concurrency', label: '并发实例', value: '无限', type: 'text', color: 'info', icon: '⚙️' }
      ],
      secondary: [
        { id: 'ban-rate', label: '封禁率', value: 0.8, unit: '%', type: 'percentage', trend: 'down', color: 'success' },
        { id: 'queue-p95', label: '队列延迟 P95', value: 1.2, unit: '秒', type: 'number', color: 'info' }
      ],
      kpis: [
        {
          id: 'effective-reach',
          label: '有效触达率',
          value: 0.7,
          type: 'number',
          weight: 0.6,
          color: 'success',
          threshold: { excellent: 0.65, good: 0.55, acceptable: 0.45 }
        }
      ]
    },
    team: [
      { id: 'lead', name: '李先生', role: '技术负责人/全栈', isLead: true, contribution: '架构方案、队列/限流/重试策略、GUI 与指纹浏览器联动' }
    ],
    technologies: [
      { id: 'nextjs', name: 'Next.js', category: 'frontend', proficiency: 8 },
      { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 9 },
      { id: 'nodejs', name: 'Node.js', category: 'backend', proficiency: 8 },
      { id: 'redis', name: 'Redis', category: 'database', proficiency: 8 },
      { id: 'postgres', name: 'PostgreSQL', category: 'database', proficiency: 7 },
      { id: 'python', name: 'Python', category: 'backend', proficiency: 8 },
      { id: 'fastapi', name: 'FastAPI', category: 'backend', proficiency: 7 },
      { id: 'chromium', name: 'Chromium 指纹浏览器', category: 'platform', proficiency: 8 },
      { id: 'playwright', name: 'Playwright', category: 'tool', proficiency: 7 }
    ],
    links: [
      { id: 'docs', title: '系统说明文档', url: '#', type: 'documentation' }
    ],
    images: [
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/1.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/2.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/3.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/4.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/5.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/6.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/7.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/8.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/9.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
      { id: 'ui', url: '/images/projects/douyin-keyword-dm-matrix/10.png', alt: '关键词批量私信矩阵系统界面', type: 'screenshot', width: 1440, height: 900 },
    ],
    tags: ['矩阵', '批量私信', '关键词队列', '指纹浏览器', '自动化'],
    createdAt: new Date('2025-07-05'),
    updatedAt: new Date('2025-07-07')
  },
];

// 根据角色过滤项目数据
export const getProjectsByRole = (role: 'hr' | 'boss' | null): ProjectAchievement[] => {
  if (!role) return projectsData;
  
  // 可以根据不同角色返回不同的项目重点
  return projectsData.map(project => ({
    ...project,
    // HR更关注团队协作和管理能力
    // Boss更关注业务价值和ROI
  }));
};

// 获取项目统计信息
export const getProjectStats = () => {
  const completed = projectsData.filter(p => p.status === 'completed').length;
  const ongoing = projectsData.filter(p => p.status === 'ongoing').length;
  const totalTechnologies = new Set(
    projectsData.flatMap(p => p.technologies.map(t => t.name))
  ).size;
  
  return {
    total: projectsData.length,
    completed,
    ongoing,
    totalTechnologies,
    categories: {
      web: projectsData.filter(p => p.category === 'web').length,
      mobile: projectsData.filter(p => p.category === 'mobile').length,
      api: projectsData.filter(p => p.category === 'api').length,
      infrastructure: projectsData.filter(p => p.category === 'infrastructure').length,
    }
  };
};