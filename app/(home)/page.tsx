import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <div>
        <h1 className="my-2 text-3xl">
          I&apos;m <b>Peter Vargas</b> 🤘🏽
        </h1>
      </div>

      <div>
        <SocialIconsRow />
      </div>

      <div className="my-4 text-xl">
        I learn every day, passionate about creating things that contribute to the world 🌎.
      </div>
      <div className="my-4 text-xl">
        I&apos;m a cybersecurity engineer and I love my family;{' '}
        I&apos;ve been a Detective Conan fan for as long as I can remember.
      </div>
      <div className="my-4 text-xl text-center w-full">
        I created 🧑🏻‍💻:
      </div>
      <div className="my-4 text-xl text-center w-full">
        🛡️ ./
        <a href="https://divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
          <b>divisioncero </b>
        </a>
        - Business project in my life; I want to make cybersecurity more accessible to anyone.
      </div>
      <div className="my-4 text-xl text-center w-full">
        📖 ./
        <a href="https://kudo.divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
          <b>kudo </b>
        </a>
        - The open-source and practical book on cybersecurity.
      </div>
      <div className="my-4 text-xl text-center w-full">
        🧑🏽‍🏫 ./
        <a href="https://cyberacademy.divisioncero.com/?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
          <b>cyberacademy </b>
        </a>
        - The open-source and practical platform for learning cybersecurity.
      </div>
      <div className="my-4 text-xl text-center w-full">
        🕵️‍♂️ ./
        <a href="https://divisioncero.com/home/conan?utm_source=petervargas.com&utm_medium=text_link&utm_campaign=personal_website" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
          <b>conan </b>
        </a>
        - System for computer tracking of pedophiles, but it is genuinely useful for tracking any cybercrime.
      </div>
      <div className="my-4 text-xl text-center w-full">
        I&apos;m working on developing these projects with an educational focus.
      </div>
      <div className="my-4 text-xl text-center w-full">
        Oh, I almost forgot, I love coffee and I was born in Colombia 🇨🇴 (Pereira and Caicedonia)
      </div>
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
    <div className="flex justify-center">
      <div className="flex flex-row gap-2">
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
    </div>
  );
};
