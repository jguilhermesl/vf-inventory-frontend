import React, { useEffect, useState } from "react";
import "jspdf-autotable";
import {
  ArrowsDownUp,
  CaretLeft,
  CaretRight,
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
import { convertQuantityToReal } from "@/utils/convertQuantityToReal";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { useDebounce } from "@/hooks/useDebouce";
import { getDifferenceDays } from "@/utils/getDifferenceDays";
import { getPaymentMethodLabel } from "@/utils/getPaymentMethodLabel";
import { formatDateToDDMMYYYYhhmm } from "@/utils/formatDateToDDMMYYYYhhmm";

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
  totalPage: number;
  handleGetItemsWithSearch?: (search: string, page: number) => Promise<void>;
  itemsSort?: string[];
  handleSortItems?: (title: string) => void;
}

export const Table = ({
  content = [],
  handleDeleteItem,
  handleEditItem,
  disableDeleteItem,
  disableEditItem,
  emptyMessage = "Não foi encontrado nenhum dado.",
  disableActions,
  tableTitle,
  isLoading,
  totalPage,
  handleGetItemsWithSearch = async () => { },
  itemsSort = [],
  handleSortItems,
}: ITableProps) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
    await handleGetItemsWithSearch(debouncedSearch as string, currentPage);
  };

  const nextPage = () => {
    if (totalPage <= currentPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch, currentPage]);



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
                          {itemsSort.includes(title) ? (
                            <button
                              className="flex items-center gap-1"
                              onClick={() => handleSortItems(title)}
                            >
                              <Paragraph className="!font-bold !text-base">
                                {convertCamelCaseToWordsAndTranslate(title)}
                              </Paragraph>
                              <ArrowsDownUp size={20} color="#000" />
                            </button>
                          ) : (
                            <Paragraph className="!font-bold !text-base">
                              {convertCamelCaseToWordsAndTranslate(title)}
                            </Paragraph>
                          )}
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
                                    {item[title]}
                                  </Paragraph>
                                );

                              case "validity":
                                const originalValidity = item[title];
                                const formattedValidity =
                                  formatDateToDDMMYYYY(originalValidity);
                                const daysDifference =
                                  getDifferenceDays(originalValidity);

                                return (
                                  <Paragraph
                                    className={clsx(
                                      "flex items-center rounded text-center text-xs justify-center text-white uppercase font-bold w-[80px] py-1",
                                      {
                                        "bg-red-400": daysDifference <= 5,
                                        "bg-yellow-400":
                                          daysDifference >= 6 &&
                                          daysDifference <= 20,
                                        "bg-green-400": daysDifference > 20,
                                      }
                                    )}
                                  >
                                    {formattedValidity}
                                  </Paragraph>
                                );

                              case "createdAt":
                                const originalCreated = item[title];
                                const formattedCreated =
                                  formatDateToDDMMYYYYhhmm(originalCreated);
                                return (
                                  <Paragraph>{formattedCreated} </Paragraph>
                                );

                              case "customerPaymentType":
                                const chosenMethod = item[title];
                                const paymentMethod =
                                  getPaymentMethodLabel(chosenMethod);

                                return (
                                  <Paragraph className="!text-base">
                                    {paymentMethod}
                                  </Paragraph>
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
              <div className="mb-4 flex justify-between">
                <Paragraph size={ParagraphSizeVariant.Large}>
                  Total de itens: {content.length}
                </Paragraph>
                <div className="flex items-center gap-4">
                  <button
                    className="!w-8 !h-8 bg-primary rounded-full items-center flex justify-center disabled:bg-gray-200"
                    onClick={prevPage}
                    disabled={currentPage == 1}
                  >
                    <CaretLeft size={20} color="#FFF" />
                  </button>
                  <Paragraph> {currentPage} </Paragraph>
                  <button
                    onClick={nextPage}
                    disabled={currentPage == totalPage}
                    className="!w-8 !h-8 bg-primary rounded-full items-center flex justify-center disabled:bg-gray-200"
                  >
                    <CaretRight size={20} color="#FFF" />
                  </button>
                </div>
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
