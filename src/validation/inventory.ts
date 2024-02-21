import * as Yup from "yup";

export const addInventorySchema = Yup.object().shape({
  quantity: Yup.number().required("Campo obrigatório"),
  price: Yup.string().required("Campo obrigatório"),
  lot: Yup.string().required("Campo obrigatório"),
  validity: Yup.string().required("Insira uma data valida"),
});

export const editInventorySchema = Yup.object().shape({
  quantity: Yup.number().required("Campo obrigatório"),
  price: Yup.string().required("Campo obrigatório"),
  lot: Yup.string().required("Campo obrigatório"),
  validity: Yup.string().required("Insira uma data valida"),
});

export const actionInventorySchema = Yup.object().shape({
  type: Yup.string().required("Campo obrigatório"),
  quantity: Yup.number().required("Campo obrigatório").min(1, "Insira uma quantidade válida."),
  customerName: Yup.string(),
  customerPaymentType: Yup.string()
});
