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
            <Link href="/proyectos" className="text-emerald-400 hover:underline">
              <b>Peter Vargas</b>
            </Link>{' '}
            🤘🏽
          </h1>
        </div>

        <div data-hero-item className="mb-8 motion-safe:opacity-0">
          <SocialIconsRow />
        </div>

        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          Aprendo cada día, apasionado por crear cosas que aporten al mundo 🌎.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          Soy Ingeniero en Ciberseguridad y hombre de familia. Como hobby practico trekking; mi banda favorita es{' '}
          <a href="https://www.warcry.es/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>WarCry</b>
          </a>{' '}
          y he sido fan de{' '}
          <a
            href="https://es.wikipedia.org/wiki/Detective_Conan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            <b>Detective Conan</b>
          </a>{' '}
          desde que tengo memoria.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          He creado 🧑🏻‍💻:
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🛡️ ./
          <a href="https://divisioncero.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>divisioncero </b>
          </a>
          - Proyecto que espero que algún día sea rentable; quiero hacer la ciberseguridad más accesible para cualquiera.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          📖 ./
          <a href="https://kudo.divisioncero.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>kudo </b>
          </a>
          - Framework y libro open-source; práctico sobre ciberseguridad.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🧑🏽‍🏫 ./
          <a href="https://cyberacademy.divisioncero.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>cyberacademy </b>
          </a>
          - La plataforma open-source y práctica para aprender ciberseguridad.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🕵️‍♂️ ./
          <a href="https://app.divisioncero.com/home/conan" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>conan </b>
          </a>
          - Sistema de rastreo informático de pedófilos, aunque realmente es útil para rastrear cualquier cibercrimen.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🛠️ ./
          <a href="https://herramientas.divisioncero.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>Otras herramientas</b>
          </a>
          - Varias herramientas para tareas diarias e investigación en ciberseguridad.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          Ah, casi lo olvido, amo el ☕ y nací en Colombia 🇨🇴 (Pereira y Caicedonia)
        </p>
      </div>
      </HeroReveal>
    </div>
  );
}

const SocialIconsRow = () => {
  const socialData = [
    { name: 'GitHub', icon: '/icons/github.png', link: 'https://github.com/PetterVargas/' },
    { name: 'X', icon: '/icons/twitter-x.png', link: 'https://twitter.com/divisioncero/' },
    { name: 'LinkedIn', icon: '/icons/linkedin.png', link: 'https://www.linkedin.com/in/petervargas/' },
    { name: 'DivisionCero', icon: '/icons/divisioncero.png', link: 'https://divisioncero.com/' },
    { name: 'Instagram', icon: '/icons/instagram.png', link: 'https://www.instagram.com/divisioncero/' },
    { name: 'TikTok', icon: '/icons/tiktok.png', link: 'https://www.tiktok.com/@divisioncero/' },
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
          className="transition-transform hover:scale-110"
        >
          <Image
            src={item.icon}
            alt={item.name}
            width={30}
            height={30}
            className="p-1 invert dark:invert-0"
          />
        </a>
      ))}
    </div>
  );
};
