"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Culinary",
  "Music",
  "Sports",
  "Comedy",
  "Workshop",
  "Art",
  "Travel",
  "Education",
  "Tech",
];

export default function CategoryPills() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("category") || "";

  const go = (c: string) => {
    const sp = new URLSearchParams(params.toString());
    if (active === c) sp.delete("category");
    else sp.set("category", c);
    router.push("/?" + sp.toString());
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => {
        const isActive = active === c;
        return (
          <button
            key={c}
            onClick={() => go(c)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm border transition",
              isActive
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
            )}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
