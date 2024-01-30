import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Paragraph } from "@/components/Paragraph";
import { Table } from "@/components/Table";
import { MOCK_PRODUCTS } from "@/constants/products";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";

export const ProductsTemplate = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  return (
    <LayoutWithSidebar>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <Heading>Produtos</Heading>
            <Paragraph>Gerencie seus produtos</Paragraph>
          </div>
          <Button
            className="!w-[250px]"
            leftIcon={<PlusCircle color="#FFF" size={16} />}
          >
            Adicionar produto
          </Button>
        </div>
        <Table content={products} />
      </div>
    </LayoutWithSidebar>
  );
};
