import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1 className="my-2 text-3xl"> {/* Reducido de my-4 a my-2 para mover más arriba */}
            I&apos;m <b>Peter Vargas</b> 🤘🏽
          </h1>
        </div>
        
        <div>
          {/* Social links justo después del nombre - ya no en un div separado para acercarlos */}
          <SocialIconsRow />
        </div>

        <div className="my-4 text-xl">
          I learn every day, passionate about creating things that contribute to the world 🌎.
        </div>
        <div className="my-4 text-xl">
          I&apos;m a cybersecurity engineer and I love my family; 
          I&apos;ve been a Detective Conan fan for as long as I can remember.
        </div>
        <div className="my-4 text-xl text-center w-full">
          I created 🧑🏻‍💻:
        </div>
        <div className="my-4 text-xl text-center w-full">
          🛡️ ./
          <a href="https://divisioncero.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>divisioncero </b>
          </a>
            - Business project in my life; I want to make cybersecurity more accessible to anyone.
        </div>
        <div className="my-4 text-xl text-center w-full">
          📖 ./
          <a href="https://kudo.divisioncero.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
            <b>kudo </b>
          </a>
          - The open-source and practical book on cybersecurity.
        </div>
        <div className="my-4 text-xl text-center w-full">
          🕵️‍♂️ ./
          <a href="https://docs.divisioncero.com/docs/cyberacademy" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
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
      </main>
    </div>
  );
}

// Componente de iconos sociales en línea, similar a la imagen
const SocialIconsRow = () => {
  const socialData = [
    { name: 'LinkedIn', icon: '/icons/linkedin.png', link: 'https://www.linkedin.com/in/petervargas/' },
    { name: 'X', icon: '/icons/twitter-x.png', link: 'https://twitter.com/divisioncero/' },
    { name: 'GitHub', icon: '/icons/github.png', link: 'https://github.com/PetterVargas/' },
    { name: 'Instagram', icon: '/icons/instagram.png', link: 'https://www.instagram.com/divisioncero/' },
    { name: 'TikTok', icon: '/icons/tiktok.png', link: 'https://www.tiktok.com/@divisioncero/' },
    { name: 'Email', icon: '/icons/mail.png', link: 'mailto:peter.vargasg@gmail.com' },
  ];

  return (
    <div className={styles.socialIconsContainer}>
      <div className={styles.socialIconsRow}>
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
              className="p-1"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
