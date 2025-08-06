"use client";

import { useParams } from "next/navigation";
import Head from "next/head";
import { withAuthGuard } from "@/hoc/AuthGuard";
import { useGetAttendees } from "@/app/organizer/_hooks/useGetAttendee";


function AttendeesPage() {
  const params = useParams();
  const eventId = params.id as string; 
  const { data, isLoading, isError } = useGetAttendees(eventId);

  return (
    <>
      <Head>
        <title>Attendees | TICKLY</title>
      </Head>

      <div className="w-full px-4 md:px-6">
        <h1 className="text-[24px] font-semibold mb-6">Attendees</h1>

        {isLoading && (
          <div className="text-gray-500 text-center">Memuat data peserta...</div>
        )}

        {isError && (
          <div className="text-red-500 text-center">Gagal memuat data.</div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="text-gray-500 text-center">Belum ada peserta terdaftar.</div>
        )}

        {!isLoading && data && data.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead className="bg-[#f0f4fa] text-[#001a3a]">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Nama</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Email</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Jumlah Tiket</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold">Total Dibayar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((data) => (
                  <tr key={data.userId}>
                    <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data.ticketQuantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">Rp {data.totalPaid.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default withAuthGuard(AttendeesPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/",
});
