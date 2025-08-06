"use client";
import Loading from "@/components/Loading";
import { withAuthGuard } from "@/hoc/AuthGuard";
import dayjs from "dayjs";
import "dayjs/locale/id";
import Head from "next/head";
import { Transaction } from "@/types/transaction";
import { useGetTranscations } from "../_hooks/useGetTransactionsUser";
dayjs.locale("id");

function MyTransactionsPage() {
  const { data: transaction, isLoading, isError } = useGetTranscations();

  if (isLoading) return <Loading />;
  if (isError) return <p>Gagal mengambil Transaksi.</p>;

  return (
    <>
      <Head>
        <title>My Transactions | TICKLY</title>
      </Head>
      <h1 className="container mx-auto py-6 px-8 text-[24px] font-semibold mb-6">
        My Transactions
      </h1>
      <div className="container mx-auto py-6 px-8 flex flex-col gap-4">
        {transaction.map((transaction: Transaction, index: number) => (
          <div
            key={transaction?.id}
            className="w-full p-4 rounded-lg bg-[#f0f4fa] hover:bg-[#e0e7f1] transition-colors shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer "
          >
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl text-[#001a3a] mb-1">
                Transaksi #{index + 1}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                {transaction.event?.title || "No Title"}
              </p>
              <p className="text-sm text-gray-600">
                {transaction.ticketCategoryId || "No Ticket Category"}
              </p>
              <p className="text-sm text-gray-600">
                {transaction.status || "No Status"}
              </p>
              <p className="text-sm text-gray-500">
                {dayjs(transaction.createdAt).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default withAuthGuard(MyTransactionsPage, {
  allowedRoles: ["USER"],
  redirectTo: "/user/login",
});
