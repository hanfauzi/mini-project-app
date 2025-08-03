import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";

type ChartLineProps = {
  data: { month: string; desktop: number }[];
};

export function ChartLine({ data }: ChartLineProps) {
  return (
    <div className="bg-[#f0f4fa] rounded-lg shadow-sm p-4 mb-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[#001a3a]">
          Monthly Revenue
        </h2>
        <p className="text-sm text-[#001a3a]/80">January - December</p>
      </div>

      <ChartContainer config={{}} className="h-[300px] w-full">
        <LineChart data={data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="#3b82f6" // Tailwind blue-500
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>

      <div className="mt-4 text-sm text-[#001a3a] flex flex-col gap-1">
        <div className="flex gap-2 items-center font-medium">
          Trending up this year <TrendingUp className="h-4 w-4" />
        </div>
        <p className="text-[#001a3a]/70 leading-snug">
          Monthly revenue for the selected year
        </p>
      </div>
    </div>
  );
}
