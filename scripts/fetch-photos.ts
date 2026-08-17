import 'dotenv/config';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  user: {
    name: string;
    username: string;
    links: { html: string };
  };
  links: { html: string };
  urls: { full: string };
}

const BASE_URL = 'https://api.unsplash.com';
const DIR_DOWNLOADS = 'downloads';
const PER_PAGE = 30;
const DEFAULT_COLLECTION_ID = '5TvfMa9jgXA'; // unsplash.com/collections/5TvfMa9jgXA/foticos-peter-vargas

async function main() {
  const { UNSPLASH_ACCESS_KEY, UNSPLASH_COLLECTION_ID = DEFAULT_COLLECTION_ID } = process.env;

  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('UNSPLASH_ACCESS_KEY no está definida — se omite la descarga de fotos de Unsplash.');
    return;
  }

  await fs.mkdir(DIR_DOWNLOADS, { recursive: true });

  const cachePath = join(DIR_DOWNLOADS, 'raw.json');
  const photos: UnsplashPhoto[] = [];

  for (let page = 1; ; page++) {
    console.log('Page:', page);
    const url = new URL(`${BASE_URL}/collections/${UNSPLASH_COLLECTION_ID}/photos`);
    url.searchParams.set('client_id', UNSPLASH_ACCESS_KEY);
    url.searchParams.set('per_page', String(PER_PAGE));
    url.searchParams.set('page', String(page));

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Unsplash API request failed (status ${res.status}) para la colección "${UNSPLASH_COLLECTION_ID}", página ${page}. ` +
          'Verifica que la colección exista y sea pública.',
      );
    }

    const newPhotos = (await res.json()) as UnsplashPhoto[];
    photos.push(...newPhotos);
    if (newPhotos.length < PER_PAGE) break;
  }

  await fs.writeFile(cachePath, JSON.stringify(photos, null, 2), 'utf8');

  console.log('Colección:', `https://unsplash.com/collections/${UNSPLASH_COLLECTION_ID}`);
  console.log('Total de fotos:', photos.length);

  for (const photo of photos) {
    const target = join(DIR_DOWNLOADS, `${photo.id}.png`);
    if (existsSync(target)) {
      console.log(`Skip: ${photo.id}`);
      continue;
    }
    console.log(`Download: ${photo.id}`);
    try {
      const res = await fetch(photo.urls.full);
      if (!res.ok) throw new Error(`status ${res.status}`);
      await fs.writeFile(target, Buffer.from(await res.arrayBuffer()));
    } catch (error) {
      console.error(`Failed to download: ${photo.id}`);
      console.error(error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
