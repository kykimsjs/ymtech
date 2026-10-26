import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    // 기본값에 1440·1680 추가: 1350~1600px 화면이 1920px 이미지를 받지 않도록
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1680, 1920, 2048, 3840],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
