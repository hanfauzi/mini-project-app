"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const banners = [
  { id: 1, src: "", alt: "Hero 1" },
  { id: 2, src: "", alt: "Hero 2" },
  { id: 3, src: "", alt: "Hero 3" },
];

export default function HomeHero() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6 sm:py-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Carousel */}
        <div className="relative w-full h-[180px] sm:h-[280px] lg:h-[340px] overflow-hidden rounded-xl border border-blue-100">
          {banners.map((b, i) => (
            <div
              key={b.id}
              className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={b.src} alt={b.alt} fill className="object-cover" priority={i===0}/>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 w-2.5 rounded-full border border-white/70 ${i === active ? "bg-white" : "bg-white/40"}`}
                aria-label={`slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Search + quick links */}
        <div className="rounded-xl border border-blue-100 bg-white p-4 sm:p-6 shadow-sm">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#001a3a] leading-snug">
            Let’s start your happiest journey
          </h1>
          <p className="text-sm text-[#335071] mt-1">
            Cari konser, seminar, workshop, olahraga, dan lainnya!
          </p>

          <div className="mt-4 flex gap-2">
            <Input placeholder="Cari event / kota / organizer…" className="flex-1" />
            <Button className="shrink-0">Cari</Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {["Konser", "Comedy", "Workshop", "Sport", "Travel"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
