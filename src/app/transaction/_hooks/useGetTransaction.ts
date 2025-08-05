"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";

export const useTransaction = (transactionId: string) => {
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    if (!transactionId || !user?.token) {
      setError("Transaction ID or user token is missing");
      setLoading(false);
      return;
    }

    const fetchTransaction = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/transaction/${transactionId}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setTransaction(res.data);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch transaction");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId, user?.token]);

  return { transaction, loading, error };
};
