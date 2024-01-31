import { AutoCompleteInput } from '@/components/AutoCompleteInput';
import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { Heading } from '@/components/Heading';
import { Input } from '@/components/Input';
import { LayoutWithSidebar } from '@/components/layouts/LayoutWithSidebar';
import { Paragraph } from '@/components/Paragraph';
import { CheckCircle } from 'phosphor-react';

const MOCK_OPTIONS = [
  {
    label: 'ICA133',
    value: 'ica133',
  },
  {
    label: 'ICA134',
    value: 'ica134',
  },
  {
    label: 'ICA135',
    value: 'ica135',
  },
];

export const ActionInventoryTemplate = () => {
  return (
    <LayoutWithSidebar>
      <div>
        <div className="mb-6 flex items-center justify-center text-center lg:text-start lg:justify-between flex-col lg:flex-row">
          <div className="flex flex-col mb-4 lg:mb-0">
            <Heading>Baixa de estoque</Heading>
            <Paragraph>Faça lançamentos de saída no seu estoque</Paragraph>
          </div>
        </div>
        <div className="flex flex-col bg-white w-full px-2 lg:px-8 py-6 lg:rounded-2xl shadow-md border border-[#00000030] ">
          <form className="flex flex-col gap-4">
            <AutoCompleteInput />
            <Dropdown options={MOCK_OPTIONS} />
            <Input placeholder="Escolha a quantidade" type={'number'} />
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
