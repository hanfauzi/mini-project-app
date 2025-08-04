// app/(public)/event/[slug]/_hooks/useCreateTransaction.ts

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { CreateTransactionPayload } from "@/types/transaction";
import { useAuthStore } from "@/stores/auth";
import { AxiosError } from "axios";

const useCreateTransaction = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const createTransactionMutation = useMutation<void, AxiosError<{ message: string }>, CreateTransactionPayload>({
    mutationFn: async (payload) => {
      await axiosInstance.post("/api/transaction", payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("Transaksi berhasil dibuat!");
      router.push("/my-tickets");
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Gagal membuat transaksi");
    },
  });

  return { createTransactionMutation };
};

export default useCreateTransaction;
