import { AutoCompleteInput } from '@/components/AutoCompleteInput';
import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Heading } from '@/components/Heading';
import { Input } from '@/components/Input';
import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { Paragraph } from '@/components/Paragraph';
import {
  MOCK_INVENTORY,
  MOCK_OPTIONS_ACTIONS_TYPE,
  MOCK_OPTIONS_PAYMENTS_TYPE,
} from '@/constants/inventory';
import { CheckCircle } from 'phosphor-react';
import { useCallback, useEffect, useState } from 'react';

export const ActionInventoryTemplate = () => {
  const [inventory, setInventory] = useState('');
  const [suggestions, setSuggestions] = useState(MOCK_INVENTORY);
  const [actionType, setActionType] = useState('');
  const [paymentType, setPaymentType] = useState('');

  const handleGetInventory = useCallback(async (value: string) => {
    const lowercaseQuery = value.toLowerCase();
    // const inventory = await getInventory();

    const inventoryFiltered = MOCK_INVENTORY.filter((inventory) => {
      const lowercaseCode = inventory.code.toLowerCase();
      const lowercaseLot = inventory.Lote.toLowerCase();
      const lowercaseProduct = inventory.Produto.toLowerCase();

      return (
        lowercaseLot.includes(lowercaseQuery) ||
        lowercaseCode.includes(lowercaseQuery) ||
        lowercaseProduct.includes(lowercaseQuery)
      );
    });

    setSuggestions(inventoryFiltered);
  }, []);

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
          <form className="flex flex-col gap-4">
            <Dropdown
              onValueChange={(value: string) => setActionType(value)}
              value={actionType}
              options={MOCK_OPTIONS_ACTIONS_TYPE}
              label="Tipo da ação"
              placeholder="Selecione o tipo da ação"
            />
            {actionType === 'saida' && (
              <>
                <Input placeholder="Digite o nome do cliente" label="Cliente" />
                <Dropdown
                  onValueChange={(value: string) => setPaymentType(value)}
                  value={paymentType}
                  options={MOCK_OPTIONS_PAYMENTS_TYPE}
                  label="Tipo da pagamento"
                  placeholder="Selecione o tipo de pagamento"
                />
              </>
            )}
            <label>Estoque</label>
            <AutoCompleteInput
              item={inventory}
              setItem={setInventory}
              getItems={handleGetInventory}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
            />
            <Input
              placeholder="Escolha a quantidade"
              label="Quantidade"
              type={'number'}
            />
            <Button
              className="!w-[250px] mx-auto flex"
              leftIcon={<CheckCircle size={16} color="#FFF" />}
            >
              Confirmar
            </Button>
          </form>
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
