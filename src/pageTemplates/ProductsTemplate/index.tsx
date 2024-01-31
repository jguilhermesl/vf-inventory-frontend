import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { ModalAddProduct } from "@/components/layouts/modals/ModalAddProduct";
import { ModalEditProduct } from "@/components/layouts/modals/ModalEditProduct";
import { Paragraph } from "@/components/Paragraph";
import { Table } from "@/components/Table";
import { MOCK_PRODUCTS } from "@/constants/products";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";

export const ProductsTemplate = () => {
  const [modalAddProductIsOpen, setModalAddProductIsOpen] = useState(false);
  const [modalEditProductIsOpen, setModalEditProductIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const handleEditItem = (productId: string) => {
    const item = products.find((product) => product.id == productId);
    setCurrentProduct(item);
    setModalEditProductIsOpen(true);
  };

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
          <Table content={products} handleEditItem={handleEditItem} />
        </div>
      </LayoutWithSidebar>
      <ModalAddProduct
        modalIsOpen={modalAddProductIsOpen}
        setModalIsOpen={setModalAddProductIsOpen}
      />
      <ModalEditProduct
        modalIsOpen={modalEditProductIsOpen}
        setModalIsOpen={setModalEditProductIsOpen}
        currentProduct={currentProduct}
      />
    </>
  );
};
