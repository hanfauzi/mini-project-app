// pages/dashboard.tsx
"use client";
import Head from "next/head";
import useGetDashboard from "../_hooks/useDashboard";
import { ChartLine } from "../_components/chartLine";
import useGetOverview from "../_hooks/useGetOverview";
import { useState } from "react";
import { YearSelect } from "../_components/yearSelect";
import { withAuthGuard } from "@/hoc/AuthGuard";

 function DashboardPage() {
  const { data } = useGetDashboard();
  const [selectedYear, setSlectedyear] = useState(new Date().getFullYear());
  const { data: overviewData } = useGetOverview(selectedYear);

  const chartData = overviewData
    ? [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
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
      <div className="min-h-screen px-6 pt-6 bg-white text-[#001a3a]">
        <h1 className="text-[24px] font-semibold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: `Rp ${data?.totalRevenue} ` },
            { label: "Total Events", value: `${data?.totalEvents}` },
            { label: "Total Tickets", value: `${data?.totalTickets}` },
            { label: "Total Vouchers", value: `${data?.totalVouchers}` },
          ].map((item, idx) => (
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
            <YearSelect selectedYear={selectedYear} onChange={setSlectedyear} />
          </div>

          {chartData.length ? (
            <ChartLine data={chartData} />
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400">
              Memuat grafik...
            </div>
          )}
        </div>

        {/* Recent Sales */}
        <div className="bg-[#f0f4fa] p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Recent Sales</h2>
          <p className="text-sm text-gray-600">You have made 0 sales so far.</p>
        </div>
      </div>
    </>
  );
}

export default withAuthGuard(DashboardPage, {allowedRoles: ["ORGANIZER"], redirectTo: "/"})
