"use client";
import Head from "next/head";
import Link from "next/link";
import { useGetMyEvents } from "../_hooks/useGetEventsByOrganizerId";
import dayjs from "dayjs";
import "dayjs/locale/id"; // bahasa Indonesia
import { Event } from "@/types/event";
dayjs.locale("id");

export default function MyEventsPage() {
  const { data: events, isLoading, isError } = useGetMyEvents();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Gagal mengambil event.</p>;

  return (
    <>
      <Head>
        <title>My Events | TICKLY</title>
      </Head>
      <div className="min-h-screen px-6 pt-6 bg-white text-[#001a3a]">
        <h1 className="text-[24px] font-semibold mb-6">My Events</h1>

        <div className="flex flex-col gap-4">
          {events?.map((event: Event) => (
            <Link
              key={event.id}
              href={`/organizer/events/edit/${event.id}`}
              className="w-full p-4 rounded-lg bg-[#f0f4fa] hover:bg-[#e0e7f1] transition-colors shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {event.title || "No Title"}
                </h3>
                <p className="text-sm text-gray-600">
                  {event.category || "No Category"}
                </p>
                <p className="text-sm text-gray-500">
                  {dayjs(event.startDay).format("DD MMMM YYYY")} -{" "}
                  {dayjs(event.endDay).format("DD MMMM YYYY")}
                </p>
              </div>
              <div className="mt-2 md:mt-0 text-sm text-blue-500">Edit →</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
