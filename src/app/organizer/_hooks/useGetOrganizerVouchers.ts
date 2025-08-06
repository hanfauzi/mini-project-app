"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";

export const useOrganizerVouchers = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["organizer-vouchers"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/vouchers`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return res.data.vouchers; // ✅ Ambil langsung array-nya
    },
    enabled: !!user?.token,
  });
};
