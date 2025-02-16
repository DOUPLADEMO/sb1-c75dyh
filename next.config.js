const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  productionBrowserSourceMaps: true,
  env: {
    _next_intl_trailing_slash: 'true',
  },
};

module.exports = withNextIntl(nextConfig);