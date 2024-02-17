import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Heading } from "@/components/Heading";
import { Table } from "@/components/Table";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@/components/Button";
import { useCallback, useEffect, useState } from "react";
import { MOCK_INVENTORY } from "@/constants/inventory";
import { PlusCircle } from "phosphor-react";
import { ModalAddInventory } from "../../components/layouts/modals/ModalAddInventory";
import { ModalEditInventory } from "@/components/layouts/modals/ModalEditInventory";
import {
  IAddInventoryBody,
  addInventory,
  deleteInventory,
  fetchInventory,
} from "@/api/inventory";
import { handleToast } from "@/utils/handleToast";

export const InventoryTemplate = () => {
  const [inventory, setInventory] = useState([]);
  const [modalAddInventoryIsOpen, setModalAddInventoryIsOpen] = useState(false);
  const [modalEditInventoryIsOpen, setModalEditInventoryIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentInventory, setCurrentInventory] = useState({});

  const handleEditInventory = (inventoryId: string) => {
    const item = inventory.find((inventory) => inventory.id === inventoryId);
    setCurrentInventory(item);
    setModalEditInventoryIsOpen(true);
  };

  const handleAddInventory = async ({
    lot,
    price,
    productId,
    quantity,
    validity,
  }: IAddInventoryBody) => {
    setIsLoading(true);
    try {
      const response = await addInventory({
        lot,
        price,
        productId,
        quantity,
        validity,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setModalAddInventoryIsOpen(false);
      handleToast("Estoque adicionado com sucesso.", "success");
      handleFetchInventory();
    }
  };

  const handleFetchInventory = useCallback(async () => {
    try {
      const response = await fetchInventory();
      setInventory(response.inventory);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchInventory();
  }, []);

  const handleDeleteItem = async (inventoryId: string) => {
    setIsLoading(true);
    try {
      await deleteInventory(inventoryId);
    } catch (err) {
      console.log(err);
    } finally {
      handleFetchInventory();
      setIsLoading(false);
      handleToast("Estoque deletado com sucesso.", "success");
    }
  };

  return (
    <>
      <LayoutWithSidebar>
        <div>
          <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
            <div className="flex flex-col mb-4 lg:mb-0">
              <Heading>Estoque</Heading>
              <Paragraph>Gerencie seu estoque</Paragraph>
            </div>
            <Button
              className="!w-[255px]"
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddInventoryIsOpen(true)}
            >
              Adicionar estoque
            </Button>
          </div>
          <Table
            content={inventory}
            handleEditItem={handleEditInventory}
            tableTitle="Estoque"
            handleDeleteItem={handleDeleteItem}
          />
        </div>
      </LayoutWithSidebar>
      <ModalAddInventory
        modalIsOpen={modalAddInventoryIsOpen}
        setModalIsOpen={setModalAddInventoryIsOpen}
        handleAddInventory={handleAddInventory}
      />
      <ModalEditInventory
        modalIsOpen={modalEditInventoryIsOpen}
        setModalIsOpen={setModalEditInventoryIsOpen}
        currentInventory={currentInventory}
      />
    </>
  );
};
