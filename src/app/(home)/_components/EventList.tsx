"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import useGetEvents from "../_hooks/useGetEvents";
import EventCard from "./EventCard";

const EventList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounceValue(search, 500);



  const { data: events, isPending } = useGetEvents({
    search: debouncedSearch,
    page,

  });

  return (
    <>
      <div className="max-w-xl mx-auto mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari event serumu disini..."
        />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isPending && <p>Loading...</p>}
        {events?.data.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      {events && (
        <div className="mt-8">
          <PaginationSection meta={events.meta} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default EventList;
