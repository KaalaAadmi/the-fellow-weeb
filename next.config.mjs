/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "3000",
        protocol: "http",
      },
      {
        hostname: "res.cloudinary.com",
        pathname: "**",
        // port: "3000",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
