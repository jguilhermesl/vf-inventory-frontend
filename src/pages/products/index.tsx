import { ProductsTemplate } from '@/pageTemplates/ProductsTemplate';
import { canSSRAuth } from '@/utils/canSSRAuth';

const Products = () => <ProductsTemplate />;

export default Products;

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
