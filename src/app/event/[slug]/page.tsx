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

interface PageProps {
  params: { slug: string };
}

const EventDetailPage = async ({ params }: PageProps) => {
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

  const displayPrice =
    lowestPrice === 0
      ? "Gratis"
      : `Rp ${lowestPrice.toLocaleString("id-ID", {
          minimumFractionDigits: 0,
        })}`;

  return (
    <main className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      {/* Section Atas */}
      <section className="grid grid-cols-10 gap-6 min-h-[40vh]">
        {/* bagian kiri ini saya buat untuk detail judul, lokasi, tanggal, dan jam. */}
        <div className="col-span-7 space-y-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <p className="text-muted-foreground flex items-center gap-1">
            <IoLocationOutline />
            {event.location}
          </p>

          <p className="text-muted-foreground flex items-center gap-1">
            <FaCalendarAlt />
            {formattedDate}
          </p>
          <p className="text-muted-foreground flex items-center gap-1">
            <IoAlarm />
            {event.startTime} - {event.endTime}
          </p>
          <p className="text-muted-foreground flex items-center gap-1">
            <BiSolidCategoryAlt />
            {event.category}
          </p>
        </div>

        {/* Kanan 30% */}
        <div className="col-span-3 relative h-60 rounded overflow-hidden shadow-md">
          <Image
            src={event.imageURL || "/fallback-image.jpg"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Section Bawah */}
      <section className="grid grid-cols-10 gap-6 min-h-[60vh]">
        {/* Kiri 70%: Tabs */}
        <div className="col-span-7">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="ticket">Tiket</TabsTrigger>
            </TabsList>

            {/* Tab Deskripsi */}
            <TabsContent value="description">
              <div>
                <h2 className="text-xl font-semibold mb-4">Deskripsi Acara</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </TabsContent>

            {/* Tab Tiket */}
            <TabsContent value="ticket">
              <div className="grid md:grid-cols-2 gap-4">
                {event.ticketCategories && event.ticketCategories.length > 0 ? (
                  event.ticketCategories.map((ticket) => (
                    <Card key={ticket.id}>
                      <CardHeader>
                        <CardTitle>{ticket.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p>Harga: Rp {ticket.price.toLocaleString("id-ID")}</p>
                        <p>Kuota tersedia: {ticket.quota}</p>
                        <Link href={`/transaction/${event.slug}`}>
                          <Button
                            disabled={ticket.quota === 0}
                            className="mt-2 w-full"
                          >
                            {ticket.quota === 0 ? "Habis" : "Beli Tiket"}
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground italic">
                    Belum ada kategori tiket tersedia.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Kanan 30%: Selalu Tampil */}
        <div className="col-span-3 space-y-4">
          <div className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-semibold">Harga Tiket</h3>
            <p className="text-xl font-bold text-primary">{displayPrice}</p>
          </div>

          <div className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-semibold">Diselenggarakan oleh</h3>
            <p className="text-muted-foreground italic">
              {event.organizer?.orgName}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetailPage;