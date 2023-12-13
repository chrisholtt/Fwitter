/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/users': { page: '/users' },
      '/messages': { page: '/messages' }
    };
  },
}

module.exports = nextConfig
