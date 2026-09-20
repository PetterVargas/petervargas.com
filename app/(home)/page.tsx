import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroReveal } from '@/components/home-animations';
import { HeroUniverse } from '@/components/hero-universe';
import { appName, appDescription, siteUrl, socialLinks } from '@/lib/shared';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: appName,
  url: siteUrl,
  image: `${siteUrl}/android-chrome-512x512.png`,
  description: appDescription,
  jobTitle: 'Ingeniero en Ciberseguridad',
  nationality: 'Colombia',
  sameAs: [
    socialLinks.github,
    socialLinks.linkedin,
    socialLinks.x,
    socialLinks.divisioncero,
    socialLinks.instagram,
    socialLinks.tiktok,
  ],
};

export default function HomePage() {
  return (
    <div className="relative flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-fd-primary/5 via-transparent to-fd-secondary/5 pointer-events-none" />
      <HeroUniverse className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-70" />
      <HeroReveal>
      <div className="max-w-[65ch] w-full mx-auto flex-1 px-6 pt-36 sm:pt-40 pb-10">
        <div className="overflow-hidden mb-6">
          <h1
            data-hero-line
            className="text-4xl font-extrabold tracking-tight leading-tight motion-safe:opacity-0"
          >
            Soy{' '}
            <Link
              href="/proyectos"
              title="Ver los proyectos de Peter Vargas"
              className="text-emerald-400 hover:underline"
            >
              <b>Peter Vargas</b>
            </Link>{' '}
            🤘🏽
          </h1>
        </div>

        <div data-hero-item className="mb-8 motion-safe:opacity-0">
          <SocialIconsRow />
        </div>
        
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          Aprendo cada día, apasionado por crear cosas que aporten al mundo 🌎. Soy Ingeniero en Ciberseguridad y hombre de familia.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          He creado 🧑🏻‍💻:
        </p>
        <ul data-hero-item className="my-5 space-y-2.5 motion-safe:opacity-0">
          {proyectos.map((proyecto) => (
            <li key={proyecto.name} className="text-base leading-[1.75]">
              {proyecto.icon} ./
              <a
                href={proyecto.href}
                target="_blank"
                rel="noopener noreferrer"
                title={proyecto.title}
                className="text-emerald-400 hover:underline"
              >
                <b>{proyecto.name} </b>
              </a>
              - {proyecto.description}
            </li>
          ))}
        </ul>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          Como hobby practico trekking; mi banda favorita es{' '}
          <a
            href="https://www.warcry.es/"
            target="_blank"
            rel="noopener noreferrer"
            title="WarCry - Banda de heavy metal"
            className="text-emerald-400 hover:underline"
          >
            <b>WarCry</b>
          </a>{' '}
          y he sido fan de{' '}
          <a
            href="https://es.wikipedia.org/wiki/Detective_Conan"
            target="_blank"
            rel="noopener noreferrer"
            title="Detective Conan en Wikipedia"
            className="text-emerald-400 hover:underline"
          >
            <b>Detective Conan</b>
          </a>{' '}
          desde que tengo memoria. Ah, casi lo olvido, amo el ☕ y nací en Colombia 🇨🇴 (Pereira y Caicedonia). 
        </p>
      </div>
      </HeroReveal>
    </div>
  );
}

const proyectos = [
  {
    icon: '🛡️',
    name: 'divisioncero',
    href: 'https://divisioncero.com/',
    title: 'DivisionCero - Comunidad de Ciberseguridad',
    description: 'Proyecto que espero que algún día sea rentable; quiero hacer la ciberseguridad más accesible para cualquiera.',
  },
  {
    icon: '📖',
    name: 'kudo',
    href: 'https://kudo.divisioncero.com/',
    title: 'Kudo - Framework y libro open-source de ciberseguridad',
    description: 'Framework y libro open-source; práctico sobre ciberseguridad.',
  },
  {
    icon: '🧑🏽‍🏫',
    name: 'cyberacademy',
    href: 'https://cyberacademy.divisioncero.com/',
    title: 'CyberAcademy - Plataforma para aprender ciberseguridad',
    description: 'La plataforma open-source y práctica para aprender ciberseguridad.',
  },
  {
    icon: '🕵️‍♂️',
    name: 'conan',
    href: 'https://app.divisioncero.com/home/conan',
    title: 'Conan - Sistema de rastreo de cibercrimen',
    description: 'Sistema de rastreo informático de pedófilos, aunque realmente es útil para rastrear cualquier cibercrimen.',
  },
  {
    icon: '🛠️',
    name: 'Otras herramientas',
    href: 'https://herramientas.divisioncero.com/',
    title: 'Herramientas de ciberseguridad de DivisionCero',
    description: 'Varias herramientas para tareas diarias e investigación en ciberseguridad.',
  },
];

const SocialIconsRow = () => {
  const socialData: { name: string; icon?: string; svg?: ReactNode; link: string }[] = [
    { name: 'GitHub', icon: '/icons/github.png', link: 'https://github.com/PetterVargas/' },
    { name: 'X', icon: '/icons/twitter-x.png', link: 'https://twitter.com/divisioncero/' },
    { name: 'LinkedIn', icon: '/icons/linkedin.png', link: 'https://www.linkedin.com/in/petervargas/' },
    { name: 'DivisionCero', icon: '/icons/divisioncero.png', link: 'https://divisioncero.com/' },
    { name: 'Instagram', icon: '/icons/instagram.png', link: 'https://www.instagram.com/divisioncero/' },
    { name: 'TikTok', icon: '/icons/tiktok.png', link: 'https://www.tiktok.com/@divisioncero/' },
    {
      name: 'YouTube',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
      ),
      link: 'https://youtube.com/@divisioncero',
    },
    {
      name: 'Discord',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.003-3.03.077.077 0 0 0 .032-.057c.5-5.177-.838-9.637-3.548-13.615a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/></svg>
      ),
      link: 'https://discord.com/invite/RPxQTPBfvG',
    },
    { name: 'Email', icon: '/icons/mail.png', link: 'mailto:peter.vargasg@gmail.com' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {socialData.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.name} de Peter Vargas`}
          className="transition-transform hover:scale-110"
        >
          {item.icon ? (
            <Image
              src={item.icon}
              alt={`${item.name} de Peter Vargas`}
              title={`${item.name} de Peter Vargas`}
              width={30}
              height={30}
              className="p-1 invert dark:invert-0"
            />
          ) : (
            <span className="flex items-center justify-center w-[30px] h-[30px] p-1">{item.svg}</span>
          )}
        </a>
      ))}
    </div>
  );
};
