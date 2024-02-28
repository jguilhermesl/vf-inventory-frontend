import Image from 'next/image';
import logoVf from '@/assets/vfLogo.svg';
import clsx from 'clsx';

interface ILogoProps {
  className?: string;
}

export const Logo = ({ className }: ILogoProps) => {
  return (
    <div>
      <Image className={clsx('', className)} src={logoVf} width={120} alt="" />
    </div>
  );
};
