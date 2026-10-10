import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import { appName, appDescription } from '@/lib/shared';

export const revalidate = false;

// Se sirve como `image.png` (y no con la convención `opengraph-image`) porque el
// export estático genera ese archivo sin extensión y el hosting lo entrega como
// `application/octet-stream`, que las redes sociales no aceptan como imagen.
export function GET() {
  return new ImageResponse(
    <DefaultImage title={appName} description={appDescription} site={appName} />,
    { width: 1200, height: 630 },
  );
}
