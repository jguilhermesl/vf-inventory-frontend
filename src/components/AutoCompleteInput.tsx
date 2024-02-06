import { useState } from 'react';
import { Input } from '@/components/Input';
import { MagnifyingGlass } from 'phosphor-react';
import { memo } from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';
import { Line } from './Line';
import { MOCK_PRODUCTS } from '@/constants/products';

interface AutoCompleteItemProps {
  suggestions: any[];
  handleClickProduct?: (productId: string) => void;
  isLoading?: boolean;
  isOpenSuggestions: boolean;
}

const AutoCompleteItem = memo(
  ({
    suggestions,
    handleClickProduct,
    isLoading,
    isOpenSuggestions,
  }: AutoCompleteItemProps) => {
    return (
      <div
        className={clsx(
          'bg-white max-h-[100px] w-[400px] overflow-auto rounded transition-all',
          {
            'h-0': !isOpenSuggestions,
            'border border-neutral-grey': isOpenSuggestions,
          }
        )}
      >
        <ul className="flex flex-1 flex-col gap-2 p-3">
          {isLoading ? (
            <Spinner />
          ) : (
            suggestions?.map((product) => (
              <li
                key={product.id}
                onClick={() => handleClickProduct(product.id)}
                className="text-neutral-grey font-poppins text-sm truncate hover:underline hover:text-neutral-darkest cursor-pointer"
              >
                {product.name}
                <Line className="mt-2" />
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
);

export const AutoCompleteInput = ({ product, setProduct }) => {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [productsSuggestions, setProductsSuggestions] = useState(MOCK_PRODUCTS);

  const handleClickProduct = (productId: string) => {
    const productFiltered = productsSuggestions.find((p) => p.id == productId);
    setProduct(productFiltered.name);
    setOpenSuggestions(false);
  };

  const getProducts = (value: string) => {
    const lowercaseQuery = value.toLowerCase();

    const productsFiltered = MOCK_PRODUCTS.filter((product) => {
      const lowercaseName = product.name.toLowerCase();
      const lowercaseCode = product.code.toLowerCase();
      const lowercaseSigla = product.sigla.toLowerCase();

      return (
        lowercaseName.includes(lowercaseQuery) ||
        lowercaseCode.includes(lowercaseQuery) ||
        lowercaseSigla.includes(lowercaseQuery)
      );
    });
    console.log('proucts ==> ', productsFiltered);

    setProductsSuggestions(productsFiltered);
  };

  const handleChange = (e) => {
    getProducts(e.target.value);
    setProduct(e.target.value);
    setOpenSuggestions(true);
  };

  return (
    <div className="">
      <Input
        name="autocomplete"
        className="py-3 w-full border-neutral-light-grey"
        placeholder="Digite e escolha seu produto"
        iconRight={<MagnifyingGlass size={20} />}
        onChange={handleChange}
        value={product}
      />

      <AutoCompleteItem
        suggestions={productsSuggestions}
        handleClickProduct={handleClickProduct}
        // isLoading={isPlacePredictionsLoading}
        isOpenSuggestions={openSuggestions}
      />
    </div>
  );
};
