import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Heading } from "@/components/Heading";
import { Table } from "@/components/Table";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@/components/Button";
import { useCallback, useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { ModalAddMember } from "@/components/layouts/modals/ModalAddMembers";
import { ModalEditMembers } from "@/components/layouts/modals/ModalEditMembers";
import {
  ICreateUserBody,
  deleteUser,
  editUser,
  fetchAllUsers,
  addUser,
} from "@/api/user";
import { handleToast } from "@/utils/handleToast";

export const MembersTemplate = () => {
  const [members, setMembers] = useState([]);
  const [modalAddMemberIsOpen, setModalAddMemberIsOpen] = useState(false);
  const [modalEditMemberIsOpen, setModalEditMemberIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleAddMember = async ({
    name,
    password,
    role,
    email,
  }: ICreateUserBody) => {
    setIsLoading(true);
    try {
      const response = await addUser({ name, password, role, email });
      console.log(response);
    } catch (err) {
      handleToast("Erro ao adicionar membro", "error");
      console.log(err);
    } finally {
      setIsLoading(false);
      setModalAddMemberIsOpen(false);
      handleToast("Membro adicionado com sucesso.", "success");
      handleFetchMembers();
    }
  };

  const handleEditMember = async (memberId: string) => {
    const item = members.find((member) => member.id == memberId);
    try {
      await editUser(memberId);
      setCurrentMember(item);
      setModalEditMemberIsOpen(true);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchMembers = useCallback(async () => {
    try {
      const response = await fetchAllUsers();
      setMembers(response.members);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchMembers();
  }, []);

  const handleDeleteItem = async (userID: string) => {
    setIsLoading(true);
    try {
      await deleteUser(userID);
    } catch (err) {
      console.log(err);
    } finally {
      handleFetchMembers();
      setIsLoading(false);
      handleToast("Membro deletado com sucesso.", "success");
    }
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
            handleDeleteItem={handleDeleteItem}
            isLoading={isLoading}
          />
        </div>
      </LayoutWithSidebar>
      <ModalAddMember
        modalIsOpen={modalAddMemberIsOpen}
        setModalIsOpen={setModalAddMemberIsOpen}
        handleAddMember={handleAddMember}
      />
      <ModalEditMembers
        modalIsOpen={modalEditMemberIsOpen}
        setModalIsOpen={setModalEditMemberIsOpen}
        currentMember={currentMember}
      />
    </>
  );
};
