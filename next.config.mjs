/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Fix for react-pdf / pdfjs-dist in Next.js webpack
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // Allow pdfjs-dist .mjs files to be processed correctly
    config.module.rules.push({
      test: /node_modules\/pdfjs-dist\/.+\.mjs$/,
      type: "javascript/auto",
    });

    return config;
  },
};

export default nextConfig;
