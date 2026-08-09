import type { MetadataRoute } from 'next';
import { source, blog } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
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
