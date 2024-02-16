import api from "./axios"

export interface ILoginBody {
  email: string
  password: string,
}

export const handleLogin = async (data: ILoginBody) => {
  try {
    const response = await api.post("/users/signin", data)
    return response.data;
  } catch (err) {
    return err;
  }
}