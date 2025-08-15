"use client";

import { useOrganizerVouchers } from "../../_hooks/useGetOrganizerVouchers";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { withAuthGuard } from "@/hoc/AuthGuard";

 function OrganizerVoucherPage() {
  const { data, isLoading, isError } = useOrganizerVouchers();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Gagal memuat voucher. Silakan coba lagi.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Voucher yang Sudah Dibuat</h1>
          <Button onClick={() => router.push("/organizer/dashboard/create-voucher")}>
            Buat Voucher Promo
          </Button>
        </div>
        <div className="text-center text-gray-500 mt-10">
          Belum ada voucher yang dibuat.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Voucher yang Sudah Dibuat</h1>
        <Button onClick={() => router.push("/organizer/dashboard/create-voucher")}>
          Buat Voucher Promo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((voucher: any) => (
          <Card
            key={voucher.id}
            className="shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex flex-col gap-1">
                <div className="text-xl font-bold text-sky-700">{voucher.code}</div>
                <div className="text-sm text-gray-500">
                  Event: <span className="font-medium">{voucher.event?.title ?? "Tidak diketahui"}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Lokasi: <span className="font-medium">{voucher.event?.location ?? "Tidak diketahui"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="outline">Diskon: Rp{voucher.discountAmount.toLocaleString()}</Badge>
                <Badge variant="outline">Kuota: {voucher.quota}</Badge>
                {voucher.isActive ? (
                  <Badge variant="default">Aktif</Badge>
                ) : (
                  <Badge variant="destructive">Tidak Aktif</Badge>
                )}
              </div>

              <div className="text-sm text-gray-600 pt-2">
                Berlaku:
                <br />
                <span className="font-medium">
                  {format(new Date(voucher.startDate), "dd MMM yyyy")} -{" "}
                  {format(new Date(voucher.endDate), "dd MMM yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default withAuthGuard(OrganizerVoucherPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/organizer/login",
});
