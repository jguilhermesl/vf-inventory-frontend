import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  sigla: Yup.string().required("Campo obrigatório"),
});
