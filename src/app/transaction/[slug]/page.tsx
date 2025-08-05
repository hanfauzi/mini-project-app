

import { axiosInstance } from "@/lib/axios";
import TransactionClientPage from "./_components/TransactionClientPage";
import { Event } from "@/types/event";

export default async function TransactionPage(props: { params: { slug: string } }) {
  const { params } = await props

  try {
    const res = await axiosInstance.get(`/api/event/${params.slug}`);
    const event: Event = res.data;

    return <TransactionClientPage event={event} slug={params.slug} />;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return <div className="p-10 text-center">Event tidak ditemukan...</div>;
  }
}
