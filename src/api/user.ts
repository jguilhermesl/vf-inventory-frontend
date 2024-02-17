import api from "./axios";

export interface ICreateUserBody {
  name: string;
  role: "admin" | "member";
  password: string;
  email: string;
}
// export interface IEditUserBody {
//   name?: string;
//   role?: "admin" | "member";
//   password?: string;
//   email?: string;
// }

export const getProfile = async () => {
  const response = await api.get("/me");
  return response.data;
};

export const addUser = async (data: ICreateUserBody) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const deleteUser = async (userID) => {
  const response = await api.delete("/users/" + userID);
  return response.data;
};
export const editUser = async (data) => {
  const response = await api.put("/users/" + data);
  return response.data;
};
