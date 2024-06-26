import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  iconOnly = "icon-only",
}

export enum ButtonSizeVariant {
  Auto = "auto",
  Small = "small",
  Medium = "medium",
  Large = "full",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: any;
  rightIcon?: any;
  iconSize?: number;
  variant?: ButtonVariant;
  size?: ButtonSizeVariant;
  isLoading?: boolean;
}

export const Button = ({
  children,
  leftIcon,
  rightIcon,
  iconSize = 24,
  variant = ButtonVariant.Primary,
  size = ButtonSizeVariant.Auto,
  className,
  disabled,
  isLoading = false,
  ...props
}: ButtonProps) => {
  const buttonClassesVariant = {
    [ButtonVariant.Primary]: "bg-primary disabled:bg-dark-grey text-white",
    [ButtonVariant.Secondary]:
      "border-2 border-primary disabled:bg-black-50 text-primary",
    [ButtonVariant.iconOnly]: "disabled:opacity-40 !w-content py-0",
  };

  const buttonClassesSizes = {
    [ButtonSizeVariant.Small]: "py-4 px-10 max-h-[55px] ",
    [ButtonSizeVariant.Medium]: "py-6 px-4 h-[70px] w-[343px]",
    [ButtonSizeVariant.Large]: "py-6 px-4 h-[72px] w-full",
    [ButtonSizeVariant.Auto]: "w-full py-4 ",
  };

  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-full font-bold text-sm gap-4 hover:opacity-90 active:opacity-80",
        buttonClassesSizes[size],
        buttonClassesVariant[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {!isLoading && leftIcon}

      {isLoading ? <Spinner /> : children}

      {!isLoading && rightIcon}
    </button>
  );
};
