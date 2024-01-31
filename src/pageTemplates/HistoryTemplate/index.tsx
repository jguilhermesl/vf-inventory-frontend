import { Heading } from "@/components/Heading";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Paragraph } from "@/components/Paragraph";
import { Table } from "@/components/Table";
import { MOCK_HISTORY } from "@/constants/history";
import { useState } from "react";

export const HistoryTemplate = () => {
  const [history, setHistory] = useState(MOCK_HISTORY);

  const handleEditItem = (productId: string) => {
    const item = history.find((product) => product.id == productId);
  };

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
          <Table content={history} handleEditItem={handleEditItem} />
        </div>
      </LayoutWithSidebar>
    </>
  );
};
