import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName, appDescription } from '@/lib/shared';

export const revalidate = false;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <DefaultImage title={appName} description={appDescription} site={appName} />,
    size,
  );
}
