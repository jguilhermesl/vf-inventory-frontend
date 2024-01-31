import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { addProductSchema } from "@/validation/products";
import { useFormik } from "formik";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface IModalAddProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
}

export const ModalAddProduct = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddProductProps) => {
  const handleAddProduct = () => {};

  const formik = useFormik({
    initialValues: {
      name: "",
      sigla: "",
    },
    validationSchema: addProductSchema,
    onSubmit: handleAddProduct,
  });

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-6 py-4 min-w-[400px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Adicionar produto
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6">
                <XCircle size={24} />
              </Button>
            </Modal.Close>
          </header>
          <form className="mt-6" onSubmit={() => {}}>
            <Input
              label="Nome"
              error={formik.errors?.name as string}
              {...formik.getFieldProps("name")}
            />
            <Input
              label="Sigla"
              error={formik.errors?.sigla as string}
              {...formik.getFieldProps("sigla")}
            />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
            >
              Adicionar produto
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
