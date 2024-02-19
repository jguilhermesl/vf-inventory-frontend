import * as Yup from "yup";

export const addMemberSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
  role: Yup.string().required("Campo obrigatório"),
});

export const editMemberSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  password: Yup.string(),
  role: Yup.string().required("Campo obrigatório"),
});
