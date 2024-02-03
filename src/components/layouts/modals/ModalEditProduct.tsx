import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface ModalEditProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentProduct: any;
}

export const ModalEditProduct = ({
  setModalIsOpen,
  modalIsOpen,
  currentProduct,
}: ModalEditProductProps) => {
  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-6 py-4 min-w-[400px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Editar produto
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6">
                <XCircle size={24} />
              </Button>
            </Modal.Close>
          </header>
          <form className="mt-6" onSubmit={() => {}}>
            <Input label="Código" value={currentProduct.code} disabled={true} />
            <Input label="Nome" value={currentProduct.name} />
            <Input label="Sigla" value={currentProduct.sigla} />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
            >
              Salvar produto
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
