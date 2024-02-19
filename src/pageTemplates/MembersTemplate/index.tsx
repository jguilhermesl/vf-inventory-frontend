import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { Heading } from '@/components/Heading';
import { Table } from '@/components/Table';
import { Paragraph } from '@/components/Paragraph';
import { Button } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { ModalAddMember } from '@/components/layouts/modals/ModalAddMembers';
import { ModalEditMembers } from '@/components/layouts/modals/ModalEditMembers';
import {
  ICreateUserBody,
  deleteUser,
  editUser,
  fetchAllUsers,
  addUser,
} from '@/api/user';
import { handleToast } from '@/utils/handleToast';
import { IEditMember, IUserData } from '@/@types/user';

export const MembersTemplate = () => {
  const [members, setMembers] = useState([]);
  const [modalAddMemberIsOpen, setModalAddMemberIsOpen] = useState(false);
  const [modalEditMemberIsOpen, setModalEditMemberIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<IUserData>(
    {} as IUserData
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleAddMember = async ({
    name,
    password,
    role,
    email,
  }: ICreateUserBody) => {
    setIsLoading(true);
    try {
      await addUser({ name, password, role, email });
      handleToast('Membro adicionado com sucesso.', 'success');
      setModalAddMemberIsOpen(false);
    } catch (err) {
      if (err.response.data.err) {
        handleToast(err.response.data.err, 'error');
        return;
      }
      handleToast('Erro ao adicionar membro.', 'error');
    } finally {
      setIsLoading(false);
      handleFetchMembers();
    }
  };

  const handleOpenModalEditMember = async (userId: string) => {
    const item = members.find((member) => member.id == userId);
    setCurrentMember(item);
    setModalEditMemberIsOpen(true);
  };

  const handleEditMember = async (values: IEditMember) => {
    setIsLoading(true);
    try {
      await editUser(values, currentMember.id);
      await handleFetchMembers();
      handleToast('Membro editado com sucesso.', 'success');
    } catch (err) {
      if (err.response.data.err) {
        handleToast(err.response.data.err, 'error');
        return;
      }
      handleToast('Erro ao editar membro.', 'error');
    } finally {
      setIsLoading(false);
      setModalEditMemberIsOpen(false);
    }
  };

  const handleFetchMembers = useCallback(async () => {
    try {
      const response = await fetchAllUsers();
      setMembers(response.users);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchMembers();
  }, []);

  const handleDeleteItem = async (userId: string) => {
    setIsLoading(true);
    try {
      await deleteUser(userId);
      handleToast('Membro deletado com sucesso.', 'success');
    } catch (err) {
      handleToast('Algo aconteceu de errado.', 'error');
    } finally {
      handleFetchMembers();
      setIsLoading(false);
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
            handleEditItem={handleOpenModalEditMember}
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
        handleEditMember={handleEditMember}
      />
    </>
  );
};
