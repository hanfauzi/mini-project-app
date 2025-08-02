import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableRespones } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery {
  page: number;
  search?: string;
}

const useGetEvents = ({ page, search }: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", page, search],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableRespones<Event>>(
        "/api/events",
        {
          params: { page, search },
        }
      );
      return data;
    },
  });
};

export default useGetEvents;
