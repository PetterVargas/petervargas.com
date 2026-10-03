import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import { source, blog } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export const revalidate = false;

// Fecha del último commit que tocó la ruta; si git no está disponible se omite.
function getGitLastModified(path: string): Date | undefined {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cI', '--', path], {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).trim();
    return output ? new Date(output) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: getGitLastModified('app/(home)/page.tsx'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: getGitLastModified('content/blog'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/fotos`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const docsRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: getGitLastModified(`content/docs/${page.path}`),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blog.getPages().map((page) => ({
    url: `${siteUrl}${page.url}`,
    lastModified: new Date(page.data.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...docsRoutes, ...blogRoutes];
}
