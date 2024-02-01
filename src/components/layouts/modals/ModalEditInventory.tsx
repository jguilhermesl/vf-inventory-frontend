import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AutoCompleteInput } from "@/components/AutoCompleteInput";
import { Dropdown } from "@/components/Dropdown";

interface IModalEditProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentInventory: any;
}

export const ModalEditInventory = ({
  setModalIsOpen,
  modalIsOpen,
  currentInventory,
}: IModalEditProductProps) => {
  const MOCK_OPTIONS = [
    {
      label: "Lote Novo",
      value: "novo",
    },
    {
      label: "Lote Existente",
      value: "existente",
    },
  ];
  const [inventory, setInventory] = useState("");
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
            <AutoCompleteInput product={inventory} setProduct={setInventory} />
            <Dropdown options={MOCK_OPTIONS} />
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
