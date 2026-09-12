/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  // Ensure CSS is properly generated
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
