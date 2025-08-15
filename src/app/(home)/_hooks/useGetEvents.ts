import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableRespones } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery {
  page: number;
  search?: string;
  take?: number; 
}

const useGetEvents = ({ page, search, take = 9 }: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", page, search, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableRespones<Event>>(
        "/api/events",
        {
          params: { page, search, take },
        }
      );
      return data;
    },
  });
};

export default useGetEvents;
