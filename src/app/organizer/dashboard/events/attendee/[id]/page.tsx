"use client";

import Head from "next/head";
import { useParams } from "next/navigation";
import { withAuthGuard } from "@/hoc/AuthGuard";
import { useGetAttendees } from "@/app/organizer/_hooks/useGetAttendee";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(Number(n || 0));
}

function AttendeesPage() {
  const params = useParams();
  const eventId = params.id as string;
  const { data, isLoading, isError } = useGetAttendees(eventId);

  const count = data?.length ?? 0;

  return (
    <>
      <Head>
        <title>Attendees | TICKLY</title>
      </Head>

      <div className="w-full px-4 md:px-6">
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-semibold text-[#001a3a]">Attendees</h1>
            <p className="text-sm text-[#001a3a]/70">Daftar peserta yang terdaftar pada event ini.</p>
          </div>
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
            <Users className="h-3.5 w-3.5 mr-1" />
            {count} peserta
          </Badge>
        </div>

        <Card className="bg-white border-blue-100">
          <CardContent className="pt-4">

            {isLoading && (
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="grid grid-cols-4 gap-3">
                    <Skeleton className="h-10 bg-[#e6eef9]" />
                    <Skeleton className="h-10 bg-[#e6eef9]" />
                    <Skeleton className="h-10 bg-[#e6eef9]" />
                    <Skeleton className="h-10 bg-[#e6eef9]" />
                  </div>
                ))}
              </div>
            )}


            {isError && (
              <div className="h-[160px] grid place-items-center text-red-600">
                Gagal memuat data.
              </div>
            )}


            {!isLoading && !isError && count === 0 && (
              <div className="h-[200px] grid place-items-center text-center">
                <div>
                  <div className="mx-auto mb-3 w-10 h-10 grid place-items-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                    <Users className="h-5 w-5" />
                  </div>
                  <p className="text-[#001a3a] font-medium">Belum ada peserta terdaftar</p>
                  <p className="text-sm text-[#001a3a]/70">Data akan muncul setelah ada pembelian tiket.</p>
                </div>
              </div>
            )}


            {!isLoading && !isError && count > 0 && (
              <div className="overflow-auto rounded-lg border border-blue-100">
                <Table className="min-w-[720px]">
                  <TableHeader className="bg-[#f0f4fa] text-[#001a3a] sticky top-0 z-10">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">Nama</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Jumlah Tiket</TableHead>
                      <TableHead className="font-semibold">Total Dibayar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data!.map((row: any, idx: number) => (
                      <TableRow
                        key={row.userId ?? idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-[#f9fbff]"}
                      >
                        <TableCell className="py-3">{row.name}</TableCell>
                        <TableCell className="py-3">{row.email}</TableCell>
                        <TableCell className="py-3">{row.ticketQuantity}</TableCell>
                        <TableCell className="py-3">Rp {formatIDR(row.totalPaid)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default withAuthGuard(AttendeesPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/",
});
