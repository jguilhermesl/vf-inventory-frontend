import api from "@/api/axios";

export const fetchHistory = async (search?: string) => {
  const response = await api.get("/history", {
    params: {
      search
    }
  });
  return response.data;
};