import React from 'react';
import 'jspdf-autotable';
import {
  FileCsv,
  FilePdf,
  MagnifyingGlass,
  PencilLine,
  Trash,
} from 'phosphor-react';
import { Line } from './Line';
import { Paragraph, ParagraphSizeVariant } from './Paragraph';
import { ReactNode } from 'react';
import { Input } from './Input';
import clsx from 'clsx';
import { convertCamelCaseToWords } from '@/utils/convertCamelCaseToWords';
import { handleGenerateExcel } from '@/utils/handleGenerateExcel';
import { handleGeneratePDF } from '@/utils/handleGeneratePDF';
import { Spinner } from './Spinner';

interface ITableProps {
  content: any[];
  showIdColumn?: false;
  handleDeleteItem?: (id: string) => void;
  handleEditItem?: (id: string) => void;
  handleAccessItem?: (id: string) => void;
  disableAccessItem?: boolean;
  disableDeleteItem?: boolean;
  disableEditItem?: boolean;
  emptyMessage?: string;
  tableTitle?: string;
  headerComponent?: ReactNode;
  disableActions?: boolean;
  isLoading?: boolean;
}

export const Table = ({
  content,
  handleAccessItem,
  handleDeleteItem,
  handleEditItem,
  disableAccessItem,
  disableDeleteItem,
  disableEditItem,
  emptyMessage,
  disableActions,
  tableTitle,
  isLoading,
}: ITableProps) => {
  const titles = content[0]
    ? Object.keys(content[0]).filter((item) => item != 'id')
    : [];

  const columnsQuantity = titles.length;

  const calculateWidthSize = () => {
    const widthSize = Number((100 / (titles.length + 1)).toFixed(0));
    return `${widthSize}%`;
  };

  return (
    <div className="flex flex-col bg-white w-full px-2 lg:px-8 py-6 lg:rounded-2xl shadow-md border border-[#00000030] ">
      <div className="flex flex-col w-full overflow-x-auto flex-1 min-h-[200px]">
        <header className="flex items-center justify-between mb-4 w-full">
          <Input
            placeholder="Procure por algum item"
            iconLeft={<MagnifyingGlass size={16} />}
            className="!w-[250px]"
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
        {titles.length ? (
          isLoading ? (
            <div className="w-full items-center justify-center flex flex-col mt-5">
              <Spinner />
            </div>
          ) : (
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
                            {convertCamelCaseToWords(title)}
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
                      key={item.name}
                      className="w-full flex hover:bg-background  py-4 border-b border-b-[#00000010]"
                    >
                      {titles.map((title) => (
                        <td
                          className={`flex min-w-[180px]`}
                          style={{ width: calculateWidthSize() }}
                        >
                          {title == 'Modalidade' ? (
                            <div
                              className={clsx(
                                'flex items-center rounded text-center w-[80px] py-2',
                                {
                                  'bg-red-400': item[title] === 'Saida',
                                  'bg-green-400': item[title] === 'Entrada',
                                }
                              )}
                            >
                              <Paragraph className="text-white font-bold flex mx-auto">
                                {item[title]}
                              </Paragraph>
                            </div>
                          ) : (
                            <Paragraph className="!text-base">
                              {item[title]}
                            </Paragraph>
                          )}
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
          )
        ) : (
          <div className="flex items-center justify-center flex-col  py-4">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              {emptyMessage}
            </Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};
