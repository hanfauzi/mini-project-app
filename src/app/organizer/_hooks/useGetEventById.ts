import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetEventById = (eventId: string) => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      return data;
    },
    enabled: !!eventId && !!user?.token, // <<--- ini penting!
  });
};
