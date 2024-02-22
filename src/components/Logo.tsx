import Image from "next/image";
import logoVf from "@/assets/vfLogo.png";

interface ILogoProps {
  className?: string;
}

export const Logo = ({ className }: ILogoProps) => {
  return (
    <div>
      <Image className={className} src={logoVf} width={180} alt="" />
    </div>
  );
};
