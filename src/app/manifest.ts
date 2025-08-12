import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Personalized Resume - 高级技术专家',
    short_name: 'Resume Expert',
    description: '动态个性化简历网站，适配不同角色视角',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'utilities'],
    lang: 'zh-CN',
    dir: 'ltr',
    scope: '/',
  };
}