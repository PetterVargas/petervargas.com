'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface GalleryPhoto {
  src: string;
  zoomSrc: string;
  alt: string;
  credit?: {
    name: string;
    profileUrl: string;
  };
}

export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, prev, next]);

  return (
    <>
      <div className="columns-2 sm:columns-3 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver foto ${i + 1} de ${photos.length}`}
            className="block w-full break-inside-avoid overflow-hidden rounded-lg border border-fd-border"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- these are placeholder photos loaded from picsum, not project assets */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-auto object-cover transition-transform hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
            className="absolute left-2 sm:left-6 text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo, full-screen viewer needs a plain img */}
          <img
            key={photos[index].zoomSrc}
            src={photos[index].zoomSrc}
            alt={photos[index].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 sm:right-6 text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight className="h-9 w-9" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-sm text-white/60">
            <span>
              {index + 1} / {photos.length}
            </span>
            {photos[index].credit && (
              <span>
                Foto de{' '}
                <a
                  href={photos[index].credit!.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="underline hover:text-white"
                >
                  {photos[index].credit!.name}
                </a>{' '}
                en{' '}
                <a
                  href="https://unsplash.com/?utm_source=petervargas.com&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="underline hover:text-white"
                >
                  Unsplash
                </a>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
