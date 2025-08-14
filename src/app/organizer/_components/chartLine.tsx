import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

type ChartLineProps = {
  data: { month: string; revenue: number }[];
};

export function ChartLine({ data }: ChartLineProps) {
  return (
    <div className="bg-[#f0f4fa] rounded-lg shadow-sm p-4">
      <div className="h-[300px] w-full">
        <ChartContainer config={{}} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 12, right: 12, top: 10 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(v) => String(v).slice(0, 3)}
              />
              <YAxis
                width={60}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) =>
                  Intl.NumberFormat("id-ID", { notation: "compact", maximumFractionDigits: 1 }).format(
                    Number(v)
                  )
                }
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="revenue"
                type="monotone"
                stroke="#3b82f6"        
                strokeWidth={2.25}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
