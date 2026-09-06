import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Provider } from '@/components/provider';
import { appName, appTitle, appDescription, appKeywords, siteUrl } from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: appName,
  url: siteUrl,
  inLanguage: 'es',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appTitle,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  keywords: appKeywords,
  manifest: '/site.webmanifest',
  authors: [{ name: appName, url: siteUrl }],
  creator: appName,
  publisher: 'divisioncero.com',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: appName,
    title: appTitle,
    description: appDescription,
    url: siteUrl,
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: appTitle,
    description: appDescription,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      type: 'image/png',
    },
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        url: '/mstile-150x150.png',
        sizes: '150x150',
        type: 'image/png',
      },
    ],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
        <GoogleAnalytics gaId="G-39QRST627Z" />
      </body>
    </html>
  );
}
