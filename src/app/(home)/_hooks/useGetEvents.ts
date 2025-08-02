import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";

import { PageableRespones, PagiantionQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PagiantionQueries {
  search?: string;
}

const useGetEvents = (queries?: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableRespones<Event>>(
        "/api/events",
        {
          params: queries,
        }
      );
      return data;
    },
    
  });
};

export default useGetEvents;
