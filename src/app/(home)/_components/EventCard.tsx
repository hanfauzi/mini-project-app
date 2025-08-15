"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Event } from "@/types/event";
import Link from "next/link";
import { IoAlarm } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

interface EventCardProps {
  event: Event;
}

const formatRupiah = (n: number) =>
  `Rp ${n.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;

const EventCard = ({ event }: EventCardProps) => {
  const formattedDate = new Date(event.startDay).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const lowestPrice =
    event.ticketCategories && event.ticketCategories.length > 0
      ? Math.min(...event.ticketCategories.map((tc) => tc.price))
      : 0;

  const displayPrice = lowestPrice === 0 ? "Gratis" : formatRupiah(lowestPrice);

  return (
    <Link href={`/event/${event.slug}`} className="block group">
      <Card className="overflow-hidden border-blue-100 bg-white shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={event.imageURL || "/fallback-image.jpg"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
            {/* overlay badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              {event.category && (
                <span className="rounded-full bg-blue-50/90 border border-blue-200 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {event.category}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent p-3">
              <div className="inline-flex items-center rounded-md bg-white/90 px-2 py-1 text-xs text-[#001a3a]">
                <FaCalendarAlt className="mr-1 opacity-80" />
                {formattedDate}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-tight text-[#001a3a] line-clamp-2">
              {event.title}
            </h3>
            <span className="shrink-0 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
              {displayPrice}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#335071]">
            <span className="italic truncate">by {event.organizer?.orgName}</span>
            {event.startTime && event.endTime && (
              <span className="inline-flex items-center gap-1">
                <IoAlarm className="opacity-80" />
                {event.startTime}–{event.endTime}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
