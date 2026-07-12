import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { blog } from '@/lib/source';
import type { Metadata } from 'next';

export default function BlogIndexPage() {
  const posts = blog.getPages();

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );

  return (
    <main className="flex flex-col flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex w-fit items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline"
      >
        <ArrowLeft className="size-4" />
        Home
      </Link>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Blog</h1>
        <p className="text-fd-muted-foreground">
          Notas personales sobre ideas, sociedad, familia, política y ciberseguridad.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {sortedPosts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="block rounded-lg border bg-fd-card p-5 text-left transition-colors hover:border-fd-foreground/20 hover:bg-fd-accent/50"
          >
            <h2 className="text-lg font-semibold mb-1">{post.data.title}</h2>
            <p className="text-xs text-fd-muted-foreground mb-2">
              {new Date(post.data.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-sm text-fd-muted-foreground line-clamp-2">
              {post.data.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog | Peter Vargas',
    description: 'Notas sobre ciberseguridad y lo que voy aprendiendo en el camino.',
  };
}
