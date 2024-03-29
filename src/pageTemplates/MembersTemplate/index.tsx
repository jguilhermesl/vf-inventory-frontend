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
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/useAuth';

export const MembersTemplate = () => {
  const [members, setMembers] = useState([]);
  const [modalAddMemberIsOpen, setModalAddMemberIsOpen] = useState(false);
  const [modalEditMemberIsOpen, setModalEditMemberIsOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentMember, setCurrentMember] = useState<IUserData>(
    {} as IUserData
  );
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuth();

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

  const handleFetchMembers = useCallback(
    async (search?: string, page?: number) => {
      setIsLoading(true);
      try {
        const { users, totalPages } = await fetchAllUsers(
          search ?? '',
          page ?? 1
        );
        setMembers(users);
        setTotalPages(totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    handleFetchMembers();
  }, [handleFetchMembers, isAuthenticated]);

  const handleDeleteItem = async (userId: string) => {
    try {
      Swal.fire({
        title: 'Você tem certeza?',
        text: 'Essa ação é irreversível!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          await deleteUser(userId);
          handleToast('Membro deletado com sucesso.', 'success');
          setIsLoading(false);
          handleFetchMembers();
        }
      });
    } catch (err) {
      handleToast('Algo aconteceu de errado.', 'error');
    } finally {
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
            handleGetItemsWithSearch={handleFetchMembers}
            totalPage={totalPages}
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
