import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Envelope, EyeClosed, Eye } from "phosphor-react";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um e-mail válido")
    .required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

export const LoginTemplate = () => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const handleEmailAndPassword = (values) => {
    console.log("minha senha:", values.password);
    console.log("meu email:", values.email);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleEmailAndPassword}
    >
      <Form className="w-full h-screen flex flex-col justify-center m-auto md:max-w-xl w-sm p-8">
        <h1 className="text-2xl font-bold mb-10 text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Field name="email">
            {({ field, meta }) => (
              <>
                <Input
                  type="text"
                  id="email"
                  {...field}
                  iconRight={<Envelope size={16} />}
                />
                {meta.touched && meta.error && (
                  <div className=" text-red-800">{meta.error}</div>
                )}
              </>
            )}
          </Field>
        </div>
        <div className="mb-4">
          <label htmlFor="password">Senha</label>
          <Field name="password">
            {({ field, meta }) => (
              <>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...field}
                  iconRight={
                    showPassword ? <Eye size={16} /> : <EyeClosed size={16} />
                  }
                  onClickIconRight={() => setShowPassword(!showPassword)}
                />
                {meta.touched && meta.error && (
                  <div className=" text-red-800">{meta.error}</div>
                )}
              </>
            )}
          </Field>
        </div>
        <Button type="submit">Entrar</Button>
      </Form>
    </Formik>
  );
};
