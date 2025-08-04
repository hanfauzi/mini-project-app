import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { cache } from "react";

export const getEventDetail = cache(async (slug: string) => {
  const { data } = await axiosInstance.get<Event>(`/api/event/${slug}`);
  return data;
});
