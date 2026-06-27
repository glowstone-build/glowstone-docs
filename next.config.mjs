import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.106"],
  // Pages merged into siblings during the dedup pass — keep old URLs alive.
  async redirects() {
    return [
      { source: '/docs/fixtures/parameters', destination: '/docs/fixtures/beam-engine', permanent: true },
      { source: '/docs/navigation/views', destination: '/docs/navigation', permanent: true },
      { source: '/docs/interface/panels', destination: '/docs/interface', permanent: true },
      { source: '/docs/library/dmx-modes', destination: '/docs/library/profile-editor', permanent: true },
      { source: '/docs/dmx/consoles', destination: '/docs/dmx/connectivity', permanent: true },
    ];
  },
};

export default withMDX(config);
