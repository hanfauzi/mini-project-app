import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export const useOrganizerReviews = (organizerId: string) => {
    const { user } = useAuthStore();
  return useQuery({
    queryKey: ["organizer-reviews", organizerId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/organizer/${organizerId}/reviews`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      console.log("Organizer Reviews Response:", res.data);
      return res.data.data;
    },
    enabled: !!organizerId,
  });
};