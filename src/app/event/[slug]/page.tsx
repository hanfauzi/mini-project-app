import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getEventDetail } from "./_api/getEventDetail";
import { IoLocationOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoAlarm } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";

// util kecil biar rapih
const formatRupiah = (n: number) =>
  `Rp ${n.toLocaleString("id-ID", { minimumFractionDigits: 0 })}`;

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEventDetail(params.slug);

  const formattedDate = new Date(event.startDay).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const lowestPrice =
    event.ticketCategories && event.ticketCategories.length > 0
      ? Math.min(...event.ticketCategories.map((tc) => tc.price))
      : 0;

  const displayPrice = lowestPrice === 0 ? "Gratis" : formatRupiah(lowestPrice);

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-[#335071]">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-blue-700 transition-colors">
              Home
            </Link>
          </li>
          <li className="opacity-50">/</li>
          <li>
            <Link
              href="/events"
              className="hover:text-blue-700 transition-colors"
            >
              Events
            </Link>
          </li>
          <li className="opacity-50">/</li>
          <li className="text-blue-700 font-medium truncate max-w-[50vw]">
            {event.title}
          </li>
        </ol>
      </nav>

      {/* Section Atas */}
      <section className="grid grid-cols-1 md:grid-cols-10 gap-6 min-h-[40vh]">
        {/* Kiri 70% */}
        <div className="md:col-span-7 space-y-5">
          {/* Title block */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                <BiSolidCategoryAlt className="text-blue-700" />
                {event.category}
              </span>
              {lowestPrice === 0 ? (
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Gratis
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Mulai {displayPrice}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#001a3a]">
              {event.title}
            </h1>

            {/* meta chips */}
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[#335071]">
                <IoLocationOutline className="opacity-80" />
                {event.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[#335071]">
                <FaCalendarAlt className="opacity-80" />
                <time dateTime={new Date(event.startDay).toISOString()}>
                  {formattedDate}
                </time>
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[#335071]">
                <IoAlarm className="opacity-80" />
                {event.startTime} – {event.endTime}
              </span>
            </div>
          </div>

          {/* Hero Image (rounded + subtle ring) */}
          <div className="relative h-60 md:h-80 rounded-xl overflow-hidden ring-1 ring-slate-200">
            <Image
              src={event.imageURL || "/fallback-image.jpg"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            {/* overlay gradient halus biar teks di atas gambar tetap kebaca kalau diubah */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>

        {/* Kanan 30% - sticky info */}
        <aside className="md:col-span-3 md:sticky md:top-6 h-max space-y-4">
          <Card className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#001a3a]">
                Harga Tiket
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-4">
              <p className="text-2xl font-extrabold text-blue-700">
                {displayPrice}
              </p>
              <Button asChild className="bg-blue-300 text-white hover:bg-blue-500 hover:text-white">
                <Link href={`#tickets`}>Lihat Tiket</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#001a3a]">
                Diselenggarakan oleh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#335071] italic">
                {event.organizer?.orgName}
              </p>
            </CardContent>
          </Card>
        </aside>
      </section>

      {/* Separator halus */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Section Bawah */}
      <section className="grid grid-cols-1 md:grid-cols-10 gap-6 min-h-[40vh]">
        {/* Kiri 70%: Tabs */}
        <div className="md:col-span-7 space-y-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-6 bg-blue-50/50 border border-blue-100">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="ticket">Tiket</TabsTrigger>
            </TabsList>

            {/* Tab Deskripsi */}
            <TabsContent value="description" className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 leading-relaxed">
                <h2 className="text-xl font-semibold mb-3 text-[#001a3a]">
                  Deskripsi Acara
                </h2>
                <p className="text-[#335071] whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </TabsContent>

            {/* Tab Tiket */}
            <TabsContent value="ticket">
              <div id="tickets" className="grid md:grid-cols-2 gap-4">
                {event.ticketCategories && event.ticketCategories.length > 0 ? (
                  event.ticketCategories.map((ticket) => {
                    const isSoldOut = ticket.quota === 0;
                    return (
                      <Card
                        key={ticket.id}
                        className={`relative border-slate-200 hover:shadow-md transition-shadow ${
                          isSoldOut ? "opacity-90" : ""
                        }`}
                      >
                        {isSoldOut && (
                          <span className="absolute right-3 top-3 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-2 py-1">
                            Habis
                          </span>
                        )}
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            {ticket.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#335071]">Harga</p>
                            <p className="font-semibold">
                              {formatRupiah(ticket.price)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#335071]">
                              Kuota tersedia
                            </p>
                            <p className="font-semibold">{ticket.quota}</p>
                          </div>

                          <Button
                            disabled={isSoldOut}
                            className="mt-2 w-full bg-blue-300 text-white hover:bg-blue-500 hover:text-white"
                            asChild
                          >
                            <Link href={`/transaction/${event.slug}`}>
                              {isSoldOut ? "Habis" : "Beli Tiket"}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground italic">
                    Belum ada kategori tiket tersedia.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <Button asChild variant="secondary" className="w-full">
            <Link href={`/review/${event.id}`}>Kirim Review</Link>
          </Button>
        </div>

        {/* Kanan 30%: Info tambahan */}
        <div className="md:col-span-3 space-y-4">
          <Card className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#001a3a]">
                Info Lokasi
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-[#335071] space-y-2">
              <div className="flex items-start gap-2">
                <IoLocationOutline className="mt-0.5 opacity-80" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCalendarAlt className="mt-0.5 opacity-80" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-start gap-2">
                <IoAlarm className="mt-0.5 opacity-80" />
                <span>
                  {event.startTime} – {event.endTime}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* ajakan share sederhana (tanpa JS client) */}
          <Card className="border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-[#001a3a]">
                Bagikan
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link
                  href={`mailto:?subject=${encodeURIComponent(
                    event.title
                  )}&body=${encodeURIComponent(
                    `Lihat acara ini: ${process.env.NEXT_PUBLIC_APP_URL ?? ""}/events/${event.slug}`
                  )}`}
                >
                  Email
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${event.title} • ${process.env.NEXT_PUBLIC_APP_URL ?? ""}/events/${event.slug}`
                  )}`}
                  target="_blank"
                >
                  WhatsApp
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
