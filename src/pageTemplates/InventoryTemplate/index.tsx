import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Heading } from "@/components/Heading";
import { Table } from "@/components/Table";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@/components/Button";
import { useState } from "react";
import { MOCK_INVENTORY } from "@/constants/inventory";
import { PlusCircle } from "phosphor-react";
import { ModalAddInventory } from "../../components/layouts/modals/ModalAddInventory";
import { ModalEditInventory } from "@/components/layouts/modals/ModalEditInventory";

export const InventoryTemplate = () => {
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [modalAddMemberIsOpen, setModalAddMemberIsOpen] = useState(false);
  const [modalEditMemberIsOpen, setModalEditMemberIsOpen] = useState(false);
  const [currentInventory, setCurrentInventory] = useState({});

  const handleEditMember = (memberId: string) => {
    const item = inventory.find((member) => member.id === memberId);
    setCurrentInventory(item);
    setModalEditMemberIsOpen(true);
  };
  return (
    <>
      <LayoutWithSidebar>
        <div>
          <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
            <div className="flex flex-col mb-4 lg:mb-0">
              <Heading>Estoque</Heading>
              <Paragraph>Gerencie seu Estoque</Paragraph>
            </div>
            <Button
              className="!w-[250px]"
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddMemberIsOpen(true)}
            >
              Adicionar Estoque
            </Button>
          </div>
          <Table content={inventory} handleEditItem={handleEditMember} />
        </div>
      </LayoutWithSidebar>
      <ModalAddInventory
        modalIsOpen={modalAddMemberIsOpen}
        setModalIsOpen={setModalAddMemberIsOpen}
      />
      <ModalEditInventory
        modalIsOpen={modalEditMemberIsOpen}
        setModalIsOpen={setModalEditMemberIsOpen}
        currentInventory={currentInventory}
      />
    </>
  );
};
