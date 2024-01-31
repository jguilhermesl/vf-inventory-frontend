import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Envelope, EyeClosed, Eye } from 'phosphor-react';
import { useFormik } from 'formik';
import { validationSchema } from '@/validation/login';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const LoginTemplate = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleLogin(values.email, values.password),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full h-screen flex flex-col justify-center m-auto md:max-w-xl w-sm p-8"
    >
      <h1 className="text-2xl font-bold mb-10 text-center">Login</h1>
      <div className="mb-4">
        <Input
          label="Email"
          type="text"
          id="email"
          error={formik.errors?.email as string}
          {...formik.getFieldProps('email')}
          iconRight={<Envelope size={16} />}
        />
      </div>
      <div className="mb-4">
        <Input
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors?.password as string}
          iconRight={
            showPassword ? (
              <Eye
                size={16}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <EyeClosed
                size={16}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              />
            )
          }
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-800">{formik.errors.password}</div>
        )}
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  );
};
