import {
  addProduct,
  deleteProduct,
  fetchProducts,
  IAddProductBody,
} from '@/api/products';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { ModalAddProduct } from '@/components/layouts/modals/ModalAddProduct';
import { ModalEditProduct } from '@/components/layouts/modals/ModalEditProduct';
import { Paragraph } from '@/components/Paragraph';
import { Table } from '@/components/Table';
import { handleToast } from '@/utils/handleToast';
import { PlusCircle } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';

export const ProductsTemplate = () => {
  const [modalAddProductIsOpen, setModalAddProductIsOpen] = useState(false);
  const [modalEditProductIsOpen, setModalEditProductIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditItem = (productId: string) => {
    const item = products.find((product) => product.id == productId);
    setCurrentProduct(item);
    setModalEditProductIsOpen(true);
  };

  const handleDeleteItem = async (productId: string) => {
    setIsLoading(true);
    try {
      await deleteProduct(productId);
    } catch (err) {
      console.log(err);
    } finally {
      handleFetchProducts();
      setIsLoading(false);
      handleToast('Produto deletado com sucesso.', 'success');
    }
  };

  const handleAddProduct = async ({ name, sigla }: IAddProductBody) => {
    setIsLoading(true);
    try {
      await addProduct({ name, sigla });
      handleToast('Produto adicionado com sucesso.', 'success');
      setModalAddProductIsOpen(false);
    } catch (err) {
      handleToast('Erro ao adicionar produto.', 'error');
    } finally {
      setIsLoading(false);
      handleFetchProducts();
    }
  };

  const handleFetchProducts = useCallback(async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.products);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <>
      <LayoutWithSidebar>
        <div>
          <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
            <div className="flex flex-col mb-4 lg:mb-0">
              <Heading>Produtos</Heading>
              <Paragraph>Gerencie seus produtos</Paragraph>
            </div>
            <Button
              className="!w-[250px]"
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddProductIsOpen(true)}
            >
              Adicionar produto
            </Button>
          </div>
          <Table
            content={products}
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
            tableTitle="Produtos"
            isLoading={isLoading}
          />
        </div>
      </LayoutWithSidebar>
      <ModalAddProduct
        modalIsOpen={modalAddProductIsOpen}
        setModalIsOpen={setModalAddProductIsOpen}
        handleAddProduct={handleAddProduct}
        isLoading={isLoading}
      />
      <ModalEditProduct
        modalIsOpen={modalEditProductIsOpen}
        setModalIsOpen={setModalEditProductIsOpen}
        currentProduct={currentProduct}
      />
    </>
  );
};
