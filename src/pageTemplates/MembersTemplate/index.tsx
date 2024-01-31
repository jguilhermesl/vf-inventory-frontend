import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Heading } from "@/components/Heading";
import { Table } from "@/components/Table";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@/components/Button";
import { useState } from "react";
import { MOCK_MEMBERS } from "@/constants/members";
import { PlusCircle } from "phosphor-react";
import { ModalAddMember } from "../../components/layouts/modals/ModalAddMembers";
import { ModalEditMembers } from "@/components/layouts/modals/ModalEditMembers";

export const MembersTemplate = () => {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [modalAddProductIsOpen, setModalAddProductIsOpen] = useState(false);
  const [modalEditProductIsOpen, setModalEditProductIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({});

  const handleEditMember = (productid: string) => {
    const item = members.find((product) => product.id == productid);
    setCurrentMember(item);
    setModalEditProductIsOpen(true);
  };
  return (
    <>
      <LayoutWithSidebar>
        <div>
          <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
            <div className="flex flex-col mb-4 lg:mb-0">
              <Heading>Membros</Heading>
              <Paragraph>Gerencie seus membros</Paragraph>
            </div>
            <Button
              className="!w-[250px]"
              leftIcon={<PlusCircle color="#FFF" size={16} />}
              onClick={() => setModalAddProductIsOpen(true)}
            >
              Adicionar membro
            </Button>
          </div>
          <Table content={members} handleEditItem={handleEditMember} />
        </div>
      </LayoutWithSidebar>
      <ModalAddMember
        modalIsOpen={modalAddProductIsOpen}
        setModalIsOpen={setModalAddProductIsOpen}
      />
      <ModalEditMembers
        modalIsOpen={modalEditProductIsOpen}
        setModalIsOpen={setModalEditProductIsOpen}
        currentMember={currentMember}
      />
    </>
  );
};
