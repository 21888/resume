const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // Dynamic imports will be handled at runtime
    ],
    rehypePlugins: [
      // Dynamic imports will be handled at runtime
    ],
  },
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Use default output so that app/api route handlers work during build/runtime
  experimental: {
    mdxRs: false,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    // Disable Image Optimization in export mode
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  trailingSlash: false,
}

module.exports = withBundleAnalyzer(withMDX(nextConfig))