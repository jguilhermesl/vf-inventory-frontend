import React, { ChangeEvent } from 'react';
import * as Select from '@radix-ui/react-select';
import { CaretDown } from 'phosphor-react';
import Image from 'next/image';
import { DropdownItem } from './DropdownItem';
import clsx from 'clsx';
import { Label } from './Label';
import { Spinner } from './Spinner';
import { Paragraph } from './Paragraph';

export enum DropdownVariant {
  Default = 'default',
}

export interface ISelectOptionProps {
  value: string;
  label: string;
  description?: string;
}

interface DropdownProps {
  label?: string;
  error?: string;
  variant?: DropdownVariant;
  isOptional?: boolean;
  className?: string;
  value?: ISelectOptionProps['value'];
  selectStyle?: string;
  onValueChange?: (e: string | ChangeEvent<any>) => void;
  options: ISelectOptionProps[] | string[];
  placeholder?: string;
  disabled?: boolean;
  labelStyle?: string;
  isLoading?: boolean;
}

export const Dropdown = ({
  value,
  onValueChange,
  selectStyle = '',
  options,
  error,
  variant = DropdownVariant.Default,
  label,
  placeholder = 'Select',
  disabled = false,
  className,
  labelStyle,
  isLoading = false,
}: DropdownProps) => {
  const dropdownClassesVariant = {
    [DropdownVariant.Default]:
      'border outline-none focus-within:border-primary border-negative-dark',
  };

  return (
    <Label name={label} disabled={disabled} labelStyle={labelStyle}>
      <Select.Root
        defaultValue={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <Select.Trigger
          className={clsx(
            'p-3 text-sm font-poppins text-neutral-darkest disabled:text-dark-grey disabled:bg-neutral-light-grey font w-full flex justify-between items-center rounded data-[placeholder]:text-neutral-darkest',
            dropdownClassesVariant[variant],
            selectStyle,
            {
              'border-negative-dark': !!error,
              'border-neutral-grey': !error,
            },
            className
          )}
          aria-label={label}
        >
          <Select.Value placeholder={placeholder} className="font-normal" />
          <Select.Icon>
            <CaretDown size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            className="bg-white p-4 flex flex-row border border-neutral-grey rounded z-20 min-w-[200px] max-h-[300px]"
          >
            <Select.Viewport
              className="text-neutral-darkest font-poppins"
              defaultValue={'United States'}
            >
              <Select.Group>
                {isLoading && (
                  <div className="flex flex-1 justify-between items-center">
                    <Spinner />
                  </div>
                )}

                {options.map((option) => (
                  <DropdownItem
                    description={
                      typeof option === 'string' ? '' : option?.description
                    }
                    key={typeof option === 'string' ? option : option?.value}
                    label={typeof option === 'string' ? option : option?.label}
                    value={typeof option === 'string' ? option : option?.value}
                  />
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

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
