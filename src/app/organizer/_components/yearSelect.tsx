"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearSelectProps {
  selectedYear: number;
  onChange: (year: number) => void;
  range?: number;
}

export const YearSelect = ({
  selectedYear,
  onChange,
  range = 5,
}: YearSelectProps) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: range }, (_, i) => currentYear - i);

  return (
    <Select value={String(selectedYear)} onValueChange={(v) => onChange(Number(v))}>
      <SelectTrigger className="w-[160px] bg-white text-[#001a3a] border border-blue-100 shadow-sm focus:ring-2 focus:ring-[#001a3a]/30 rounded-md">
        <SelectValue placeholder="Pilih Tahun" />
      </SelectTrigger>
      <SelectContent className="bg-white text-[#001a3a] border border-blue-100 shadow-md rounded-md">
        {yearOptions.map((year) => (
          <SelectItem
            key={year}
            value={String(year)}
            className="hover:bg-[#f0f4fa] focus:bg-[#f0f4fa] text-sm px-2 py-1.5 cursor-pointer"
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
