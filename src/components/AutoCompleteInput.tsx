import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "@/components/Input";
import { MagnifyingGlass } from "phosphor-react";
import { memo } from "react";
import clsx from "clsx";
import { Spinner } from "./Spinner";
import { Line } from "./Line";
import { convertQuantityToReal } from "@/utils/convertQuantityToReal";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";

interface IAutoCompleteItemProps {
  suggestions: any[];
  handleClickItem?: (itemId: string) => void;
  isLoading?: boolean;
  isOpenSuggestions: boolean;
}

interface IAutoCompleteInputProps {
  setItem: Dispatch<SetStateAction<string>>;
  suggestions: any[];
  getItems: (value: string) => Promise<void>;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
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
          "bg-white max-h-[200px] w-[400px] overflow-auto rounded transition-all",
          {
            "h-0": !isOpenSuggestions,
            "border border-neutral-grey": isOpenSuggestions,
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
                {item?.name && `${item.name} | `}
                {item?.sigla && `${item.sigla} `}
                {item?.lot && `${item.lot} | `}
                {item?.product ||
                  (item?.productName &&
                    `${item?.product || item?.productName} | `)}
                {item?.price &&
                  `${convertQuantityToReal((item?.price * 100).toString())} | `}
                {item?.validity && formatDateToDDMMYYYY(item?.validity)}
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
  setItem,
  suggestions,
  getItems,
  value,
  setValue,
}: IAutoCompleteInputProps) => {
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [autoCompleteValue, setAutoCompleteValue] = useState("");

  const handleClickProduct = (itemId: string) => {
    const itemFiltered = suggestions.find((p) => p.id == itemId);
    const formattedString =
      `${itemFiltered?.name ? `${itemFiltered.name} | ` : ""}` +
      `${itemFiltered?.sigla ? `${itemFiltered.sigla} ` : ""}` +
      `${itemFiltered?.lot ? `${itemFiltered.lot} | ` : ""}` +
      `${
        itemFiltered?.product || itemFiltered?.productName
          ? `${itemFiltered?.product || itemFiltered?.productName} | `
          : ""
      }` +
      `${
        itemFiltered?.price
          ? `${convertQuantityToReal(
              (itemFiltered?.price * 100).toString()
            )} | `
          : ""
      }` +
      `${
        itemFiltered?.validity
          ? formatDateToDDMMYYYY(itemFiltered?.validity)
          : ""
      }`;

    setAutoCompleteValue(formattedString);
    setValue && setValue(formattedString);
    setItem(itemFiltered.id);
    setOpenSuggestions(false);
  };

  const handleChange = (e) => {
    getItems(e.target.value);
    setAutoCompleteValue(e.target.value);
    setValue && setValue(e.target.value);
    setOpenSuggestions(true);
  };

  return (
    <div className="">
      <Input
        name="autocomplete"
        className="py-3 w-full border-neutral-light-grey"
        placeholder="Digite o nome do produto ou sigla"
        iconRight={<MagnifyingGlass size={20} />}
        onChange={handleChange}
        value={value ?? autoCompleteValue}
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
