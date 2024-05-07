import { format } from "date-fns";
import { convertDateToAmericanFormat } from "./convertDateToAmericanFormat";

export function formatDateToDDMMYYYY(date) {
  try {
    if (!date) {
      return "";
    }

    return format(new Date(date), "dd/MM/yyyy");
  } catch (err) {
    if (!date) {
      return "";
    }
    const dateFormatted = convertDateToAmericanFormat(date)

    return format(new Date(dateFormatted), "dd/MM/yyyy");
  }
}
