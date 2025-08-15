"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useGetEvents from "../_hooks/useGetEvents";

export default function FeaturedRow() {

  const { data, isPending, isError } = useGetEvents({
    page: 1,
    
   
  });

  if (isError) {
    return <p className="text-red-600 text-sm">Gagal memuat featured events.</p>;
  }

  return (
    <div className="mt-3 overflow-hidden">
      <div className="flex gap-4 overflow-x-auto pb-1 snap-x">
        {isPending &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="snap-start shrink-0 w-[240px]">
              <Skeleton className="h-36 w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
              </div>
            </div>
          ))}

        {data?.data.map((e) => (
          <Link
            key={e.id}
            href={`/event/${e.slug}`}
            className="snap-start shrink-0 w-[240px]"
          >
            <Card className="overflow-hidden border-blue-100 hover:border-blue-200 hover:shadow-md transition">
              <div className="relative h-36 w-full">
                <Image
                  src={e.imageURL || "/fallback-image.jpg"}
                  alt={e.title}
                  fill
                  className="object-cover"
                />
                {e.category && (
                  <span className="absolute top-2 left-2 rounded-full bg-white/90 border px-2 py-0.5 text-[10px] font-medium text-blue-700">
                    {e.category}
                  </span>
                )}
              </div>
              <CardContent className="p-3">
                <p className="text-[11px] text-[#335071]">
                  {new Date(e.startDay).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-sm font-semibold text-[#001a3a] line-clamp-2">
                  {e.title}
                </h3>
                {e.ticketCategories?.length > 0 && (
                  <p className="text-xs mt-1 font-medium text-blue-700">
                    {Math.min(...e.ticketCategories.map((t) => t.price)) === 0
                      ? "Gratis"
                      : `Rp ${Math.min(...e.ticketCategories.map((t) => t.price)).toLocaleString("id-ID")}`}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
