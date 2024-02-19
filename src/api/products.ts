import api from "./axios";

export interface IAddProductBody {
  sigla: string;
  name: string;
}

export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete("/products/" + productId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (data: IAddProductBody) => {
  try {
    const response = await api.post("/products", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
