"use client";

import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

import Loading from "@/components/Loading";
import { withAuthGuard } from "@/hoc/AuthGuard";
import { Event } from "@/types/event";
import { useGetMyEvents } from "../../_hooks/useGetEventsByOrganizerId";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  CalendarDays,
  Users2,
  PencilLine,
  Plus,
  Tag,
  MapPin,
} from "lucide-react";

function MyEventsPage() {
  const { data: events, isLoading, isError } = useGetMyEvents();

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-[#001a3a]">Gagal mengambil event.</p>;


  const sorted = [...(events ?? [])].sort(
    (a: Event, b: Event) =>
      dayjs(a.startDay).valueOf() - dayjs(b.startDay).valueOf()
  );

  return (
    <>
      <Head>
        <title>My Events | TICKLY</title>
      </Head>


      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[24px] md:text-[28px] font-semibold text-[#001a3a]">
            My Events
          </h1>
          <p className="text-sm text-[#001a3a]/70">
            Kelola event yang telah kamu buat.
          </p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/organizer/dashboard/create-event">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Link>
        </Button>
      </div>


      {!sorted.length ? (
        <Card className="bg-white border-blue-100">
          <CardContent className="py-10 flex flex-col items-center justify-center text-center">
            <div className="rounded-xl bg-blue-50 text-blue-700 border border-blue-100 p-3 mb-3">
              <CalendarDays className="h-5 w-5" />
            </div>
            <p className="text-[#001a3a] font-medium">Belum ada event</p>
            <p className="text-sm text-[#001a3a]/70 mb-4">
              Mulai dengan membuat event pertamamu.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/organizer/dashboard/create-event">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map((event: Event) => {
            const start = dayjs(event.startDay);
            const end = dayjs(event.endDay);
            const dateRange = start.isSame(end, "day")
              ? start.format("DD MMMM YYYY")
              : `${start.format("DD MMMM YYYY")} – ${end.format(
                  "DD MMMM YYYY"
                )}`;

            return (
              <Card
                key={event.id}
                className="bg-white border border-blue-100 hover:border-blue-200 hover:shadow-sm transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-[16px] font-semibold text-[#001a3a] line-clamp-2">
                      {event.title || "No Title"}
                    </CardTitle>
                    {event.category ? (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap"
                      >
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        {event.category}
                      </Badge>
                    ) : null}
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-3">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-[#001a3a]">
                      <CalendarDays className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{dateRange}</span>
                    </div>


                    <div className="flex items-center text-sm text-[#001a3a]/80">
                      <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      asChild
                      variant="outline"
                      className="border-blue-200 hover:bg-blue-50 text-blue-700"
                    >
                      <Link
                        href={`/organizer/dashboard/events/edit/${event.id}`}
                      >
                        <PencilLine className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>

                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link
                        href={`/organizer/dashboard/events/attendee/${event.id}`}
                      >
                        <Users2 className="h-4 w-4 mr-2" />
                        Attendee List
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

export default withAuthGuard(MyEventsPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/organizer/login",
});
