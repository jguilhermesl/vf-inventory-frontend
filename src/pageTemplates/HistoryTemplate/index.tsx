import { fetchHistory } from "@/api/history";
import { Heading } from "@/components/Heading";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Paragraph } from "@/components/Paragraph";
import { Table } from "@/components/Table";
import { handleToast } from "@/utils/handleToast";
import { useCallback, useEffect, useState } from "react";

export const HistoryTemplate = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const handleFetchHistory = useCallback(
    async (search?: string, page?: number) => {
      setIsLoading(true);
      try {
        const { history: data } = await fetchHistory(search ?? "", page ?? 1);
        setHistory(data);
        setTotalPages(page);
      } catch (err) {
        handleToast("Algo deu errado.", "error");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    handleFetchHistory();
  }, [handleFetchHistory]);

  return (
    <>
      <LayoutWithSidebar>
        <div>
          <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
            <div className="flex flex-col mb-4 lg:mb-0">
              <Heading>Histórico</Heading>
              <Paragraph>Gerencie seu Histórico</Paragraph>
            </div>
          </div>
          <Table
            content={history}
            disableActions
            tableTitle="Historico"
            isLoading={isLoading}
            handleGetItemsWithSearch={handleFetchHistory}
            totalPage={totalPages}
          />
        </div>
      </LayoutWithSidebar>
    </>
  );
};
