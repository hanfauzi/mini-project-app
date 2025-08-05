import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export interface PendingTransaction {
  id: string;
  quantity: number;
  totalPrice: number;
  finalPrice: number;
  status: string;
  paymentProofUrl?: string;
  createdAt: string;
  expiresAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phoneNumber: string;
  };
  event: {
    title: string;
    category: string;
    startDay: string;
    endDay: string;
    location: string;
    imageURL?: string;
  };
  ticketCategory: {
    name: string;
    price: number;
  };
}

export const useGetPendingTransactions = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["pending-transactions"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ data: PendingTransaction[] }>(
        "/api/transactions/pending",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return data.data;
    },
  });
};