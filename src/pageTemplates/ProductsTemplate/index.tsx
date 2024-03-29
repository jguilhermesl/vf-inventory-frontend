import { IEditProduct, IProductModel } from '@/@types/product';
import {
  addProduct,
  deleteProduct,
  editProduct,
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
import { useAuth } from '@/hooks/useAuth';
import { handleToast } from '@/utils/handleToast';
import { PlusCircle } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export const ProductsTemplate = () => {
  const [modalAddProductIsOpen, setModalAddProductIsOpen] = useState(false);
  const [modalEditProductIsOpen, setModalEditProductIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({} as IProductModel);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const { isAuthenticated } = useAuth();

  const handleOpenEditProduct = (productId: string) => {
    const item = products.find((product) => product.id == productId);
    setCurrentProduct(item);
    setModalEditProductIsOpen(true);
  };

  const handleEditProduct = async (values: IEditProduct) => {
    setIsLoading(true);
    try {
      await editProduct(values, currentProduct.id);
      await handleFetchProducts();
      handleToast('Produto editado com sucesso.', 'success');
    } catch (err) {
      if (err.response.data.err) {
        handleToast(err.response.data.err, 'error');
        return;
      }
      handleToast('Erro ao editar produto.', 'error');
    } finally {
      setIsLoading(false);
      setModalEditProductIsOpen(false);
    }
  };

  const handleDeleteItem = async (productId: string) => {
    try {
      Swal.fire({
        title: 'Você tem certeza?',
        text: 'Essa ação é irreversível!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          await deleteProduct(productId);
          handleToast('Produto deletado com sucesso.', 'success');
          setIsLoading(false);
          handleFetchProducts();
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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

  const handleFetchProducts = useCallback(
    async (search?: string, page?: number) => {
      setIsLoading(true);
      try {
        const { products, totalPages } = await fetchProducts(
          search ?? '',
          page ?? 1
        );
        setProducts(products);
        setTotalPages(totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    handleFetchProducts();
  }, [handleFetchProducts, isAuthenticated]);

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
            handleEditItem={handleOpenEditProduct}
            handleDeleteItem={handleDeleteItem}
            tableTitle="Produtos"
            isLoading={isLoading}
            handleGetItemsWithSearch={handleFetchProducts}
            totalPage={totalPages}
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
        handleEditProduct={handleEditProduct}
      />
    </>
  );
};
