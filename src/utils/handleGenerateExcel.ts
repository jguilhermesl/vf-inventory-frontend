import { TRANSLATION } from "@/constants/translate";
import * as XLSX from "xlsx";

export const handleGenerateExcel = (content, tableTitle) => {
  if (!Array.isArray(content) || content.length === 0) {
    console.error("Dados inválidos para gerar o arquivo Excel.");
    return;
  }

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

  content.map((row) => {
    const titles = Object.keys(row);

    const rowFormatted = {};

    titles.map((title) => {
      const translatedTitle = TRANSLATION[title]
      const value = row[title]

      if (!translatedTitle) {
        rowFormatted[title] = value
      }

      rowFormatted[translatedTitle] = value
    });
  });

  const ws = XLSX.utils.json_to_sheet(content);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${tableTitle}-${formattedDate}-${formattedTime}.xlsx`);
};
