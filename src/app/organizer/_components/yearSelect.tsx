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
    <Select
      value={selectedYear.toString()}
      onValueChange={(value) => onChange(Number(value))}
    >
      <SelectTrigger className="w-[180px] bg-white text-[#001a3a] border border-[#cbd5e1] shadow-sm focus:ring-2 focus:ring-[#001a3a]/40 rounded-md">
        <SelectValue placeholder="Pilih Tahun" />
      </SelectTrigger>
      <SelectContent className="bg-white text-[#001a3a] border border-[#cbd5e1] shadow-md rounded-md">
        {yearOptions.map((year) => (
          <SelectItem
            key={year}
            value={year.toString()}
            className="hover:bg-[#f0f4fa] focus:bg-[#f0f4fa] text-sm px-2 py-1.5 cursor-pointer"
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
