import { addProduct, IAddProductBody } from '@/api/products';
import { Button, ButtonVariant } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { Paragraph, ParagraphSizeVariant } from '@/components/Paragraph';
import { Spinner } from '@/components/Spinner';
import { handleToast } from '@/utils/handleToast';
import { addProductSchema } from '@/validation/products';
import { useFormik } from 'formik';
import { CheckCircle, XCircle } from 'phosphor-react';
import { Dispatch, SetStateAction, useState } from 'react';

interface IModalAddProductProps {
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIsOpen: boolean;
  handleUpdateTable: () => Promise<void>;
}

export const ModalAddProduct = ({
  setModalIsOpen,
  modalIsOpen,
  handleUpdateTable,
}: IModalAddProductProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = async ({ name, sigla }: IAddProductBody) => {
    setIsLoading(true);
    try {
      const response = await addProduct({ name, sigla });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setModalIsOpen(false);
      handleToast('Produto adicionado com sucesso.', 'success');
      handleUpdateTable();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      sigla: '',
    },
    validationSchema: addProductSchema,
    onSubmit: (values) => handleAddProduct(values),
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
              label="Sigla"
              error={formik.errors?.sigla as string}
              {...formik.getFieldProps('sigla')}
            />
            <Button
              disabled={isLoading}
              className="w-[220px] mx-auto !text-sm"
              leftIcon={<CheckCircle color="#FFF" size={16} />}
            >
              {isLoading ? <Spinner /> : 'Adicionar produto'}
            </Button>
          </form>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
