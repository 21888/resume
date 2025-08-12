/**
 * Resume content data with role-adaptive content
 */

import { ResumeContent } from '@/types';

export const resumeContent: ResumeContent = {
  personal: {
    name: '李先生',
    title: '技术经理(全栈)',
    experience: '8年',
    avatar: '/images/avatar.jpg',
    location: '济宁',
    taglines: {
      hr: 'AI时代，技术驱动传统产业',
      boss: 'AI时代，技术驱动业务，助力公司降本增效',
    },

  },

  about: {
    hr: {
      tagline: '以技术为核心，构建高质量、可扩展的解决方案',
      coreValues: [
        '技术卓越：持续探索前沿技术，推动架构与工具创新',
        '工程质量：实践最佳工程规范，确保高可维护性与稳定性',
        '性能优化：精准定位瓶颈，提升系统响应速度与吞吐能力',
      ],
      description: '8年技术沉淀，擅长从零构建高可用分布式系统。精通系统架构设计、性能调优与工程化实践，通过技术驱动业务增长与创新。',
    },

    boss: {
      tagline: '技术驱动业务，创新创造价值',
      coreValues: [
        '业务导向：深度理解业务需求，技术方案直击痛点',
        '成本控制：优化开发流程，提升交付效率，降低运营成本',
        'ROI最大化：每个技术决策都以投资回报率为核心考量',
      ],
      description: '8年技术管理经验，专注于技术与业务的深度融合。通过技术创新推动业务增长，优化成本结构，为公司创造可观的商业价值。',
    },
  },


  experience: [
    {
      id: 'exp-6',
      title: '技术经理',
      company: '高新区某集团公司',
      duration: '2023.01 - 2024.12',
      techStack: ['全栈开发','国内外电商全平台运营','抖店','快手小店','淘宝','阿里','ebay','亚马逊','tiktok','facebook','youtube','独立站等'],
      responsibilities: {
        hr: [
          '组建并管理 10 人以上业务板块项目团队',
          '将AI概念引入团队,优化日常工作流程',
          '组织定期培训',
          '开发大型获客工具系统数个(亿级)',
        ],
        boss: [
          '负责集团多项目统筹与资源分配',
          '推动AI概念在团队落地',
          '建立新的获客系统以及工作流程',
          '大幅度实现降本增效以及提高团队整体效率'
        ]
      },
      metrics: {
        hr: [
          '跨团队协作效率提升 300%',
          '绩效达成率 95%',
          '询盘/获客成本下降 99%',
          '品牌知名度提升 10000%+',
        ],
        boss: [
          '项目交付准时率 100%',
          '为集团节省 500 万运营成本',
          '资源利用率提升 30%',
          '统筹项目 8 条业务线同时推进'
        ]
      }
    },
    {
      id: 'exp-5',
      title: '系统架构师',
      company: '某大型机械公司',
      duration: '2022.01 - 2022.12',
      techStack: ['Java', 'Spring Cloud', 'Kubernetes', 'Docker', 'Redis'],
      responsibilities: {
        hr: [
          '制定技术团队组建方案并参与招聘',
          '完善技术文档与最佳实践'
        ],
        boss: [
          '设计并优化公司核心系统微服务架构',
          '实施缓存与异步方案，降低响应延迟'
        ]
      },
      metrics: {
        hr: [
          '招聘并培养架构师 2 名',
          '技术分享次数 12 次',
          '编写架构文档 15+ 篇',
          '团队技术熟练度提升 30%'
        ],
        boss: [
          '系统可用率提升至 99.9%',
          '响应延迟降低 50%',
          '部署频率提升 2 倍',
          '新功能上线成功率 100%'
        ]
      }
    },
    {
      id: 'exp-4',
      title: '项目经理',
      company: '某互联网公司（聊天工具）',
      duration: '2020.01 - 2021.12',
      techStack: ['Node.js', 'React', 'WebSocket', 'MySQL', 'Docker'],
      responsibilities: {
        hr: [
          '建立并管理 8 人跨职能项目团队',
          '组织每日站会与迭代回顾',
          '制定项目培训与晋升计划',
          '优化团队沟通流程'
        ],
        boss: [
          '负责聊天工具核心功能规划与迭代',
          '监控项目进度，确保按期交付',
          '与产品团队协作，定义关键业务指标',
          '协调技术与运营资源，解决上线瓶颈'
        ]
      },
      metrics: {
        hr: [
          '团队满意度达 90%',
          '团队流失率控制在 5% 以下'
        ],
        boss: [
          '日活用户提升至 50,000',
          '系统故障率降低 60%'
        ]
      }
    },
    {
      id: 'exp-3',
      title: '联合创始人 & 产品策划',
      company: '某互联网技术公司',
      duration: '2019.03 - 2019.12',
      techStack: ['市场调研', '产品规划', '团队管理'],
      responsibilities: {
        hr: [
          '组建初创团队，招聘核心技术与产品人员',
          '组织头脑风暴，明确产品方向',
          '制定公司人才发展与激励机制',
          '建立团队文化与沟通流程',
          '编写并维护团队流程文档',
          '协调内外部资源，提升团队效率'
        ],
        boss: [
          '负责公司整体产品战略与业务规划',
          '进行市场调研，评估项目可行性',
          '搭建 MVP 原型，推动快速迭代',
          '协调外部资源，拓展战略合作',
          '监控产品上线效果，调整策略',
          '制定产品路线图，管理版本发布'
        ]
      },
      metrics: {
        hr: [
          '完成初始团队组建：5 人核心团队',
          '公司文化手册编写完成',
          '人才流失率 0%',
          '团队协作效率提升 25%'
        ],
        boss: [
          'MVP 原型 1 个月内上线',
          '取得 2 项潜在合作意向',
          '产品迭代反馈周期 < 2 周',
          '初期用户量达 1,000+'
        ]
      }
    },
    {
      id: 'exp-2',
      title: 'Java 开发工程师',
      company: '某金融公司',
      duration: '2018.01 - 2019.02',
      techStack: ['Java', 'Spring Boot', 'Oracle', 'Maven', 'Git'],
      responsibilities: {
        hr: [
          '参与新人入职培训，讲解项目架构与规范',
          '组织团队 Code Review，保证代码一致性',
          '编写并维护开发文档与 API 文档',
          '协助 HR 制定技术岗位招聘标准'
        ],
        boss: [
          '负责核心交易系统模块开发与维护',
          '优化数据库查询，提高系统吞吐量 30%',
          '实施单元测试与集成测试框架，降低回归风险',
          '与运维团队协作，完善 CI/CD 流程'
        ]
      },
      metrics: {
        hr: [
          '参与培训新人 5 名并全员通过考核',
          '代码审查覆盖率达 90%',
          '编写并更新文档 20+ 篇',
          '团队满意度提升 15%',
          '培训课程满意度 95%',
          '新人留存率 100%'
        ],
        boss: [
          '系统日均交易量提高 30%',
          '回归 Bug 数量减少 40%',
          'CI/CD 发布频次提升 50%',
          '系统可用率达 99.95%',
          '交易失败率降低 20%',
          '系统吞吐率提升 25%'
        ]
      }
    },
    {
      id: 'exp-1',
      title: '独立开发者',
      company: '个人项目',
      duration: '2014.06 - 2018.12',
      techStack: ['JavaScript', 'HTML/CSS', 'Python', 'C#'],
      responsibilities: {
        hr: [
          '独立设计并开发多款微信小程序，包括洗车、红娘、星座测试、菜谱、车友群、点餐、跑腿、校园租赁等',
          '构建 AI 扫描王早期版本，基于 OCR 与传统算法',
          '编写并维护项目文档与开发流程规范',
          '管理测试及上线部署，保障交付质量'
        ],
        boss: [
          '主导小程序全流程开发与多平台上线，覆盖营销、社交和工具类场景',
          '集成广告监控系统，单日监控量达 8K+',
          '实现多款小程序全网访问量突破 1,000 万次',
          '推动注册用户超 10 万，留存率提升至 40%'
        ]
      },
      metrics: {
        hr: [
          '累计发布小程序 10+ 款',
          '项目文档产出 30+ 篇',
          '测试覆盖率达 90%',
          '上线部署成功率 100%'
        ],
        boss: [
          '小程序全网访问量超 1,000 万次',
          '注册用户数突破 10 万',
          '单日广告监控量达 8,000+ 条',
          '产品迭代周期缩短 25%'
        ]
      }
    },
    {
      id: 'exp-0',
      title: '互联网兴趣起点',
      company: '个人兴趣',
      duration: '2008.08 - 2014.12',
      techStack: ['HTML', 'JavaScript', 'C/C++', 'Python'],
      responsibilities: {
        hr: [
          '自学网络编程基础，阅读并实践在线教程',
          '参与编程社区讨论，分享学习心得',
          '动手开发小游戏原型，锻炼代码能力',
          '探索并试验游戏外挂逆向思路'
        ],
        boss: [
          '发布多个原型工具至开源社区，收集用户反馈',
          '优化脚本和算法，提升稳定性',
          '尝试跨平台运行，扩展功能模块',
          '定期迭代更新，积累实践经验'
        ]
      },
      metrics: {
        hr: [
          '累计自学文章与教程 50+ 篇',
          '完成小游戏原型 3 个'
        ],
        boss: [
          '原型工具发布量 3 个，社区下载 200+ 次',
          '脚本稳定性提升 40%'
        ]
      }
    }
  ],


  skills: [
    {
      name: '前端技术',
      level: 8,
      experience: '8年',
      examples: ['React', 'Vue.js', 'Angular', 'Svelte', 'Ember.js', 'Backbone.js', 'TypeScript', 'JavaScript', 'Next.js', 'Nuxt.js', 'Gatsby', 'jQuery', 'D3.js', 'Lit', '...'],
      category: 'frontend',
    },
    {
      name: '后端技术',
      level: 9,
      experience: '10年',
      examples: ['Node.js', 'Python', 'Java', 'Go', 'PHP', 'Ruby', 'C#', 'Kotlin', 'Scala', 'Rust', 'Elixir', 'Perl', ],
      category: 'backend',
    },
    {
      name: '爬虫逆向与开发',
      level: 9,
      experience: '10年',
      examples: ['OD', 'IDA Pro', 'Ghidra', 'Binary Ninja', 'Radare2', 'x64dbg', 'OllyDbg', 'WinDbg', 'GDB', 'Frida', 'Hex-Rays Decompiler', 'PE-bear', 'CFF Explorer', 'Scylla', 'Binwalk', ],
      category: 'devops',
    },
    {
      name: '团队管理',
      level: 8,
      experience: '4年',
      examples: ['敏捷开发', '团队建设', '人才培养', '项目管理'],
      category: 'management',
    },
    {
      name: '架构设计',
      level: 8,
      experience: '5年',
      examples: ['微服务', '分布式系统', '高并发', '系统优化'],
      category: 'other',
    },
  ],

  contact: {
    phone: '176****6666',
    email: '7370260@qq.com',
    wechat: 'chabaiiooo',
    github: 'https://github.com/21888',
    linkedin: '#',
    pdfUrl: '/resume/li-resume.pdf',
  },

  salary: {
    location: '全国',
    range: '10K-35K/月',
    negotiable: true,
    benefits: {
      hr: [
        '单次: 每次远程服务收费 500元/次',
        '包月: 远程服务 2000元/5次',
        '超过套餐次数后，每次远程服务收费 300元/次',
        '包月套餐合作期间每月可提供免费上门诊断服务1次'
      ],
      boss: [
        '单次: 每次远程服务收费 500元/次',
        '包月: 远程服务 2000元/5次',
        '超过套餐次数后，每次远程服务收费 300元/次',
        '包月套餐合作期间每月可提供免费上门诊断服务1次'
      ],
    },
    notes: {
      hr: '薪资根据工作城市/岗位而定',
      boss: '薪资可根据业务贡献和ROI表现调整',
    },
  },
};