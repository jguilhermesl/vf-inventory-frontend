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

  const ws = XLSX.utils.json_to_sheet(content);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${tableTitle}-${formattedDate}-${formattedTime}.xlsx`);
};
