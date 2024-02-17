import api from "./axios";

export interface IAddInventoryBody {
  lot: string;
  price: number;
  quantity: number;
  validity: string;
  productId: string;
}

export const fetchInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export const deleteInventory = async (InventoryId) => {
  const response = await api.delete("/intentory/" + InventoryId);
  return response.data;
};

export const addInventory = async (data: IAddInventoryBody) => {
  const response = await api.post("/inventory", data);
  return response.data;
};
