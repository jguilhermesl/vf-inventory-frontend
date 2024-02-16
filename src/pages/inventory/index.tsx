import { InventoryTemplate } from '@/pageTemplates/InventoryTemplate/index';
import { canSSRAuth } from '@/utils/canSSRAuth';

const Inventory = () => <InventoryTemplate />;

export default Inventory;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
