import api from "@/api/axios";

export const fetchHistory = async (search?: string, page?: number) => {
  const response = await api.get("/history", {
    params: {
      search,
      page,
    },
  });
  return response.data;
};
