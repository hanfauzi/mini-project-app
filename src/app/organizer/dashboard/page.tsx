"use client";

import { withAuthGuard } from "@/hoc/AuthGuard";
import Head from "next/head";
import { useState } from "react";
import { ChartLine } from "../_components/chartLine";
import { YearSelect } from "../_components/yearSelect";
import useGetDashboard from "../_hooks/useDashboard";
import useGetOverview from "../_hooks/useGetOverview";

function DashboardPage() {
  const { data } = useGetDashboard();
  console.log("Dashboard Data:", data);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: overviewData } = useGetOverview(selectedYear);
  console.log("Overview Data:", overviewData);

  const chartData = overviewData
    ? [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ].map((month, idx) => ({
        month,
        desktop: overviewData[idx] || 0,
      }))
    : [];

  return (
    <>
      <Head>
        <title>Dashboard Organizer | TICKLY</title>
      </Head>

      {/* Wrapper konten dashboard */}
      <div className="w-full px-4 md:px-6">
        <h1 className="text-[24px] font-semibold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {(
            [
              { label: "Total Revenue", value: `Rp ${data?.totalRevenue}` },
              { label: "Total Events", value: `${data?.totalEvents}` },
              { label: "Total Tickets", value: `${data?.totalTickets}` },
              { label: "Total Vouchers", value: `${data?.totalVouchers}` },
            ] as const
          ).map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f0f4fa] p-4 rounded-lg shadow-sm flex flex-col gap-2"
            >
              <p className="text-sm font-medium text-[#001a3a]/80">
                {item.label}
              </p>
              <p className="text-xl font-bold text-[#001a3a]">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Overview Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#001a3a]">
              Monthly Revenue
            </h2>
            <YearSelect
              selectedYear={selectedYear}
              onChange={setSelectedYear}
            />
          </div>

          {chartData.length ? (
            <ChartLine data={chartData} />
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400">
              Memuat grafik...
            </div>
          )}
        </div>


      </div>
    </>
  );
}

export default withAuthGuard(DashboardPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/",
});
