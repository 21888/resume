import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers';
import { PageTransition } from '@/components/animations';
import { AccessibilityPanel } from '@/components/accessibility';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://me.11dz.cn'),
  title: '李先生 - 技术经理简历',
  description: '8年技术经验，专注团队培养与业务交付',
  keywords: ['技术经理', '前端开发', '团队管理', '项目管理', 'React', 'Next.js'],
  authors: [{ name: '李先生' }],
  openGraph: {
    title: '李先生 - 技术经理简历',
    description: '8年技术经验，专注团队培养与业务交付',
    type: 'profile',
    locale: 'zh_CN',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '李先生 - 技术经理简历',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '李先生 - 技术经理简历',
    description: '8年技术经验，专注团队培养与业务交付',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <AppProviders>
          <PageTransition>
            {children}
          </PageTransition>
          <AccessibilityPanel />
        </AppProviders>
      </body>
    </html>
  );
}