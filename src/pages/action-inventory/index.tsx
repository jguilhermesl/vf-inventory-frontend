import { ActionInventoryTemplate } from '@/pageTemplates/ActionInventoryTemplate/index';
import { canSSRAuth } from '@/utils/canSSRAuth';

const ActionInventory = () => <ActionInventoryTemplate />;

export default ActionInventory;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
