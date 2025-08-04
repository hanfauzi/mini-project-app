// app/organizer/_hooks/useGetMyEvents.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";

export const useGetMyEvents = () => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["my-events"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/api/organizer/events", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return data;
    },
  });
};
