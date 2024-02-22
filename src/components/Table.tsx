import React, { useCallback, useEffect, useState } from "react";
import "jspdf-autotable";
import {
  FileCsv,
  FilePdf,
  MagnifyingGlass,
  PencilLine,
  Trash,
} from "phosphor-react";
import { Line } from "./Line";
import { Paragraph, ParagraphSizeVariant } from "./Paragraph";
import { ReactNode } from "react";
import { Input } from "./Input";
import clsx from "clsx";
import { convertCamelCaseToWordsAndTranslate } from "@/utils/convertCamelCaseToWords";
import { handleGenerateExcel } from "@/utils/handleGenerateExcel";
import { handleGeneratePDF } from "@/utils/handleGeneratePDF";
import { Spinner } from "./Spinner";
import { convertRealToQuantity } from "@/utils/convertRealToQuantity";
import { Button } from "./Button";
import { convertFormatValidity } from "@/utils/convertFormatValidity";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { useDebounce } from "@/hooks/useDebouce";

interface ITableProps {
  content: any[];
  showIdColumn?: false;
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
  emptyMessage?: string;
  tableTitle?: string;
  headerComponent?: ReactNode;
  disableActions?: boolean;
  isLoading?: boolean;
  handleGetItemsWithSearch?: (search: string) => Promise<void>;
}

export const Table = ({
  content,
  handleDeleteItem,
  handleEditItem,
  disableDeleteItem,
  disableEditItem,
  emptyMessage = "Não foi encontrado nenhum dado.",
  disableActions,
  tableTitle,
  isLoading,
  handleGetItemsWithSearch = async () => {},
}: ITableProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  const titles = content[0]
    ? Object.keys(content[0]).filter((item) => item != "id")
    : [];

  const columnsQuantity = titles.length;

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  const handleSearch = async () => {
    await handleGetItemsWithSearch(debouncedSearch as string);
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col bg-white w-full px-2 lg:px-8 py-6 lg:rounded-2xl shadow-md border border-[#00000030] ">
      <div className="flex flex-col w-full overflow-x-auto flex-1 min-h-[200px]">
        <header className="flex items-center justify-between mb-4 w-full">
          <Input
            placeholder="Procure por algum item"
            iconLeft={<MagnifyingGlass size={16} />}
            className="!w-[250px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <button className="!w-8 !h-8 bg-primary rounded-full items-center flex justify-center">
              <FileCsv
                size={20}
                color="#FFF"
                onClick={() => handleGenerateExcel(content, tableTitle)}
              />
            </button>
            <button className="!w-8 !h-8 bg-primary rounded-full items-center flex justify-center">
              <FilePdf
                size={20}
                color="#FFF"
                onClick={() => handleGeneratePDF(content, tableTitle)}
              />
            </button>
          </div>
        </header>
        {!isLoading ? (
          titles.length ? (
            <>
              <table
                className="flex flex-col "
                style={{
                  minWidth:
                    (disableActions ? columnsQuantity : columnsQuantity + 0.5) *
                    180,
                }}
              >
                <thead className="flex py-4 px-4 w-full rounded-lg bg-background ">
                  <tr className="flex justify-between w-full">
                    {titles.map((title) => {
                      return (
                        <th
                          key={title}
                          className={`flex justify-start min-w-[180px]`}
                          style={{ width: calculateWidthSize() }}
                        >
                          <Paragraph className="!font-bold !text-base">
                            {convertCamelCaseToWordsAndTranslate(title)}
                          </Paragraph>
                        </th>
                      );
                    })}
                    {!disableActions && (
                      <th
                        className={`flex justify-start`}
                        style={{ width: calculateWidthSize() }}
                      ></th>
                    )}
                  </tr>
                </thead>
                <tbody className={`flex flex-col gap-4 mt-4 w-full ml-4`}>
                  {content.map((item) => (
                    <tr
                      key={item.id}
                      className="w-full flex hover:bg-background  py-4 border-b border-b-[#00000010]"
                    >
                      {titles.map((title) => (
                        <td
                          className={`flex min-w-[180px]`}
                          style={{ width: calculateWidthSize() }}
                        >
                          {(() => {
                            console.log(title);
                            switch (title) {
                              case "type":
                                return (
                                  <Paragraph
                                    className={clsx(
                                      "flex items-center rounded text-center text-xs justify-center text-white uppercase font-bold w-[80px] py-1",
                                      {
                                        "bg-red-400": item[title] === "output",
                                        "bg-green-400": item[title] === "input",
                                      }
                                    )}
                                  >
                                    {item[title] === "output" && "Saída"}
                                    {item[title] === "input" && "Entrada"}
                                  </Paragraph>
                                );

                              case "price":
                                const priceValue = parseFloat(item[title]);
                                const formattedPrice = priceValue.toFixed(2);
                                return (
                                  <Paragraph className="!text-base">
                                    {convertRealToQuantity(
                                      formattedPrice.toString()
                                    )}
                                  </Paragraph>
                                );

                              case "validity":
                                const originalValidity = item[title];
                                const formattedValidity =
                                  formatDateToDDMMYYYY(originalValidity);
                                return (
                                  <Paragraph>{formattedValidity}</Paragraph>
                                );

                              case "createdAt":
                                const originalCreated = item[title];
                                const formattedCreated =
                                  formatDateToDDMMYYYY(originalCreated);
                                return (
                                  <Paragraph>{formattedCreated} </Paragraph>
                                );

                              default:
                                return (
                                  <Paragraph className="!text-base">
                                    {item[title] ?? "-"}
                                  </Paragraph>
                                );
                            }
                          })()}
                        </td>
                      ))}
                      {!disableActions && (
                        <td
                          className={`flex gap-2 `}
                          style={{ width: calculateWidthSize() }}
                        >
                          {!disableDeleteItem && (
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                            >
                              <Trash
                                size={20}
                                className="text-primary hover:text-white"
                              />
                            </button>
                          )}
                          {!disableEditItem && (
                            <button
                              onClick={() => handleEditItem(item.id)}
                              className="bg-none border-none rounded-full hover:bg-primary hover:text-white p-1"
                            >
                              <PencilLine
                                size={20}
                                className="text-primary hover:text-white"
                              />
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Line className="my-4 " />
              <div className="mb-4">
                <Paragraph size={ParagraphSizeVariant.Large}>
                  Total de itens: {content.length}
                </Paragraph>
              </div>
            </>
          ) : (
            <div className="flex flex-col mt-12">
              <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
                {emptyMessage}
              </Paragraph>
            </div>
          )
        ) : (
          <div className="w-full items-center justify-center flex flex-col mt-5">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
