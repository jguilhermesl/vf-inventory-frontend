import { IEditMember } from '@/@types/user';
import { Button, ButtonVariant } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { addMemberSchema, editMemberSchema } from '@/validation/members';
import { useFormik } from 'formik';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface IModalEditProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentMember: any;
  handleEditMember: (values: IEditMember) => Promise<void>;
}

export const ModalEditMembers = ({
  setModalIsOpen,
  modalIsOpen,
  currentMember,
  handleEditMember,
}: IModalEditProductProps) => {
  console.log(currentMember);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentMember?.name,
      email: currentMember?.email,
      role: currentMember?.role,
      password: '',
    },
    validationSchema: editMemberSchema,
    onSubmit: (values) => handleEditMember(values),
  });

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-6 py-4 min-w-[400px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Editar Membro
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6">
                <XCircle size={24} />
              </Button>
            </Modal.Close>
          </header>
          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <Input
              label="Nome"
              value={currentMember.name}
              error={formik.errors?.name as string}
              {...formik.getFieldProps('name')}
            />
            <Input
              label="Email"
              error={formik.errors?.email as string}
              {...formik.getFieldProps('email')}
            />
            <Input
              label="Cargo"
              error={formik.errors?.role as string}
              {...formik.getFieldProps('role')}
            />
            <Input
              label="Senha"
              error={formik.errors?.password as string}
              {...formik.getFieldProps('password')}
            />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
            >
              Salvar Membro
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
