"use client";

import Head from "next/head";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

import { withAuthGuard } from "@/hoc/AuthGuard";
import { useGetPendingTransactions } from "../../_hooks/useGetPendingTransactions";
import { useAcceptTransaction } from "../../_hooks/useAcceptTransaction";
import { useRejectTransaction } from "../../_hooks/useRejectTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";


import { User2, Mail, Phone, Ticket, CalendarClock, CreditCard, Wallet, ImageIcon, Check, X } from "lucide-react";

function idr(n: number | undefined) {
  if (n == null) return "Rp0";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}
function fmtDateTime(dt: string | Date) {
  return dayjs(dt).format("DD MMMM YYYY HH:mm");
}

function OrganizerTransactionsPage() {
  const { data: transactions, isLoading, isError } = useGetPendingTransactions();
  const acceptMutation = useAcceptTransaction();
  const rejectMutation = useRejectTransaction();

  const pendingCount = transactions?.length ?? 0;
  const busy = acceptMutation.isPending || rejectMutation.isPending;

  return (
    <>
      <Head>
        <title>Transactions Approval | TICKLY</title>
      </Head>

      <div className="min-h-screen px-4 md:px-6 pt-6 text-[#001a3a]">
        {/* Page header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-semibold">Transactions Need Approval</h1>
            <p className="text-sm text-[#001a3a]/70">Review dan setujui pembayaran yang menunggu verifikasi.</p>
          </div>
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
            {pendingCount} pending
          </Badge>
        </div>


        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-blue-100">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-40 bg-[#e6eef9]" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-5 w-56 bg-[#e6eef9]" />
                  <Skeleton className="h-5 w-64 bg-[#e6eef9]" />
                  <Skeleton className="h-24 w-full bg-[#e6eef9]" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 bg-[#e6eef9]" />
                    <Skeleton className="h-9 w-24 bg-[#e6eef9]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}


        {isError && (
          <div className="h-[200px] grid place-items-center text-red-600">
            Gagal mengambil data transaksi.
          </div>
        )}


        {!isLoading && !isError && pendingCount === 0 && (
          <Card className="border-blue-100">
            <CardContent className="py-10 text-center">
              <div className="mx-auto mb-3 w-10 h-10 grid place-items-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                <CreditCard className="h-5 w-5" />
              </div>
              <p className="font-medium">No pending transactions</p>
              <p className="text-sm text-[#001a3a]/70">Semua transaksi sudah diverifikasi.</p>
            </CardContent>
          </Card>
        )}


        {!isLoading && !isError && pendingCount > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {transactions!.map((trx) => (
              <Card key={trx.id} className="border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#001a3a]">
                    {trx.event.title || "No Event Title"}
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <User2 className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="font-medium">
                          {trx.user.firstName} {trx.user.lastName} ({trx.user.username})
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-[#001a3a]/80">
                        <Mail className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{trx.user.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-[#001a3a]/80">
                        <Phone className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{trx.user.phoneNumber}</span>
                      </div>
                    </div>

             
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Ticket className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="font-medium">{trx.ticketCategory.name}</span>
                      </div>
                      <div className="flex items-center text-sm text-[#001a3a]/80">
                        <Wallet className="h-4 w-4 mr-2 text-blue-600" />
                        <span>Qty: {trx.quantity}</span>
                      </div>
                      <div className="flex items-center text-sm text-[#001a3a]/80">
                        <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                        <span>Price: {idr(trx.ticketCategory.price)}</span>
                      </div>
                    </div>
                  </div>

         
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-lg bg-[#f0f4fa] border border-blue-100 px-3 py-2">
                      <p className="text-[11px] text-[#001a3a]/70">Total</p>
                      <p className="font-semibold">{idr(trx.totalPrice)}</p>
                    </div>
                    <div className="rounded-lg bg-[#f0f4fa] border border-blue-100 px-3 py-2">
                      <p className="text-[11px] text-[#001a3a]/70">Final Price</p>
                      <p className="font-semibold">{idr(trx.finalPrice)}</p>
                    </div>
                    <div className="rounded-lg bg-[#f0f4fa] border border-blue-100 px-3 py-2">
                      <p className="text-[11px] text-[#001a3a]/70">Order Date</p>
                      <div className="flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-blue-600" />
                        <p className="font-medium">{fmtDateTime(trx.createdAt)}</p>
                      </div>
                    </div>
                  </div>


                  <div className="mt-3 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#001a3a]/70">Status:</span>
                      <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200">
                        {trx.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#001a3a]/70">Payment Proof:</span>
                      {trx.paymentProofUrl ? (
                        <a
                          href={trx.paymentProofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-blue-100 bg-white px-2 py-1 text-sm hover:bg-blue-50"
                        >
                          <ImageIcon className="h-4 w-4 text-blue-600" />
                          Lihat
                        </a>
                      ) : (
                        <span className="text-xs text-[#001a3a]/50">No payment proof</span>
                      )}
                    </div>
                  </div>

  
                  <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => acceptMutation.mutate(trx.id)}
                      disabled={busy}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      {acceptMutation.isPending ? "Processing..." : "Approve"}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => rejectMutation.mutate(trx.id)}
                      disabled={busy}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {rejectMutation.isPending ? "Processing..." : "Reject"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default withAuthGuard(OrganizerTransactionsPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/organizer/login",
});
