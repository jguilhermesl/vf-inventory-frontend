import * as Yup from "yup";

export const addInventorySchema = Yup.object().shape({
  quantity: Yup.number().required("Campo obrigatório"),
  price: Yup.string().required("Campo obrigatório"),
  validity: Yup.string().required("Insira uma data valida"),
});
