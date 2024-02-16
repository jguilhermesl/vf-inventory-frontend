import api from "./axios"

interface ICreateUserBody {
  name: string,
  role: "admin" | "member",
  password: string,
  email: string
}

export const getProfile = async () => {
  const response = await api.get("/me");
  return response.data;
}

export const handleCreateUser = async (data: ICreateUserBody) => {
  const response = await api.post("/users", data);
  return response.data;
}

export const fetchAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
}