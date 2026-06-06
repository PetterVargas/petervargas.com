import { JetBrains_Mono } from 'next/font/google';
import { Provider } from '@/components/provider';
import './global.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={jetbrainsMono.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
