import { formatDateIsValid } from "@/utils/formatDateIsValid";
import * as Yup from "yup";

export const addInventorySchema = Yup.object().shape({
  quantity: Yup.number().required("Campo obrigatório"),
  price: Yup.string().required("Campo obrigatório"),
  lot: Yup.string().required("Campo obrigatório"),
  validity: Yup.string().test('is-valid-brazilian-date', 'Insira uma data válida', function (value) {
    return value ? formatDateIsValid(value) : true;
  })
});

export const editInventorySchema = Yup.object().shape({
  quantity: Yup.number().required("Campo obrigatório"),
  price: Yup.string().required("Campo obrigatório"),
  lot: Yup.string().required("Campo obrigatório"),
  validity: Yup.string().test('is-valid-brazilian-date', 'Insira uma data válida', function (value) {
    return value ? formatDateIsValid(value) : true;
  })
});

export const actionInventorySchema = Yup.object().shape({
  type: Yup.string().required("Campo obrigatório"),
  quantity: Yup.number().required("Campo obrigatório").min(1, "Insira uma quantidade válida."),
  customerName: Yup.string(),
  customerPaymentType: Yup.string()
});
