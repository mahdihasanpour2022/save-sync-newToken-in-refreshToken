import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false, // desable source map in prod
  experimental: {
    optimizePackageImports: ["icon-library"], // will only load the modules you actually use
  },
});

export default nextConfig;
