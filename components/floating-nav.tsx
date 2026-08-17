'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Camera, Moon, Sun } from 'lucide-react';
import { useTheme } from 'fumadocs-ui/provider/base';

const links = [
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Blog', href: '/blog' },
  { name: 'Exp', title: 'Experiencia', href: '/experiencia' },
  { name: 'Edu', title: 'Educación', href: '/educacion' },
  { name: 'Uses', title: 'Herramientas que uso', href: '/use' },
];

const githubUrl = 'https://github.com/PetterVargas/';

export function FloatingNav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav
      aria-label="Principal"
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3 sm:gap-5 rounded-full border border-fd-border bg-fd-background/80 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 text-sm shadow-sm max-w-[calc(100vw-2rem)] overflow-x-auto"
    >
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          title={item.title}
          className="whitespace-nowrap text-fd-muted-foreground opacity-80 hover:opacity-100 hover:text-fd-foreground transition-opacity"
        >
          {item.name}
        </Link>
      ))}

      <span className="h-4 w-px bg-fd-border shrink-0" aria-hidden />

      <Link
        href="/fotos"
        title="Fotos"
        aria-label="Fotos"
        className="text-fd-muted-foreground opacity-80 hover:opacity-100 hover:text-fd-foreground transition-opacity shrink-0"
      >
        <Camera className="h-4 w-4" />
      </Link>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="GitHub"
        aria-label="GitHub"
        className="opacity-80 hover:opacity-100 transition-opacity shrink-0"
      >
        <Image
          src="/icons/github.png"
          alt=""
          width={16}
          height={16}
          className="invert dark:invert-0"
        />
      </a>

      <button
        type="button"
        title="Cambiar tema"
        aria-label="Cambiar tema"
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        className="text-fd-muted-foreground opacity-80 hover:opacity-100 hover:text-fd-foreground transition-opacity shrink-0"
      >
        {mounted && resolvedTheme === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </button>
    </nav>
  );
}
