import * as Yup from "yup";

export const addInventoryrSchema = Yup.object().shape({
  quantidade: Yup.number().required("Campo obrigatório"),
  preco: Yup.number().required("Campo obrigatório"),
  validade: Yup.number().required("Insira uma data valida"),
});
