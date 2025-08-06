import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/react-query";

export interface Attendee {
  userId: string;
  name: string;
  email: string;
  ticketQuantity: number;
  totalPaid: number;
}

export const useGetAttendees = (eventId: string) => {
  const { user } = useAuthStore();

  return useQuery<Attendee[]>({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/${eventId}/attendees`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      // data.data berisi array attendee
      return data.data;
    },
    enabled: !!eventId && !!user?.token,
  });
};
