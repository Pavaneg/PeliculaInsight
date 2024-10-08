/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
            port: '',
            pathname: '/**',
          },
        ],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/**',
          },
        ],
      },
};



export default nextConfig;
