import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode } from 'react';
import { Label } from './Label';
import { Paragraph } from './Paragraph';
import { Spinner } from './Spinner';

export enum InputVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum InputPlaceholderVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: InputVariant;
  isOptional?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconSize?: number;
  variantPlaceholder?: InputPlaceholderVariant;
  labelStyle?: string;
  isLoading?: boolean;
  onClickIconRight?: () => void;
}

export const Input = ({
  label,
  name,
  className,
  error,
  isOptional = false,
  disabled = false,
  variant = InputVariant.Default,
  iconLeft,
  iconRight,
  iconSize = 16,
  variantPlaceholder = InputPlaceholderVariant.Default,
  labelStyle,
  isLoading = false,
  onClickIconRight,
  ...props
}: InputProps) => {
  const inputClassesVariant = {
    [InputVariant.Default]:
      'border outline-none focus-within:border-primary text-neutral-darkest ',
    [InputVariant.Primary]:
      '!bg-neutral-light-grey placeholder:text-dark-grey rounded-lg text-neutral-darkest ',
    [InputVariant.Secondary]:
      'border !border-main-blue rounded-lg text-main-blue',
  };

  const inputPlaceholderClassesVariant = {
    [InputPlaceholderVariant.Default]: '',
    [InputPlaceholderVariant.Primary]: 'placeholder:text-primary',
    [InputPlaceholderVariant.Secondary]: 'placeholder:text-dark-grey',
  };

  return (
    <Label
      htmlFor={name}
      name={label}
      disabled={disabled}
      isOptional={isOptional}
      labelStyle={clsx(labelStyle)}
    >
      <div
        className={clsx(
          'bg-white rounded p-3 flex items-center text-main-blue',
          inputClassesVariant[variant],
          {
            '!bg-neutral-light-grey': disabled,
            'border-red-800 border-opacity-100': error,
            'border-neutral-grey': !error,
          },
          className
        )}
      >
        {iconLeft && <div className="mr-2">{iconLeft}</div>}
        <input
          id={name}
          disabled={disabled}
          className={clsx(
            'w-full outline-none text-sm disabled:text-dark-grey rounded bg-transparent ',
            inputPlaceholderClassesVariant[variantPlaceholder]
          )}
          autoComplete="off"
          {...props}
        />

        {isLoading && (
          <Spinner
            className={clsx({
              'border-l-secondary border-t-secondary':
                variant === InputVariant.Primary,
            })}
          />
        )}

        {iconRight && (
          <button className="ml-2" onClick={onClickIconRight}>
            {iconRight}
          </button>
        )}
      </div>

      {label && error && (
        <Paragraph
          className={clsx({
            'before:content-["ok"] opacity-0': !error,
          })}
          hasError={!!error}
        >
          {error}
        </Paragraph>
      )}
    </Label>
  );
};
