import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Silence Turbopack warning — html2pdf.js is dynamically imported client-side only
  turbopack: {},
  serverExternalPackages: ['html2pdf.js'],
};

export default nextConfig;
