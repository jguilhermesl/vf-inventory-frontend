import { IEditProduct } from "@/@types/product";
import api from "./axios";

export interface IAddProductBody {
  sigla: string;
  name: string;
}

export const fetchProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await api.delete("/products/" + productId);
  return response.data;
};

export const editProduct = async (data: IEditProduct, productId: string) => {
  const response = await api.put("/products/" + productId, data);
  return response.data;
};

export const addProduct = async (data: IAddProductBody) => {
  const response = await api.post("/products", data);
  return response.data;
};
