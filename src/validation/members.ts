import * as Yup from "yup";

export const addMemberSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  senha: Yup.string().required("Campo obrigatório"),
  cargo: Yup.string().required("Campo obrigatório"),
});
