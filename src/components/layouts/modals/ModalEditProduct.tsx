import { IEditProduct } from "@/@types/product";
import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { editProductSchema } from "@/validation/products";
import { useFormik } from "formik";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

interface ModalEditProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentProduct: any;
  handleEditProduct: (values: IEditProduct) => Promise<void>;
}

export const ModalEditProduct = ({
  setModalIsOpen,
  modalIsOpen,
  currentProduct,
  handleEditProduct,
}: ModalEditProductProps) => {
  const formik = useFormik({
    isInitialValid: false,
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name,
      sigla: currentProduct?.sigla,
    },
    validationSchema: editProductSchema,
    onSubmit: (values) => handleEditProduct(values),
  });

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
          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <Input label="Código" value={currentProduct.code} disabled={true} />
            <Input
              label="Nome"
              value={currentProduct.name}
              error={formik.errors?.name as string}
              {...formik.getFieldProps("name")}
            />
            <Input
              label="Sigla"
              value={currentProduct.sigla}
              error={formik.errors?.sigla as string}
              {...formik.getFieldProps("sigla")}
            />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
              disabled={formik.isSubmitting || !formik.isValid}
              isLoading={formik.isSubmitting}
            >
              Salvar produto
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
