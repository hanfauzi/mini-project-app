// hooks/useFilteredEvents.ts
import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableRespones } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

export interface FilterQuery {
  category?: string;
  location?: string;
  search?: string;
  page?: number;
  take?: number;
}

export const useFilteredEvents = (query: FilterQuery) => {
  return useQuery({
    queryKey: ["filtered-events", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableRespones<Event>>(
        "/api/filtered-events",
        { params: query }
      );
      return data;
    },
    staleTime: 1000 * 5, 
  });
};
