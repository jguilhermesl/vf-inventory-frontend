import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Envelope, EyeClosed, Eye } from "phosphor-react";
import { useState } from "react";

export const LoginTemplate = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" w-full h-screen flex flex-col justify-center m-auto md:max-w-xl w-sm p-8 ">
      <h1 className="text-2xl font-bold mb-10 text-center">Login</h1>
      <Input
        label="Email"
        onChange={(e) => setInputEmail(e.target.value)}
        iconRight={<Envelope size={16} />}
      />
      <Input
        label="Senha"
        onChange={(e) => setInputPassword(e.target.value)}
        type={showPassword ? "text" : "password"}
        iconRight={showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
        onClickIconRight={() => setShowPassword(!showPassword)}
      />
      <Button>Entrar</Button>
    </div>
  );
};
