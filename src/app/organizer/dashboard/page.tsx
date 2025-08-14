"use client";

import Head from "next/head";
import { useMemo, useState } from "react";
import { withAuthGuard } from "@/hoc/AuthGuard";
import useGetDashboard from "../_hooks/useDashboard";
import useGetOverview from "../_hooks/useGetOverview";
import { ChartLine } from "../_components/chartLine";
import { YearSelect } from "../_components/yearSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { Wallet, CalendarDays, Ticket, Gift, TrendingUp } from "lucide-react";

function formatCurrencyIDR(n?: number) {
  if (n == null || isNaN(n)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

function MetricCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: string | number;
  icon?: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <Card className={`border-blue-100 ${highlight ? "bg-[#eef4ff]" : "bg-white"}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {Icon && (
            <div className="mt-1 rounded-lg bg-blue-50 text-blue-600 p-2 border border-blue-100">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-xs font-medium tracking-wide text-[#001a3a]/70">{label}</p>
            <p className="mt-1 text-xl font-bold text-[#001a3a]">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: kpi, isLoading: loadingKpi } = useGetDashboard();
  const { data: overviewData, isLoading: loadingOverview } = useGetOverview(selectedYear);

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const chartData = useMemo(
    () =>
      (overviewData ?? []).map((val: number, idx: number) => ({
        month: months[idx],
        revenue: val || 0,
      })),
    [overviewData]
  );

  return (
    <>
      <Head>
        <title>Dashboard Organizer | TICKLY</title>
      </Head>

      <div className="w-full px-4 md:px-6">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[24px] md:text-[28px] font-semibold text-[#001a3a]">Dashboard</h1>
            <p className="text-sm text-[#001a3a]/70">Ringkasan performa organizer kamu.</p>
          </div>
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
            <TrendingUp className="h-3.5 w-3.5 mr-1" /> Live
          </Badge>
        </div>

        {/* KPI Cards */}
        {loadingKpi ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-24 mb-3 bg-[#e6eef9]" />
                  <Skeleton className="h-7 w-32 bg-[#e6eef9]" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <MetricCard
              label="Total Revenue"
              value={formatCurrencyIDR(kpi?.totalRevenue)}
              icon={Wallet}
              highlight
            />
            <MetricCard label="Total Events" value={kpi?.totalEvents ?? 0} icon={CalendarDays} />
            <MetricCard label="Total Tickets" value={kpi?.totalTickets ?? 0} icon={Ticket} />
            <MetricCard label="Total Vouchers" value={kpi?.totalVouchers ?? 0} icon={Gift} />
          </div>
        )}


        <Card className="bg-white border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-4">
              <CardTitle className="text-[#001a3a]">Monthly Revenue</CardTitle>
              <YearSelect selectedYear={selectedYear} onChange={setSelectedYear} />
            </div>
            <p className="text-sm text-[#001a3a]/70">Januari – Desember</p>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            {loadingOverview ? (
              <div className="h-[300px] flex items-center justify-center">
                <Skeleton className="h-6 w-40 bg-[#e6eef9]" />
              </div>
            ) : chartData.length ? (
              <ChartLine data={chartData} />
            ) : (
              <div className="h-[300px] flex items-center justify-center text-[#001a3a]/60">
                Belum ada data untuk tahun ini.
              </div>
            )}
            <div className="mt-4 text-sm text-[#001a3a]">
              <div className="flex gap-2 items-center font-medium">
                Tren tahun ini <TrendingUp className="h-4 w-4" />
              </div>
              <p className="text-[#001a3a]/70 leading-snug">
                Pendapatan bulanan berdasarkan tahun yang dipilih.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default withAuthGuard(DashboardPage, {
  allowedRoles: ["ORGANIZER"],
  redirectTo: "/",
});
