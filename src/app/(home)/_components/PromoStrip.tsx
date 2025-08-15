export default function PromoStrip() {
  return (
    <div className="container mx-auto px-4">
      <div className="rounded-xl border bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm sm:text-base text-[#001a3a] font-medium">
          🎉 Ulang tahun platform! Diskon sampai 12% + voucher ekstra
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-white border px-2 py-1 text-xs">CELEBRATE12</span>
          <button className="text-blue-700 text-sm underline">Lihat detail</button>
        </div>
      </div>
    </div>
  );
}
