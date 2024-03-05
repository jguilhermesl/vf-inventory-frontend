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
import { convertQuantityToReal } from "@/utils/convertQuantityToReal";
import { formatDDMMYYYYToDate } from "@/utils/formatDDMMYYYYToDate";
import { sortItems } from "@/utils/sortItems";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

const ITEMS_SORT = ["validity", "quantity"];

export const InventoryTemplate = () => {
  const [inventory, setInventory] = useState([]);
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [modalAddInventoryIsOpen, setModalAddInventoryIsOpen] = useState(false);
  const [modalEditInventoryIsOpen, setModalEditInventoryIsOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentInventory, setCurrentInventory] = useState(
    {} as IInventoryModel
  );

  const { isAuthenticated } = useAuth();

  const handleFetchInventory = useCallback(
    async (search?: string, page?: number) => {
      setIsLoading(true);
      try {
        const { inventory, totalPages } = await fetchInventory(
          search ?? "",
          page ?? 1
        );
        setInventory(inventory);
        setTotalPages(totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleOpenEditInventory = (inventoryId: string) => {
    const item = inventory.find((inventory) => inventory.id === inventoryId);
    setCurrentInventory(item);
    setModalEditInventoryIsOpen(true);
  };

  const handleEditInventory = async (values: IEditInventoryBody) => {
    setIsLoading(true);
    try {
      await editInventory(
        {
          ...values,
          validity: formatDDMMYYYYToDate(values.validity).toString(),
        },
        currentInventory.id
      );
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
        price: formatCurrencyToFloat(convertQuantityToReal(price)),
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
    try {
      Swal.fire({
        title: "Você tem certeza?",
        text: "Essa ação é irreversível!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          await deleteInventory(inventoryId);
          handleToast("Estoque deletado com sucesso.", "success");
          handleFetchInventory();
          setIsLoading(false);
        }
      });
    } catch (err) {
      console.error("Erro ao exibir pop-up de confirmação:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSortItems = (title: string) => {
    let items = [];

    switch (title) {
      case "quantity":
        items = sortItems(inventory, "quantity", sortDirection, "number");

      case "validity":
        items = sortItems(inventory, "validity", sortDirection, "date");
    }

    setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");

    setInventory(items);
  };

  useEffect(() => {
    handleFetchInventory();
  }, [handleFetchInventory, isAuthenticated]);

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
            handleGetItemsWithSearch={handleFetchInventory}
            totalPage={totalPages}
            itemsSort={ITEMS_SORT}
            handleSortItems={handleSortItems}
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
