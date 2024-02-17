import { Button, ButtonVariant } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Paragraph, ParagraphSizeVariant } from "@/components/Paragraph";
import { addInventorySchema } from "@/validation/inventory";
import { useFormik } from "formik";
import { CheckCircle, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AutoCompleteInput } from "@/components/AutoCompleteInput";
import { Dropdown } from "@/components/Dropdown";
import { convertRealToQuantity } from "@/utils/convertRealToQuantity";
import { convertFormatValidity } from "@/utils/convertFormatValidity";
import { IAddInventoryBody } from "@/api/inventory";

interface IModalAddProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddInventory: (values: IAddInventoryBody) => Promise<void>;
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

export const ModalAddInventory = ({
  setModalIsOpen,
  modalIsOpen,
}: IModalAddProductProps) => {
  const handleAddMember = () => {};

  const formik = useFormik({
    initialValues: {
      quantity: "",
      price: "",
      validity: "",
    },
    validationSchema: addInventorySchema,
    onSubmit: handleAddMember,
  });

  const [inventory, setInventory] = useState("");

  return (
    <Modal.Root isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Modal.Content>
        <div className="bg-white px-6 py-4 min-w-[400px]">
          <header className="flex justify-between items-center w-full flex-1">
            <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
              Adicionar Estoque
            </Paragraph>
            <Modal.Close>
              <Button variant={ButtonVariant.iconOnly} className="!w-6">
                <XCircle size={24} />
              </Button>
            </Modal.Close>
          </header>
          <form className="flex flex-col gap-4" onSubmit={() => {}}>
            <label> Produto</label>
            <AutoCompleteInput product={inventory} setProduct={setInventory} />
            <Dropdown options={MOCK_OPTIONS} label="Lote" />
            <Input
              type="number"
              label="Quantidade"
              error={formik.errors?.quantity as string}
              {...formik.getFieldProps("quantity")}
              placeholder="0"
            />
            <Input
              label="Preço"
              error={formik.errors?.price as string}
              {...formik.getFieldProps("price")}
              placeholder="R$"
              onChange={(e) => {
                const formattedValue = convertRealToQuantity(e.target.value);
                formik.setFieldValue("price", formattedValue);
              }}
            />
            <Input
              label="Validade"
              error={formik.errors?.validity as string}
              {...formik.getFieldProps("validity")}
              placeholder="DD.MM.AAAA"
              onChange={(e) => {
                const formattedValue = convertFormatValidity(e.target.value);
                formik.setFieldValue("validity", formattedValue);
              }}
            />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
            >
              Adicionar Estoque
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
