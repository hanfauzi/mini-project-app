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

  const createTransactionMutation = useMutation<
    { transactionId: string; event: { slug: string } },
    AxiosError<{ message: string }>,
    CreateTransactionPayload
  >({
    mutationFn: async (payload) => {
      console.log("Sending transaction with payload:", payload);

      const res = await axiosInstance.post("/api/transaction", payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      console.log("Response from backend:", res.data);

      const transaction = res.data.data;

      if (!transaction?.id || !transaction?.event?.slug) {
        throw new Error("Invalid response from server");
      }

      return {
        transactionId: transaction.id,
        event: transaction.event,
      };
    },
    onSuccess: (data) => {
      console.log("Transaction success data:", data);
      try {
        const transactionId = data.transactionId;
        const slug = data.event?.slug;

        if (!transactionId || !slug) throw new Error("Missing required data");

        router.push(`/transaction/${slug}/payment/${transactionId}`);
      } catch (err) {
        console.error("Error in onSuccess handler:", err);
        toast.error("Gagal melanjutkan ke halaman pembayaran.");
      }
    },
    onError: (error) => {
      console.error("Create transaction error:", error);

      toast.error(
        error.response?.data.message ||
          "Failed to create transaction! Please check it carefully"
      );
    },
  });

  return { createTransactionMutation };
};

export default useCreateTransaction;
