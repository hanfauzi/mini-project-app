// app/(organizer)/_hooks/useCreateVoucher.ts
"use client";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";

export const useCreateVoucher = () => {
  const { user } = useAuthStore();
  return useMutation({
    mutationFn: async (data: {
      organizerId: string;
      payload: {
        code: string;
        quota: number;
        discountAmount: number;
        startDate: string;
        endDate: string;
        eventId: string;
      };
    }) => {
      const res = await axiosInstance.post(
        `/api/create-voucher`,
        data.payload,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return res.data;
    },
  });
};
