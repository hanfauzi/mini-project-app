import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Suspense } from "react";

import CategoryPills from "./_components/CategoryPills";
import EventList from "./_components/EventList";
import FeaturedRow from "./_components/FeaturedRow";
import PromoStrip from "./_components/PromoStrip";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* NAV-like top strip (optional) */}



      {/* PROMO STRIP */}
      <PromoStrip />

        {/* LIST (pakai komponen kamu) */}
      <section className="container mx-auto px-4 mt-8 pb-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-[#001a3a]">
            Temukan Event Terbaik
          </h2>
          <Link
            href="/event"
            className="text-sm text-blue-700 hover:underline"
          >
            Populer minggu ini →
          </Link>
        </div>

        {/* EventList sudah handle search + pagination */}
        <Suspense fallback={<p>Loading events...</p>}>
          <EventList />
        </Suspense>
      </section>

      {/* FEATURED */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-[#001a3a]">
            Featured Events
          </h2>
          <Link
            href="/event"
            className="text-sm text-blue-700 hover:underline"
          >
            Lihat semua →
          </Link>
        </div>
        <FeaturedRow />
      </section>     

      <Separator className="container mx-auto mt-8" />

    
    </div>
  );
}
