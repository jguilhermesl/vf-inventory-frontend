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
  const [modalAddMemberIsOpen, setModalAddMemberIsOpen] = useState(false);
  const [modalEditMemberIsOpen, setModalEditMemberIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({});

  const handleEditMember = (memberId: string) => {
    const item = members.find((member) => member.id == memberId);
    setCurrentMember(item);
    setModalEditMemberIsOpen(true);
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
              onClick={() => setModalAddMemberIsOpen(true)}
            >
              Adicionar membro
            </Button>
          </div>
          <Table
            content={members}
            handleEditItem={handleEditMember}
            tableTitle="membros"
          />
        </div>
      </LayoutWithSidebar>
      <ModalAddMember
        modalIsOpen={modalAddMemberIsOpen}
        setModalIsOpen={setModalAddMemberIsOpen}
      />
      <ModalEditMembers
        modalIsOpen={modalEditMemberIsOpen}
        setModalIsOpen={setModalEditMemberIsOpen}
        currentMember={currentMember}
      />
    </>
  );
};
