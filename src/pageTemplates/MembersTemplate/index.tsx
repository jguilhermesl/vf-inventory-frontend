import { LayoutWithSidebar } from "@/components/layouts/LayoutWithSidebar";
import { Heading } from "../../components/Heading";
import { Table } from "../../components/Table";
import { Paragraph } from "@/components/Paragraph";
import { Button } from "@/components/Button";
import { useState } from "react";
import { MOCK_MEMBERS } from "@/constants/members";
import { PlusCircle } from "phosphor-react";

export const MembersTemplate = () => {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  return (
    <LayoutWithSidebar>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <Heading>Membros</Heading>
            <Paragraph>Gerencie seus membros</Paragraph>
          </div>
          <Button
            className="!w-[250px]"
            leftIcon={<PlusCircle color="#FFF" size={16} />}
          >
            Adicionar membro
          </Button>
        </div>
        <Table content={members} />
      </div>
    </LayoutWithSidebar>
  );
};
