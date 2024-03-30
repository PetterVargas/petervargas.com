// InstagramProfile.tsx
import Image from 'next/image';
import styles from './InstagramProfile.module.css';

const InstagramProfile: React.FC = () => {
  return (
    <div className="relative flex items-center">
      <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden">
        <div className={styles['instagram-border']}>
          <Image
            src="/profile.png"
            alt="Profile Peter Vargas"
            width={300}
            height={300}
            priority
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default InstagramProfile;
