import * as Yup from "yup";

export const addInventoryrSchema = Yup.object().shape({
  quantidade: Yup.number().required("Campo obrigatório"),
  preco: Yup.string().required("Campo obrigatório"),
  validade: Yup.string().required("Insira uma data valida"),
});
