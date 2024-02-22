import { HistoryTemplate } from '@/pageTemplates/HistoryTemplate/index';
import { canSSRAuth } from '@/utils/canSSRAuth';

const History = () => <HistoryTemplate />;

export default History;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
