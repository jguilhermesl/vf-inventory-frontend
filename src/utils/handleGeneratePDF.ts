import jsPDF from "jspdf";
import { convertCamelCaseToWordsAndTranslate } from "@/utils/convertCamelCaseToWords";

export const handleGeneratePDF = (content, tableTitle) => {
  if (!Array.isArray(content) || content.length === 0) {
    console.error("Dados inválidos para gerar o arquivo PDF.");
    return;
  }

  const doc = new jsPDF();
  const titles = Object.keys(content[0]);
  const header = titles.map((title) => convertCamelCaseToWordsAndTranslate(title));
  const data = content.map((item) =>
    titles.map((title) => (item[title] != null ? String(item[title]) : ""))
  );
  const tableConfig = {
    head: [header],
    body: data,
    startY: 20,
    theme: "grid",
    styles: { overflow: "linebreak" },
    columnStyles: { 0: { cellWidth: "auto" } },
  };
  (doc as any).autoTable(tableConfig);

  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}.${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${currentDate.getFullYear()}`;

  const formattedTime = `${currentDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}`;

  // Utilize `${tableTitle}-${formattedDate}-${formattedTime}.pdf` para incluir data e hora no nome do arquivo
  doc.save(`${tableTitle}-${formattedDate}-${formattedTime}.pdf`);
};
