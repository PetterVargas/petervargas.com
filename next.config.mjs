import { execSync } from 'node:child_process';
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default async (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD) {
    try {
      execSync('pnpm run photos:update', { stdio: 'inherit' });
    } catch (error) {
      console.warn('No se pudieron actualizar las fotos de Unsplash:', error.message);
    }
  }
  return withMDX(config);
};
