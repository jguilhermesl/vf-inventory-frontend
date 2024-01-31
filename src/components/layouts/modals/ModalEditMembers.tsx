import { Button, ButtonVariant } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction } from 'react';

interface IModalEditProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentMember: any;
}

export const ModalEditMembers = ({
  setModalIsOpen,
  modalIsOpen,
  currentMember,
}: IModalEditProductProps) => {
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
          <form className="mt-6" onSubmit={() => {}}>
            <Input label="Nome" value={currentMember && currentMember.name} />
            <Input label="Email" value={currentMember && currentMember.email} />
            <Input label="Cargo" value={currentMember && currentMember.cargo} />
            <Input label="Senha" value={currentMember && currentMember.senha} />
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
