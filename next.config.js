/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secure-deer-1755e1d55c.media.strapiapp.com',
        pathname: '/**',
      },
      // optional: allow the API host if you serve images there too
      {
        protocol: 'https',
        hostname: 'secure-deer-1755e1d55c.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
