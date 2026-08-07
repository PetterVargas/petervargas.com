import Image from 'next/image';
import Link from 'next/link';
import { HeroReveal } from '@/components/home-animations';
import { HeroUniverse } from '@/components/hero-universe';

export default function HomePage() {
  return (
    <div className="relative flex-1 flex flex-col">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-fd-primary/5 via-transparent to-fd-secondary/5 pointer-events-none" />
      <HeroUniverse className="fixed inset-0 -z-10 w-full h-full pointer-events-none opacity-70" />
      <HeroReveal>
      <div className="max-w-[65ch] w-full mx-auto flex-1 px-6 pt-36 sm:pt-40 pb-10">
        <div className="overflow-hidden mb-6">
          <h1
            data-hero-line
            className="text-4xl font-extrabold tracking-tight leading-tight motion-safe:opacity-0"
          >
            I&apos;m{' '}
            <Link href="/docs" className="text-emerald-400 hover:underline">
              <b>Peter Vargas</b>
            </Link>{' '}
            🤘🏽
          </h1>
        </div>

        <div data-hero-item className="mb-8 motion-safe:opacity-0">
          <SocialIconsRow />
        </div>

        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          I learn every day, passionate about creating things that contribute to the world 🌎.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          I&apos;m a cybersecurity engineer and I love my family;{' '}
          I&apos;ve been a Detective Conan fan for as long as I can remember.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          I created 🧑🏻‍💻:
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🛡️ ./
          <a href="https://divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>divisioncero </b>
          </a>
          - Business project in my life; I want to make cybersecurity more accessible to anyone.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          📖 ./
          <a href="https://kudo.divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>kudo </b>
          </a>
          - The open-source and practical book on cybersecurity.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🧑🏽‍🏫 ./
          <a href="https://cyberacademy.divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>cyberacademy </b>
          </a>
          - The open-source and practical platform for learning cybersecurity.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🕵️‍♂️ ./
          <a href="https://app.divisioncero.com/home/conan?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>conan </b>
          </a>
          - System for computer tracking of pedophiles, but it is genuinely useful for tracking any cybercrime.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          🛠️ ./
          <a href="https://herramientas.divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>Other tools</b>
          </a>
          - Various tools for Cybersecurity tasks and research.
        </p>
        <p data-hero-item className="my-5 text-base leading-[1.75] motion-safe:opacity-0">
          Oh, I almost forgot, I love coffee and I was born in Colombia 🇨🇴 (Pereira and Caicedonia)
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
    { name: 'DivisionCero', icon: '/icons/divisioncero.png', link: 'https://divisioncero.com/?utm_source=petervargas.com&utm_medium=social&utm_campaign=personal_website' },
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
