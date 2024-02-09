import { Dispatch, SetStateAction, useState } from 'react';
import { Input } from '@/components/Input';
import { MagnifyingGlass } from 'phosphor-react';
import { memo } from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';
import { Line } from './Line';
import { MOCK_PRODUCTS } from '@/constants/products';

interface IAutoCompleteItemProps {
  suggestions: any[];
  handleClickItem?: (itemId: string) => void;
  isLoading?: boolean;
  isOpenSuggestions: boolean;
}

interface IAutoCompleteInputProps {
  item: any;
  setItem: Dispatch<SetStateAction<any>>;
  suggestions: any[];
  setSuggestions: Dispatch<SetStateAction<any[]>>;
  getItems: (value: string) => Promise<void>;
}

const AutoCompleteItem = memo(
  ({
    suggestions,
    handleClickItem,
    isLoading,
    isOpenSuggestions,
  }: IAutoCompleteItemProps) => {
    return (
      <div
        className={clsx(
          'bg-white max-h-[200px] w-[400px] overflow-auto rounded transition-all',
          {
            'h-0': !isOpenSuggestions,
            'border border-neutral-grey': isOpenSuggestions,
          }
        )}
      >
        <ul className="flex flex-1 flex-col gap-2 p-4">
          {isLoading ? (
            <Spinner />
          ) : (
            suggestions?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleClickItem(item.id)}
                className="text-neutral-grey font-poppins text-sm truncate hover:underline hover:text-neutral-darkest cursor-pointer"
              >
                {item.Lote} | {item.Produto} | {item.Preço} | {item.Validade}
                <Line className="mt-2" />
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
);

export const AutoCompleteInput = ({
  item,
  setItem,
  suggestions,
  setSuggestions,
  getItems,
}: IAutoCompleteInputProps) => {
  const [openSuggestions, setOpenSuggestions] = useState(false);

  const handleClickProduct = (itemId: string) => {
    console.log('item Id ==> ', itemId);
    console.log('suggestions ==> ', suggestions);

    const itemFiltered = suggestions.find((p) => p.id == itemId);
    setItem(
      `${itemFiltered.Lote} | ${itemFiltered.Produto} | ${itemFiltered.Preço} | ${itemFiltered.Validade}`
    );
    setOpenSuggestions(false);
  };

  const handleChange = (e) => {
    getItems(e.target.value);
    setItem(e.target.value);
    setOpenSuggestions(true);
  };

  return (
    <div className="">
      <Input
        name="autocomplete"
        className="py-3 w-full border-neutral-light-grey"
        placeholder="Digite o código ou lote do estoque"
        iconRight={<MagnifyingGlass size={20} />}
        onChange={handleChange}
        value={item}
      />

      <AutoCompleteItem
        suggestions={suggestions}
        handleClickItem={handleClickProduct}
        // isLoading={isPlacePredictionsLoading}
        isOpenSuggestions={openSuggestions}
      />
    </div>
  );
};
