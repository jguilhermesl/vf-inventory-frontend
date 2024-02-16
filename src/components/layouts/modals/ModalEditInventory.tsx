import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { Dropdown } from "@/components/Dropdown";

interface IModalEditInventoryProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentInventory: any;
}

const MOCK_OPTIONS = [
  {
    label: "Lote Novo",
    value: "new",
  },
  {
    label: "Lote Existente",
    value: "existing",
  },
];

export const ModalEditInventory = ({
  setModalIsOpen,
  modalIsOpen,
  currentInventory,
}: IModalEditInventoryProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-6 py-4 min-w-[400px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Editar Estoque
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6">
                <XCircle size={24} />
              </Button>
            </Modal.Close>
          </header>
          <form className="flex flex-col gap-4" onSubmit={() => {}}>
            <Input
              value={currentInventory && currentInventory.Produto}
              disabled
              label="Produto"
            />
            <Dropdown options={MOCK_OPTIONS} label="Lote" />
            <Input
              label="Validade"
              value={currentInventory && currentInventory.Validade}
            />
            <Input
              label="Quantidade"
              value={currentInventory && currentInventory.Quantidade}
            />
            <Input
              label="Preço"
              value={currentInventory && currentInventory.Preço}
            />

            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
            >
              Salvar Estoque
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
