import { IAddInventoryBody, IEditInventoryBody } from "@/@types/inventory";
import api from "./axios";

export const fetchInventory = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export const deleteInventory = async (inventoryId: string) => {
  const response = await api.delete("/inventory/" + inventoryId);
  return response.data;
};

export const addInventory = async (data: IAddInventoryBody) => {
  const response = await api.post("/inventory", data);
  return response.data;
};

export const editInventory = async (data: IEditInventoryBody, inventoryId: string) => {
  const response = await api.put("/inventory/" + inventoryId, data);
  return response.data;
};
