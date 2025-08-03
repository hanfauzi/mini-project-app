"use client";

import { useMemo, useState } from "react";
import { useFilteredEvents } from "../event/_hooks/useFilterEvents";
import { IoLocationOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@/types/event";
import Link from "next/link";
import Image from "next/image";
import { eventCategories } from "./_constants/eventCategories";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";

const EventFilterPage = () => {
  const [category, setCategory] = useState<string>();
  const [location, setLocation] = useState<string>("");

  const [debouncedLocation] = useDebounceValue(location, 500);

  const { data, isLoading } = useFilteredEvents({
    category,
    location: debouncedLocation,
    take: 8,
  });

  const events = data?.data ?? [];


  return (
    <div className="flex min-h-screen p-4 gap-4 bg-gray-50">
      {/* Sidebar Filter */}
      <div className="w-1/5 bg-white p-4 shadow rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Filter</h2>

        <div>
          <h3 className="font-semibold mb-2">Category</h3>
          <Select
            onValueChange={(val) =>
              setCategory(val === "ALL" ? undefined : val)
            }
            value={category ?? "ALL"}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {eventCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-semibold mb-2 mt-4">Location</h3>
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location"
          />
        </div>
      </div>

      {/* Event Cards */}
      <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        ) : events.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No events found.
          </p>
        ) : (
          (events as Event[]).map((event) => (
            <Link
              key={event.id}
              href={`/event/${event.slug}`}
              className="bg-white rounded-xl shadow hover:shadow-md transition duration-200 p-3 flex flex-col max-h-[320px] cursor-pointer"
            >
              <div className="relative w-full h-40 rounded overflow-hidden">
                <Image
                  src={event.imageURL}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-bold text-md mb-1 line-clamp-1">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1 line-clamp-1">
                <IoLocationOutline />
                {event.location}
              </p>
              <p className="text-sm text-gray-600 line-clamp-1">
                {event.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default EventFilterPage;
