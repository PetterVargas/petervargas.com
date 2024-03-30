import SocialLinks from '../components/social-link';
import InstagramProfile  from '../components/instagramprofile';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">

      <div>
        <InstagramProfile />
      </div>

      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="text-center">
          <h1 className="my-9 text-3xl">
            I&apos;m <b>Peter Vargas</b> 🤘🏽
          </h1>
          <div className="my-4 text-xl">
            I am a learner every day 🧑🏻‍💻, passionate about creating things that contribute to the world 🌎.
          </div>
          <div className="my-4 text-xl">
            I am a Cybersecurity Engineer who loves his family 👨‍👩‍👧‍👦, 
            and one of my hobbies since I can remember is Detective Conan.
          </div>
          <div className="my-4 text-xl">
            I created:
          </div>
          <div className="my-4 text-xl">
            🕵️‍♂️ ./
            <a href="https://www.divisioncero.com/conan/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              <b>conan </b>
            </a> 
            - System for computer tracking of pedophiles, but it is genuinely useful for tracking any cybercrime
          </div>
          <div className="my-4 text-xl">
            🛡️ ./
            <a href="https://www.divisioncero.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              <b>divisioncero </b>
            </a>
             - Entrepreneurial failure in my life; I wanted to make cybersecurity more accessible to anyone interested.
          </div>
          <div className="my-4 text-xl">
            📖 ./
            <a href="https://kudo.petervargas.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
              <b>kudo </b>
            </a>
            - The open-source and practical book on cybersecurity. It is still in development.
          </div>
          <div className="my-4 text-xl">
            I am working on bringing these projects to the open-source world, but with an educational focus.
          </div>
          <div className="my-4 text-xl">
            Oh, I almost forgot, I like coffee and I&apos;m from Colombia and I live in Pereira and Caicedonia.
          </div>
        </div>
      </div>

      <div className="my-9">
        <SocialLinks />
      </div>

      <div className="z-10 max-w-6xl w-full items-center justify-between font-mono">
        <div className="text-center">
          <div className="my-4 text-xl">
            DevSecOps | MSc DevOps | Cybersecurity | Python | DFIR | System Engineer | Teacher | CHFI
          </div>
        </div>
      </div>

    </main>
  )
}