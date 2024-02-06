import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { Heading } from '@/components/Heading';
import { Table } from '@/components/Table';
import { Paragraph } from '@/components/Paragraph';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { MOCK_INVENTORY } from '@/constants/inventory';
import { PlusCircle } from 'phosphor-react';
import { ModalAddInventory } from '../../components/layouts/modals/ModalAddInventory';
import { ModalEditInventory } from '@/components/layouts/modals/ModalEditInventory';

export const InventoryTemplate = () => {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [modalAddInventoryIsOpen, setModalAddInventoryIsOpen] = useState(false);
  const [modalEditInventoryIsOpen, setModalEditInventoryIsOpen] =
    useState(false);
  const [currentInventory, setCurrentInventory] = useState({});

  const handleEditInventory = (inventoryId: string) => {
    const item = inventory.find((inventory) => inventory.id === inventoryId);
    setCurrentInventory(item);
    setModalEditInventoryIsOpen(true);
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
          />
        </div>
      </LayoutWithSidebar>
      <ModalAddInventory
        modalIsOpen={modalAddInventoryIsOpen}
        setModalIsOpen={setModalAddInventoryIsOpen}
      />
      <ModalEditInventory
        modalIsOpen={modalEditInventoryIsOpen}
        setModalIsOpen={setModalEditInventoryIsOpen}
        currentInventory={currentInventory}
      />
    </>
  );
};
