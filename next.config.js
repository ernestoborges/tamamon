/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

module.exports = nextConfig
