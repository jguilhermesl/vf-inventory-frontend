import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { IEditInventoryBody } from "@/@types/inventory";
import { editInventorySchema } from "@/validation/inventory";
import { convertFormatValidity } from "@/utils/convertFormatValidity";
import { formatDateToDDMMYYYY } from "@/utils/formatDateToDDMMYYYY";
import { convertQuantityToReal } from "@/utils/convertQuantityToReal";

interface IModalEditInventoryProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  currentInventory: any;
  handleEditInventory: (values: IEditInventoryBody) => Promise<void>;
}

export const ModalEditInventory = ({
  setModalIsOpen,
  modalIsOpen,
  currentInventory,
  handleEditInventory,
}: IModalEditInventoryProps) => {
  console.log(currentInventory);

  const formik = useFormik({
    isInitialValid: false,
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues: {
      lot: currentInventory?.lot || "",
      price: currentInventory?.price || "",
      quantity: currentInventory?.quantity || "",
      validity: formatDateToDDMMYYYY(currentInventory?.validity) || "",
    },
    validationSchema: editInventorySchema,
    onSubmit: (values) => handleEditInventory(values),
  });

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
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <Input
              value={currentInventory && currentInventory.productName}
              disabled
              label="Produto"
            />
            <Input
              label="Lote"
              error={formik.errors?.lot as string}
              {...formik.getFieldProps("lot")}
            />
            <Input
              label="Validade"
              error={formik.errors?.validity as string}
              {...formik.getFieldProps("validity")}
              placeholder="DD/MM/AAAA"
              onChange={(e) => {
                const formattedValue = convertFormatValidity(e.target.value);
                formik.setFieldValue("validity", formattedValue);
              }}
            />
            <Input
              type="number"
              label="Quantidade"
              error={formik.errors?.lot as string}
              {...formik.getFieldProps("quantity")}
            />
            <Input
              label="Preço"
              error={formik.errors?.price as string}
              {...formik.getFieldProps("price")}
              placeholder="R$"
              onChange={(e) => {
                const formattedValue = convertQuantityToReal(e.target.value);
                formik.setFieldValue("price", formattedValue);
              }}
            />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
              disabled={formik.isSubmitting || !formik.isValid}
              isLoading={formik.isSubmitting}
            >
              Salvar Estoque
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
