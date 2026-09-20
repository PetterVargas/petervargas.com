import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { blog, getBlogPageImage } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import { siteUrl } from '@/lib/shared';
import type { Metadata } from 'next';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  const sortedPosts = [...blog.getPages()].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
  const currentIndex = sortedPosts.findIndex((post) => post.url === page.url);
  const newerPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : undefined;
  const olderPost =
    currentIndex >= 0 && currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: page.data.title,
    description: page.data.description,
    datePublished: page.data.date,
    author: {
      '@type': 'Person',
      name: page.data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'divisioncero.com',
    },
    mainEntityOfPage: `${siteUrl}${page.url}`,
    image: `${siteUrl}${getBlogPageImage(page).url}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center pt-24 pb-12">
        <Link
          href="/blog"
          title="Volver al blog"
          className="mb-8 self-start inline-flex w-fit items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground hover:underline"
        >
          <ArrowLeft className="size-4" />
          Blog
        </Link>

        <h1 className="mb-2 text-center text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 text-center text-fd-muted-foreground">{page.data.description}</p>
        <span className="text-sm text-fd-muted-foreground">
          By {page.data.author} &middot;{' '}
          {new Date(page.data.date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>
      <article className="w-full max-w-3xl mx-auto px-4 flex flex-col py-8">
        <div className="prose mx-auto min-w-0">
          <InlineTOC items={page.data.toc} />
          <Mdx components={getMDXComponents()} />
        </div>

        {(olderPost || newerPost) && (
          <nav
            aria-label="Navegación entre posts"
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-fd-border pt-6"
          >
            {olderPost ? (
              <Link
                href={olderPost.url}
                title={olderPost.data.title}
                className="group flex flex-col gap-1 rounded-lg border bg-fd-card p-4 transition-colors hover:border-fd-foreground/20 hover:bg-fd-accent/50"
              >
                <span className="inline-flex items-center gap-1 text-xs text-fd-muted-foreground">
                  <ArrowLeft className="size-3.5" />
                  Anterior
                </span>
                <span className="font-medium group-hover:underline">{olderPost.data.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {newerPost ? (
              <Link
                href={newerPost.url}
                title={newerPost.data.title}
                className="group flex flex-col gap-1 rounded-lg border bg-fd-card p-4 text-right transition-colors hover:border-fd-foreground/20 hover:bg-fd-accent/50 sm:items-end"
              >
                <span className="inline-flex items-center gap-1 text-xs text-fd-muted-foreground">
                  Siguiente
                  <ArrowRight className="size-3.5" />
                </span>
                <span className="font-medium group-hover:underline">{newerPost.data.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </article>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const imageUrl = getBlogPageImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: page.url,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      type: 'article',
      publishedTime: page.data.date,
      authors: [page.data.author],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: page.data.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [imageUrl],
    },
  };
}
