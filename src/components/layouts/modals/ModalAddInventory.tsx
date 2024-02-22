import { Button, ButtonVariant } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { addInventorySchema } from '@/validation/inventory';
import { useFormik } from 'formik';
import { CheckCircle, XCircle } from 'phosphor-react';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { AutoCompleteInput } from '@/components/AutoCompleteInput';
import { convertRealToQuantity } from '@/utils/convertRealToQuantity';
import { convertFormatValidity } from '@/utils/convertFormatValidity';
import { fetchProducts } from '@/api/products';
import { IAddInventoryBody } from '@/@types/inventory';

interface IModalAddProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleAddInventory: (values: IAddInventoryBody) => Promise<void>;
}

export const ModalAddInventory = ({
  setModalIsOpen,
  modalIsOpen,
  handleAddInventory,
}: IModalAddProductProps) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleGetProductsSuggestions = useCallback(async (value: string) => {
    const lowercaseQuery = value.toLowerCase();
    const { products } = await fetchProducts();

    const productsFiltered = products.filter((product) => {
      const lowercaseName = product.name.toLowerCase();
      const lowercaseSigla = product.sigla.toLowerCase();

      return (
        lowercaseName.includes(lowercaseQuery) ||
        lowercaseSigla.includes(lowercaseQuery)
      );
    });

    setSuggestions(productsFiltered);
  }, []);

  const formik = useFormik({
    isInitialValid: false,
    initialValues: {
      quantity: 0,
      price: 0,
      validity: '',
      lot: '',
      productId: '',
    },
    validateOnBlur: true,
    validationSchema: addInventorySchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await handleAddInventory(values);
        formik.resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error('Erro ao adicionar estoque:', error);
        setSubmitting(false);
      }
    },
  });

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
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <label>Produto</label>
            <AutoCompleteInput
              setItem={(productId: string) =>
                formik.setFieldValue('productId', productId)
              }
              getItems={handleGetProductsSuggestions}
              suggestions={suggestions}
            />
            <Input
              label="Lote"
              error={formik.errors?.lot as string}
              {...formik.getFieldProps('lot')}
              placeholder="Digite o lote"
            />
            <Input
              type="number"
              label="Quantidade"
              error={formik.errors?.quantity as string}
              {...formik.getFieldProps('quantity')}
              placeholder="Digite a quantidade"
            />
            <Input
              label="Preço"
              error={formik.errors?.price as string}
              {...formik.getFieldProps('price')}
              placeholder="R$"
              onChange={(e) => {
                const formattedValue = convertRealToQuantity(e.target.value);
                formik.setFieldValue('price', formattedValue);
              }}
            />
            <Input
              label="Validade"
              error={formik.errors?.validity as string}
              {...formik.getFieldProps('validity')}
              placeholder="Digite uma validade"
              onChange={(e) => {
                const formattedValue = convertFormatValidity(e.target.value);
                formik.setFieldValue('validity', formattedValue);
              }}
            />
            <Button
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
              disabled={formik.isSubmitting || !formik.isValid}
              isLoading={formik.isSubmitting}
            >
              Adicionar Estoque
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
