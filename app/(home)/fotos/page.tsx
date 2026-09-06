import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { PhotoGallery, type GalleryPhoto } from '@/components/photo-gallery';

interface PhotoManifestEntry {
  id: string;
  alt: string;
  credit: {
    name: string;
    profileUrl: string;
  };
}

function getGalleryPhotos(): GalleryPhoto[] {
  const manifestPath = path.join(process.cwd(), 'public/fotos/index.json');
  if (!fs.existsSync(manifestPath)) return [];

  const manifest: PhotoManifestEntry[] = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  return manifest.map((photo) => ({
    src: `/fotos/${photo.id}.webp`,
    zoomSrc: `/fotos/${photo.id}-zoom.webp`,
    alt: photo.alt,
    credit: photo.credit,
  }));
}

const galleryPhotos = getGalleryPhotos();

export default function FotosPage() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-3xl mx-auto px-4 pt-24 pb-12">
      <Link
        href="/"
        title="Volver al inicio"
        className="mb-8 inline-flex w-fit items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline"
      >
        <ArrowLeft className="size-4" />
        Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Foticos</h1>
      </div>

      {galleryPhotos.length > 0 ? (
        <PhotoGallery photos={galleryPhotos} />
      ) : (
        <p className="text-center text-sm text-fd-muted-foreground">
          Corre <code>pnpm run photos:update</code> (con <code>UNSPLASH_ACCESS_KEY</code> configurada)
          para traer las fotos de la colección.
        </p>
      )}
    </main>
  );
}

export function generateMetadata(): Metadata {
  const title = 'Fotos';
  const description = 'Fotografía y viajes.';

  return {
    title,
    description,
    alternates: {
      canonical: '/fotos',
    },
    openGraph: {
      title: `${title} | Peter Vargas`,
      description,
      url: '/fotos',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Peter Vargas`,
      description,
    },
  };
}
