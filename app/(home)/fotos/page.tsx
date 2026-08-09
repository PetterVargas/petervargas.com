import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { PhotoGallery, type GalleryPhoto } from '@/components/photo-gallery';

const dummyPhotos = [
  { seed: 'petervargas-1', width: 800, height: 1000 },
  { seed: 'petervargas-2', width: 800, height: 600 },
  { seed: 'petervargas-3', width: 800, height: 800 },
  { seed: 'petervargas-4', width: 800, height: 600 },
  { seed: 'petervargas-5', width: 800, height: 1000 },
  { seed: 'petervargas-6', width: 800, height: 600 },
  { seed: 'petervargas-7', width: 800, height: 800 },
  { seed: 'petervargas-8', width: 800, height: 600 },
  { seed: 'petervargas-9', width: 800, height: 1000 },
];

const galleryPhotos: GalleryPhoto[] = dummyPhotos.map((photo, index) => ({
  src: `https://picsum.photos/seed/${photo.seed}/${photo.width}/${photo.height}`,
  zoomSrc: `https://picsum.photos/seed/${photo.seed}/${photo.width * 2}/${photo.height * 2}`,
  alt: `Foto ${index + 1} de la galería de Peter Vargas`,
}));

export default function FotosPage() {
  return (
    <main className="flex flex-col flex-1 w-full max-w-3xl mx-auto px-4 pt-24 pb-12">
      <Link
        href="/"
        className="mb-8 inline-flex w-fit items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline"
      >
        <ArrowLeft className="size-4" />
        Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Foticos</h1>
      </div>

      <PhotoGallery photos={galleryPhotos} />
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
