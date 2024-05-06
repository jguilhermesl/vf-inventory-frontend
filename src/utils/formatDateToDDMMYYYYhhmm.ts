import { format } from "date-fns";

export const formatDateToDDMMYYYYhhmm = (date: string) => {
  if (!date) {
    return "";
  }
  const formattedDate = format(date, "dd/MM/yyyy HH:mm", { timeZone: 'America/Sao_Paulo' });

  return formattedDate;
}