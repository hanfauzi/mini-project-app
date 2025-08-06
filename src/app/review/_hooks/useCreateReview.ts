"use client";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { toast } from "sonner";

type CreateReviewPayload = {
  eventId: string;
  rating: number;
  comment: string;
};

export const useCreateReviewByUser = () => {
  const { user } = useAuthStore();
  const createReview = async ({
    eventId,
    rating,
    comment,
  }: CreateReviewPayload) => {
    try {
      const response = await axiosInstance.post(
        `/api/review/${eventId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      toast.success("Review berhasil dikirim!");
      return response.data;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        "Gagal mengirim review. Silakan coba lagi.";
      toast.error(errorMessage);
      throw err;
    }
  };

  return { createReview };
};
