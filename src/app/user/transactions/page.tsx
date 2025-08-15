"use client";

import Head from "next/head";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

import Loading from "@/components/Loading";
import { withAuthGuard } from "@/hoc/AuthGuard";
import { useGetTranscations } from "../_hooks/useGetTransactionsUser";
import { Transaction } from "@/types/transaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Ticket, CalendarClock, Tag } from "lucide-react";
import React, { useState } from "react";

function statusClasses(status?: string) {
  switch ((status ?? "").toUpperCase()) {
    case "PAID":
    case "SUCCESS":
      return "bg-green-50 text-green-700 border border-green-200";
    case "PENDING":
      return "bg-yellow-50 text-yellow-700 border border-yellow-200";
    case "CANCELED":
    case "FAILED":
      return "bg-red-50 text-red-700 border border-red-200";
    default:
      return "bg-slate-50 text-slate-700 border border-slate-200";
  }
}

export default function MyTransactionsPage() {
  const { data: transactions, isLoading, isError } = useGetTranscations();
  const [showTicket, setShowTicket] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto min-h-screen">
      <Head>
        <title>My Transactions | TICKLY</title>
      </Head>

      <div className="w-full px-4 md:px-6">
        <div className="mb-6">
          <h1 className="text-[24px] md:text-[28px] font-semibold text-[#001a3a]">
            My Transactions
          </h1>
          <p className="text-sm text-[#001a3a]/70">
            Riwayat transaksi tiket kamu.
          </p>
        </div>

        {isError && (
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="py-6 text-red-700">
              Gagal mengambil Transaksi.
            </CardContent>
          </Card>
        )}

        {!isError && (!transactions || transactions.length === 0) && (
          <Card className="border-blue-100">
            <CardContent className="py-10 text-center">
              <div className="mx-auto mb-3 w-10 h-10 grid place-items-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                <CreditCard className="h-5 w-5" />
              </div>
              <p className="text-[#001a3a] font-medium">Belum ada transaksi</p>
              <p className="text-sm text-[#001a3a]/70">
                Tiket yang kamu beli akan muncul di sini.
              </p>
            </CardContent>
          </Card>
        )}

        {/* List */}
        {!isError && transactions && transactions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...transactions]
              .sort(
                (a: Transaction, b: Transaction) =>
                  dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
              )
              .map((trx: Transaction, idx: number) => {
                const title = trx.event?.title || "No Title";
                const category =
                  (trx as any)?.ticketCategory?.name ??
                  trx.ticketCategoryId ??
                  "No Ticket Category";
                const created = dayjs(trx.createdAt).format(
                  "DD MMMM YYYY HH:mm"
                );
                const isDone = trx.status === "DONE";

                return (
                  <Card key={trx.id ?? idx} className="border-blue-100">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-[#001a3a]">
                          Transaction #{idx + 1}
                        </CardTitle>
                        <Badge className={statusClasses(trx.status)}>
                          {trx.status || "UNKNOWN"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Ticket className="h-4 w-4 mr-2 text-blue-600" />
                          <span className="font-medium text-[#001a3a]">
                            {title}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-[#001a3a]/80">
                          <Tag className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{category}</span>
                        </div>
                        <div className="flex items-center text-sm text-[#001a3a]/80">
                          <CalendarClock className="h-4 w-4 mr-2 text-blue-600" />
                          <span>{created}</span>
                        </div>

                        {/* Tombol Show Ticket hanya kalau DONE */}
                        {isDone && (
                          <button
                            onClick={() => setShowTicket((prev) => !prev)}
                            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                          >
                            {showTicket ? "Hide Ticket" : "Show Ticket"}
                          </button>
                        )}

                        {/* Preview tiket */}
                        {isDone && showTicket && (
                          <div className="border rounded-xl p-4 bg-white shadow-md mt-2">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <p className="text-sm text-gray-600">
                              Lokasi: {trx.event?.location || "TBD"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Tanggal mulai:{" "}
                              {trx.event?.startDay
                                ? dayjs(trx.event.startDay).format(
                                    "DD MMMM YYYY"
                                  )
                                : "TBD"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Kategori: {category}
                            </p>
                            <p className="text-sm font-medium mt-2">
                              ID: {trx.id}
                              
                            </p>
                            <p className="text-xs text-red-600 font-semibold mt-1">
                              TUNJUKKAN ID UNTUK CHECK IN
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export const WithGuard = withAuthGuard(MyTransactionsPage, {
  allowedRoles: ["USER"],
  redirectTo: "/user/login",
});
