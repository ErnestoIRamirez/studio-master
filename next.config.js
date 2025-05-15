/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Changed from true
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed from true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Configuración para mejorar el rendimiento en producción
  swcMinify: true,
  reactStrictMode: true,
  // Configuración de Vercel
  distDir: '.next',
  poweredByHeader: false,
  // Configuración de compresión para optimizar el rendimiento
  compress: true,
};

module.exports = nextConfig; 