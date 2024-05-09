import { TRANSLATION, TRANSLATION_VALUE } from "@/constants/translate";
import * as XLSX from "xlsx";
import { formatDateToDDMMYYYYhhmm } from "./formatDateToDDMMYYYYhhmm";

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

  const rowsFormatted = content.map((row) => {
    const titles = Object.keys(row);
    const rowFormatted = {};
    titles.map((title) => {
      const translatedTitle = TRANSLATION[title];
      const value = row[title];
      const translatedValue = TRANSLATION_VALUE[value];

      if (!translatedTitle) {
        rowFormatted[title] = value;
        return;
      }
      if (translatedValue) {
        rowFormatted[translatedTitle] = translatedValue;
        return;
      }
      if (title === "createdAt") {
        rowFormatted[translatedTitle] = formatDateToDDMMYYYYhhmm(value);
        return;
      }
      rowFormatted[translatedTitle] = value;
    });
    return rowFormatted;
  });

  const ws = XLSX.utils.json_to_sheet(rowsFormatted);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${tableTitle}-${formattedDate}-${formattedTime}.xlsx`);
};
