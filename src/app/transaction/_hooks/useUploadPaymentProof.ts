// src/hooks/useUploadPaymentProof.ts
"use client";

import { useAuthStore } from "@/stores/auth";
import { axiosInstance } from "../../../lib/axios";

export const uploadPaymentProof = async ({
  transactionId,
  image,
}: {
  transactionId: string;
  image: File;
}) => {
  const token = useAuthStore.getState().user?.token;
  const formData = new FormData();
  formData.append("paymentProof", image);

  const response = await axiosInstance.post(
    `/api/transaction/${transactionId}/payment`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
