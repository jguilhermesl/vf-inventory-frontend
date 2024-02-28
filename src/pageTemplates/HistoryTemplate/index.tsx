import { fetchHistory } from "@/api/history";
import { Heading } from "@/components/Heading";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Paragraph } from "@/components/Paragraph";
import { Table } from "@/components/Table";
import { useAuth } from "@/hooks/useAuth";
import { handleToast } from "@/utils/handleToast";
import { sortItems } from "@/utils/sortItems";
import { useCallback, useEffect, useState } from "react";

const ITEMS_SORT = ["type", "inventoryProduct", "quantity"];

export const HistoryTemplate = () => {
  const [history, setHistory] = useState([]);
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const { isAuthenticated } = useAuth();

  const handleFetchHistory = useCallback(
    async (search?: string, page?: number) => {
      setIsLoading(true);
      try {
        const { history, totalPages } = await fetchHistory(
          search ?? "",
          page ?? 1
        );
        setHistory(history);
        setTotalPages(totalPages);
      } catch (err) {
        handleToast("Algo deu errado.", "error");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSortItems = (title: string) => {
    let items = [];

    switch (title) {
      case "type":
        items = sortItems(history, "type", sortDirection, "string");

      case "inventoryProduct":
        items = sortItems(history, "inventoryProduct", sortDirection, "string");
      case "quantity":
        items = sortItems(history, "quantity", sortDirection, "number");
    }

    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");

    setHistory(items);
  };

  useEffect(() => {
    handleFetchHistory();
  }, [handleFetchHistory, isAuthenticated]);

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
            itemsSort={ITEMS_SORT}
            handleSortItems={handleSortItems}
          />
        </div>
      </LayoutWithSidebar>
    </>
  );
};
