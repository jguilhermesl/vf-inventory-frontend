import { fetchHistory } from '@/api/history';
import { Heading } from '@/components/Heading';
import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { Paragraph } from '@/components/Paragraph';
import { Table } from '@/components/Table';
import { MOCK_HISTORY } from '@/constants/history';
import { handleToast } from '@/utils/handleToast';
import { useCallback, useEffect, useState } from 'react';

export const HistoryTemplate = () => {
  const [history, setHistory] = useState(MOCK_HISTORY);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchHistory = useCallback(async (search?: string) => {
    setIsLoading(true);
    try {
      const { history: data } = await fetchHistory(search ?? '');
      setHistory(data);
    } catch (err) {
      handleToast('Algo deu errado.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
          />
        </div>
      </LayoutWithSidebar>
    </>
  );
};
