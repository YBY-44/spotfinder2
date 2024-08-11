/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'api.mapbox.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      { hostname: 'lh3.googleusercontent.com' },
    ],
  },
  // 其他配置选项
};

export default nextConfig;
