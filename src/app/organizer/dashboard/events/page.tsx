"use client";
import Loading from "@/components/Loading";
import { withAuthGuard } from "@/hoc/AuthGuard";
import { Event } from "@/types/event";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Head from "next/head";
import Link from "next/link";
import { useGetMyEvents } from "../../_hooks/useGetEventsByOrganizerId";
import { Button } from "@/components/ui/button";
dayjs.locale("id");

function MyEventsPage() {
  const { data: events, isLoading, isError } = useGetMyEvents();

  if (isLoading) return <Loading/>;
  if (isError) return <p>Gagal mengambil event.</p>;

  return (
    <>
      <Head>
        <title>My Events | TICKLY</title>
      </Head>
      <h1 className="text-[24px] font-semibold mb-6">My Events</h1>
      <div className="flex flex-col gap-4">
        {events?.map((event: Event) => (
          <Link
            key={event.id}
            href={`/organizer/dashboard/events/attendee/${event.id}`}
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
            <Link href={`/organizer/dashboard/events/edit/${event.id}`}><Button className="mt-2 md:mt-0 text-sm text-blue-500">Edit </Button></Link>
          </Link>
        ))}
      </div>
    </>
  );
}

export default withAuthGuard(MyEventsPage, {allowedRoles: ["ORGANIZER"],  redirectTo: "/organizer/login"});
