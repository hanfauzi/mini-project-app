"use client";
import Head from "next/head";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useGetPendingTransactions } from "../_hooks/useGetPendingTransactions";
import { useAcceptTransaction } from "../_hooks/useAcceptTransaction";
import { useRejectTransaction } from "../_hooks/useRejectTransaction";
import { withAuthGuard } from "@/hoc/AuthGuard";
dayjs.locale("id");

 function OrganizerTransactionsPage() {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetPendingTransactions();

  const acceptMutation = useAcceptTransaction();
  const rejectMutation = useRejectTransaction();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Gagal mengambil data transaksi.</p>;

  return (
    <>
      <Head>
        <title>Transactions Approval | TICKLY</title>
      </Head>
      <div className="min-h-screen px-6 pt-6 bg-white text-[#001a3a]">
        <h1 className="text-[24px] font-semibold mb-6">
          Transactions Need Approval
        </h1>

        <div className="flex flex-col gap-4">
          {transactions?.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No pending transactions.
            </div>
          )}
          {transactions?.map((trx) => (
            <div
              key={trx.id}
              className="w-full p-4 rounded-lg bg-[#f0f4fa] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  {trx.event.title || "No Event Title"}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Buyer:{" "}
                  <span className="font-medium">
                    {trx.user.firstName} {trx.user.lastName} (
                    {trx.user.username})
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Email: <span className="font-medium">{trx.user.email}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Phone:{" "}
                  <span className="font-medium">{trx.user.phoneNumber}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Ticket:{" "}
                  <span className="font-medium">{trx.ticketCategory.name}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Ticket Qty:{" "}
                  <span className="font-medium">{trx.quantity}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Price per Ticket:{" "}
                  <span className="font-medium">
                    Rp{trx.ticketCategory.price.toLocaleString("id-ID")}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Total:{" "}
                  <span className="font-medium">
                    Rp{trx.totalPrice.toLocaleString("id-ID")}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Final Price:{" "}
                  <span className="font-medium">
                    Rp{trx.finalPrice.toLocaleString("id-ID")}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Order Date:{" "}
                  {dayjs(trx.createdAt).format("DD MMMM YYYY HH:mm")}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Status:{" "}
                  <span className="font-semibold text-yellow-600">
                    {trx.status}
                  </span>
                </p>
                <div className="mt-2">
                  <span className="block text-xs text-gray-500 mb-1">
                    Payment Proof:
                  </span>
                  {trx.paymentProofUrl ? (
                    <a
                      href={trx.paymentProofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Image
                        src={trx.paymentProofUrl}
                        alt="Payment Proof"
                        width={120}
                        height={80}
                        className="rounded border border-gray-200 object-contain bg-white"
                      />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">
                      No payment proof uploaded.
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-2 md:items-end">
                <button
                  className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
                  onClick={() => acceptMutation.mutate(trx.id)}
                  disabled={acceptMutation.isPending || rejectMutation.isPending}
                >
                  {acceptMutation.isPending ? "Processing..." : "Approve"}
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-100 text-red-600 text-sm font-semibold hover:bg-red-200 transition"
                  onClick={() => rejectMutation.mutate(trx.id)}
                  disabled={acceptMutation.isPending || rejectMutation.isPending}
                >
                  {rejectMutation.isPending ? "Processing..." : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default withAuthGuard(OrganizerTransactionsPage, {   allowedRoles  : ["ORGANIZER"], redirectTo: "/" }) 
