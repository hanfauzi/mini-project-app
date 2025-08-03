"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Event } from "@/types/event";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

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

  const displayPrice =
    lowestPrice === 0
      ? "Gratis"
      : `Rp ${lowestPrice.toLocaleString("id-ID", {
          minimumFractionDigits: 0,
        })}`;

  return (
    <Link href={`/event/${event.slug}`} className="block">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              src={event.imageURL || "/fallback-image.jpg"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
          <p className="text-sm font-medium text-primary">{displayPrice}</p>
          <p className="text-xs text-gray-500 italic">
            by {event.organizer?.orgName}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
