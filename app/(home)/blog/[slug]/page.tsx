import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { blog } from '@/lib/source';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center py-12">
        <Link
          href="/blog"
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

  return {
    title: `${page.data.title} | Peter Vargas`,
    description: page.data.description,
  };
}
