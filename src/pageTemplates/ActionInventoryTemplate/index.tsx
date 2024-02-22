import { IActionInventoryBody } from '@/@types/inventory';
import { actionInventory, fetchInventory } from '@/api/inventory';
import { AutoCompleteInput } from '@/components/AutoCompleteInput';
import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Heading } from '@/components/Heading';
import { Input } from '@/components/Input';
import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { Paragraph } from '@/components/Paragraph';
import {
  MOCK_OPTIONS_ACTIONS_TYPE,
  MOCK_OPTIONS_PAYMENTS_TYPE,
} from '@/constants/inventory';
import { handleToast } from '@/utils/handleToast';
import { actionInventorySchema } from '@/validation/inventory';
import { useFormik } from 'formik';
import { CheckCircle } from 'phosphor-react';
import { useCallback, useState } from 'react';

export const ActionInventoryTemplate = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCompleteValue, setAutoCompleteValue] = useState('');

  const handleGetInventory = useCallback(async (value: string) => {
    const lowercaseQuery = value.toLowerCase();
    const { inventory } = await fetchInventory();

    const inventoryFiltered = inventory.filter((inventory) => {
      const lowercaseLot = inventory.lot.toLowerCase();
      const lowercaseProduct = inventory.productName.toLowerCase();

      return (
        lowercaseLot.includes(lowercaseQuery) ||
        lowercaseProduct.includes(lowercaseQuery)
      );
    });

    setSuggestions(inventoryFiltered);
  }, []);

  const handleActionInventory = async (values) => {
    setIsLoading(true);
    try {
      const customerName =
        values.type === 'output' ? values.customerName : null;
      const customerPaymentType =
        values.type === 'output' ? values.customerPaymentType : null;

      const data: IActionInventoryBody = {
        type: values.type,
        customerName,
        customerPaymentType,
        quantity: values.quantity,
      };

      formik.resetForm();
      setAutoCompleteValue('');
      await actionInventory(data, values.inventoryId);
      handleToast('Ação realizada com sucesso.', 'success');
    } catch (err) {
      console.log(err);
      handleToast('Algo deu errado.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: 0,
      type: 'input',
      customerName: '',
      customerPaymentType: '',
      inventoryId: '',
    },
    validationSchema: actionInventorySchema,
    onSubmit: (values) => handleActionInventory(values),
    isInitialValid: false,
  });

  return (
    <LayoutWithSidebar>
      <div>
        <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
          <div className="flex flex-col mb-4 lg:mb-0">
            <Heading>Ações de estoque</Heading>
            <Paragraph>
              Faça lançamentos de saídas ou entradas no seu estoque
            </Paragraph>
          </div>
        </div>
        <div className="flex flex-col bg-white w-full px-2 lg:px-8 py-6 lg:rounded-2xl shadow-md border border-[#00000030] ">
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <Dropdown
              onValueChange={(value: string) => {
                console.log('values', value);
                formik.setFieldValue('type', value);
              }}
              options={MOCK_OPTIONS_ACTIONS_TYPE}
              error={formik.errors?.type as string}
              {...formik.getFieldProps('type')}
              label="Tipo da ação"
              placeholder="Selecione o tipo da ação"
            />
            {formik.values.type === 'output' && (
              <>
                <Input
                  placeholder="Digite o nome do cliente"
                  label="Cliente"
                  error={formik.errors?.customerName as string}
                  {...formik.getFieldProps('customerName')}
                />
                <Dropdown
                  onValueChange={(value: string) =>
                    formik.setFieldValue('customerPaymentType', value)
                  }
                  error={formik.errors?.customerPaymentType as string}
                  {...formik.getFieldProps('customerPaymentType')}
                  options={MOCK_OPTIONS_PAYMENTS_TYPE}
                  label="Tipo do pagamento"
                  placeholder="Selecione o tipo de pagamento"
                />
              </>
            )}
            <label>Estoque</label>
            <AutoCompleteInput
              setItem={(inventoryId: string) =>
                formik.setFieldValue('inventoryId', inventoryId)
              }
              value={autoCompleteValue}
              setValue={setAutoCompleteValue}
              getItems={handleGetInventory}
              suggestions={suggestions}
            />
            <Input
              placeholder="Escolha a quantidade"
              label="Quantidade"
              type={'number'}
              error={formik.errors?.quantity as string}
              {...formik.getFieldProps('quantity')}
            />
            <Button
              className="!w-[250px] mx-auto flex"
              leftIcon={<CheckCircle size={16} color="#FFF" />}
              disabled={isLoading || !formik.isValid}
              isLoading={isLoading}
            >
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
