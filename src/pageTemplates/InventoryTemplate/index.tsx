import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Heading } from "@/components/Heading";
import { Table } from "@/components/Table";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@/components/Button";
import { useCallback, useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { ModalAddInventory } from "../../components/layouts/modals/ModalAddInventory";
import { ModalEditInventory } from "@/components/layouts/modals/ModalEditInventory";
import {
  addInventory,
  deleteInventory,
  fetchInventory,
  editInventory,
} from "@/api/inventory";
import { handleToast } from "@/utils/handleToast";
import { formatCurrencyToFloat } from "@/utils/formatCurrencyToFloat";
import {
  IAddInventoryBody,
  IEditInventoryBody,
  IInventoryModel,
} from "@/@types/inventory";

import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { convertRealToQuantity } from "@/utils/convertRealToQuantity";

export const InventoryTemplate = () => {
  const [inventory, setInventory] = useState([]);
  const [modalAddInventoryIsOpen, setModalAddInventoryIsOpen] = useState(false);
  const [modalEditInventoryIsOpen, setModalEditInventoryIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentInventory, setCurrentInventory] = useState(
    {} as IInventoryModel
  );

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

  const handleOpenEditInventory = (inventoryId: string) => {
    const item = inventory.find((inventory) => inventory.id === inventoryId);
    setCurrentInventory(item);
    setModalEditInventoryIsOpen(true);
  };

  const handleEditInventory = async (values: IEditInventoryBody) => {
    setIsLoading(true);
    try {
      await editInventory(values, currentInventory.id);
      await handleFetchInventory();
      handleToast("Estoque editado com sucesso.", "success");
    } catch (err) {
      if (err.response.data.err) {
        handleToast(err.response.data.err, "error");
        return;
      }
      handleToast("Erro ao editar membro.", "error");
    } finally {
      setIsLoading(false);
      setModalEditInventoryIsOpen(false);
    }
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
      await addInventory({
        lot,
        price: formatCurrencyToFloat(convertRealToQuantity(price)),
        productId,
        quantity,
        validity: formatDateToDDMMYYYY(validity),
      });
      handleToast("Estoque adicionado com sucesso.", "success");
      setModalAddInventoryIsOpen(false);
      handleFetchInventory();
    } catch (err) {
      handleToast("Algo aconteceu de errado.", "error");
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    handleFetchInventory();
  }, [handleFetchInventory]);

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
            handleEditItem={handleOpenEditInventory}
            tableTitle="Estoque"
            handleDeleteItem={handleDeleteItem}
            isLoading={isLoading}
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
        handleEditInventory={handleEditInventory}
      />
    </>
  );
};
