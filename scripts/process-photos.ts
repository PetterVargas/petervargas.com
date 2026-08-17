import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
}

interface GalleryManifestEntry {
  id: string;
  alt: string;
  credit: {
    name: string;
    profileUrl: string;
  };
}

const DIR_DOWNLOADS = 'downloads';
const DIR_PUBLIC = 'public/fotos';
const GRID_WIDTH = 1000;
const ZOOM_WIDTH = 2000;

async function main() {
  const rawPath = join(DIR_DOWNLOADS, 'raw.json');
  if (!existsSync(rawPath)) {
    console.warn(`No existe ${rawPath} — no hay fotos que procesar.`);
    return;
  }

  const photos: UnsplashPhoto[] = JSON.parse(await fs.readFile(rawPath, 'utf8'));

  await fs.mkdir(DIR_PUBLIC, { recursive: true });

  const manifest: GalleryManifestEntry[] = [];

  for (const photo of photos) {
    const source = join(DIR_DOWNLOADS, `${photo.id}.png`);
    if (!existsSync(source)) {
      console.warn(`Skip (sin descargar): ${photo.id}`);
      continue;
    }

    const gridTarget = join(DIR_PUBLIC, `${photo.id}.webp`);
    const zoomTarget = join(DIR_PUBLIC, `${photo.id}-zoom.webp`);

    if (!existsSync(gridTarget)) {
      await sharp(source)
        .resize({ width: GRID_WIDTH, withoutEnlargement: true })
        .toFormat('webp', { quality: 80 })
        .toFile(gridTarget);
      console.log('Processed:', gridTarget);
    }

    if (!existsSync(zoomTarget)) {
      await sharp(source)
        .resize({ width: ZOOM_WIDTH, withoutEnlargement: true })
        .toFormat('webp', { quality: 85 })
        .toFile(zoomTarget);
      console.log('Processed:', zoomTarget);
    }

    manifest.push({
      id: photo.id,
      alt: photo.alt_description ?? photo.description ?? 'Foto de Peter Vargas',
      credit: {
        name: photo.user.name,
        profileUrl: `https://unsplash.com/@${photo.user.username}?utm_source=petervargas.com&utm_medium=referral`,
      },
    });
  }

  await fs.writeFile(join(DIR_PUBLIC, 'index.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log('Manifest:', join(DIR_PUBLIC, 'index.json'), `(${manifest.length} fotos)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
