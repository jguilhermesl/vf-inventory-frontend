import api from "./axios";

export interface ICreateUserBody {
  name: string;
  role: string;
  password: string;
  email: string;
}

export interface IEditUserBody {
  name?: string;
  role?: "admin" | "member";
  password?: string;
  email?: string;
}

export const getProfile = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addUser = async (data: ICreateUserBody) => {
  const response = await api.post("/users", data);
  return response.data;
};

export const fetchAllUsers = async (search?: string, page?: number) => {
  const response = await api.get("/users", {
    params: {
      search,
      page,
    },
  });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete("/users/" + userId);
  return response.data;
};

export const editUser = async (data, userId) => {
  try {
    const response = await api.put("/users/" + userId, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
