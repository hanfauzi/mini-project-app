import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAcceptTransaction = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.patch(
        `/api/transactions/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      // Refresh pending transactions after action
      queryClient.invalidateQueries({ queryKey: ["pending-transactions"] });
    },
  });
};

