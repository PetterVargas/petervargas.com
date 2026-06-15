import { JetBrains_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import Script from 'next/script';
import './global.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={jetbrainsMono.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-39QRST627Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-39QRST627Z');
          `}
        </Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
