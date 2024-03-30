import Image from 'next/image';

interface SocialItem {
  name: string;
  icon: string;
  link: string;
}

const SocialLinks: React.FC = () => {
  const socialData: SocialItem[] = [
    { name: 'GitHub', icon: '/icons/github.svg', link: 'https://github.com/PetterVargas/' },
    { name: 'LinkedIn', icon: '/icons/linkedin.svg', link: 'https://www.linkedin.com/in/petervargas/' },
    { name: 'X', icon: '/icons/twitter-x.svg', link: 'https://twitter.com/divisioncero/' },
    { name: 'Instagram', icon: '/icons/instagram.svg', link: 'https://www.instagram.com/divisioncero/' },
    { name: 'TikTok', icon: '/icons/tiktok.svg', link: 'https://www.tiktok.com/@divisioncero/' },
    { name: 'Email', icon: '/icons/email.svg', link: 'mailto:peter.vargasg@gmail.com' },
  ];

  return (
    <div className="col-lg-12">
      <ul className="social-links-list">
        {socialData.map((socialItem, index) => (
          <li key={index}>
            <a href={socialItem.link} target="_blank" rel="noopener noreferrer">
              <Image src={socialItem.icon} alt={socialItem.name} width={30} height={30} />
            </a>
          </li>
        ))}
      </ul>

      <style>
        {`
          .social-links-list {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: space-between;
          }

          .social-links-list li {
            margin-right: 35px;
          }
        `}
      </style>
    </div>
  );
};

export default SocialLinks;
