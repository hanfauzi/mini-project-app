"use client";

export const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl overflow-hidden border border-blue-100 bg-white">
    <div className="h-48 w-full bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 w-3/4 bg-slate-200 rounded" />
      <div className="h-3 w-1/2 bg-slate-200 rounded" />
      <div className="h-3 w-1/3 bg-slate-200 rounded" />
    </div>
  </div>
);

export const SkeletonCardGrid = () => (
  <>
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </>
);
