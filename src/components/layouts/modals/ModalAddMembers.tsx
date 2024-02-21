import { ICreateUserBody } from '@/api/user';
import { Button, ButtonVariant } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { MOCK_OPTIONS_ROLE_MEMBER } from '@/constants/inventory';
import { addMemberSchema } from '@/validation/members';
import { useFormik } from 'formik';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IModalAddProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddMember: (values: ICreateUserBody) => Promise<void>;
}

export const ModalAddMember = ({
  setModalIsOpen,
  modalIsOpen,
  handleAddMember,
}: IModalAddProductProps) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      role: '',
      password: '',
    },
    validationSchema: addMemberSchema,
    onSubmit: handleAddMember,
  });
  const [actionRole, setActionRole] = useState('');

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-6 py-4 min-w-[400px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Adicionar Membro
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
              error={formik.errors?.name as string}
              {...formik.getFieldProps('name')}
            />
            <Input
              label="Email"
              error={formik.errors?.email as string}
              {...formik.getFieldProps('email')}
            />
            <Dropdown
              onValueChange={(value: string) => setActionRole(value)}
              value={actionRole}
              options={MOCK_OPTIONS_ROLE_MEMBER}
              label="Cargo"
              placeholder="Selecione o tipo do cargo"
            />
            <Input
              label="Senha"
              error={formik.errors?.password as string}
              {...formik.getFieldProps('password')}
            />
            <Button
              type="submit"
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
              disabled={formik.isSubmitting || !formik.isValid}
              isLoading={formik.isSubmitting}
            >
              Adicionar Membro
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
