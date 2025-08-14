"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoAlarm } from "react-icons/io5";
import { toast } from "sonner";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import useCreateTransaction from "../../_hooks/useCreateTransaction";

type Props = {
  event: Event;
  slug: string;
};

const TransactionClientPage = ({ event }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);

  const { createTransactionMutation } = useCreateTransaction();
  const { mutate: createTransaction, isPending } = createTransactionMutation;

  const handleVoucherCheck = async () => {
    if (!voucherCode) {
      setDiscountAmount(0);
      return;
    }

    try {
      const res = await axiosInstance.get("/api/voucher/validate", {
        params: {
          code: voucherCode,
          eventId: event.id,
        },
      });

      const discount = res.data.discountAmount || 0;
      setDiscountAmount(discount);
      toast.success(`Valid voucher! Discount Rp ${discount.toLocaleString()}`);
      console.log("Voucher Check Response:", res.data);
    } catch (error: any) {
      setDiscountAmount(0);
      toast.error(
        error?.response?.data?.message ||
          "Voucher is invalid or not applicable."
      );
      console.error("Voucher Check Error:", error);
    }
  };

  const handleTransaction = () => {
    if (!selectedCategory) {
      toast.error("Pilih kategori tiket terlebih dahulu.");
      return;
    }

    createTransaction({
      eventId: event.id,
      ticketCategoryId: selectedCategory,
      quantity,
      voucherCode,
      usedPoints,
    });
  };

  const selectedTicket = event.ticketCategories.find(
    (cat) => cat.id === selectedCategory
  );
  const originalPrice = selectedTicket ? selectedTicket.price * quantity : 0;
  const maxUsablePoints = selectedTicket
    ? selectedTicket.price * quantity * 0.05
    : 0;
  const totalPrice = Math.max(originalPrice - discountAmount - usedPoints, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <Image
          src={event.imageURL}
          alt={event.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <FaLocationDot />
            {event.location}
          </p>
          <p className="text-gray-500 flex items-center gap-2 mt-3">
            <FaCalendarAlt />
            {new Date(event.startDay).toLocaleDateString()} -{" "}
            {new Date(event.endDay).toLocaleDateString()}
          </p>
          <p className="text-gray-500 flex items-center gap-2 mt-3">
            <IoAlarm /> {event.startTime} - {event.endTime}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Pilih Kategori Tiket</h2>
        {event.ticketCategories.map((cat) => (
          <label
            key={cat.id}
            className={`block border rounded-xl px-4 py-3 cursor-pointer ${
              selectedCategory === cat.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <input
              type="radio"
              name="ticketCategory"
              value={cat.id}
              onChange={() => setSelectedCategory(cat.id)}
              className="hidden"
            />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{cat.name}</h3>
                <p className="text-gray-500">Tersedia: {cat.quota}</p>
              </div>
              <p className="text-blue-600 font-semibold">
                Rp {cat.price.toLocaleString()}
              </p>
            </div>
          </label>
        ))}

        <div className="flex items-center gap-4">
          <label className="font-medium">Jumlah Tiket</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1"
          >
            {[1, 2].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Voucher Code Input */}
        <div className="space-y-2">
          <label className="font-medium block">Kode Voucher</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Masukkan kode voucher"
            />
            <button
              onClick={handleVoucherCheck}
              className="bg-blue-600 text-white cursor-pointer px-4 rounded hover:bg-blue-700 transition"
            >
              Cek
            </button>
          </div>
          {discountAmount > 0 && (
            <p className="text-green-600 font-medium">
              Potongan harga Rp {discountAmount.toLocaleString()}
            </p>
          )}
        </div>

        {/* Gunakan Point */}
        <div className="space-y-2">
          <label className="font-medium block">Gunakan Point</label>
          <input
            type="number"
            value={Number(usedPoints) || 0}
            onChange={(e) => {
              let val = parseInt(e.target.value);
              if (isNaN(val)) val = 0;
              setUsedPoints(Math.max(0, Math.min(val, maxUsablePoints)));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Masukkan jumlah point"
            min={0}
            max={maxUsablePoints}
          />
          <p className="text-gray-500 text-sm">
            Maksimal point yang bisa digunakan: {maxUsablePoints}
          </p>
        </div>

        {/* Total Price */}
        <div className="pt-4 border-t font-semibold text-lg flex justify-between">
          <span>Total</span>
          <span className="text-blue-700">
            Rp {totalPrice.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleTransaction}
          disabled={!selectedCategory || isPending}
          className="mt-4 w-full bg-blue-600 text-white cursor-pointer py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Beli Tiket
        </button>
      </div>
    </div>
  );
};

export default TransactionClientPage;
