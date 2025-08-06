import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetTranscations = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["my-transactions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/user/transaction`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      return data.data;
    },
  });
};
