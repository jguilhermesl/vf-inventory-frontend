import Image from 'next/image';
import LogoImage from '@/assets/logo.png';

interface ILogoProps {
  className?: string;
}

export const Logo = ({ className }: ILogoProps) => {
  return (
    <div>
      <Image className={className} src={LogoImage} width={150} alt="" />
    </div>
  );
};
