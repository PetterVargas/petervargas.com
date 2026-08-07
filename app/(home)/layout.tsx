import { FloatingNav } from '@/components/floating-nav';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <FloatingNav />
      {children}
    </>
  );
}
