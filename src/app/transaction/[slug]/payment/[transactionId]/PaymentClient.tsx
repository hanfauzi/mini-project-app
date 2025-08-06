"use client";
import { useTransaction } from "../../../_hooks/useGetTransaction";
import { uploadPaymentProof } from "../../../_hooks/useUploadPaymentProof";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  transactionId: string;
};

export default function PaymentClient({ transactionId }: Props) {
  const { transaction, loading, error } = useTransaction(transactionId);
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (transaction?.data?.expiresAt) {
      const expiresAt = new Date(transaction.data.expiresAt).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = Math.floor((expiresAt - now) / 1000);
        setTimeLeft(diff > 0 ? diff : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [transaction]);

  const handleUpload = async () => {
    if (!file || !transaction?.data?.id) return;
    setIsUploading(true);

    try {
      await uploadPaymentProof({
        transactionId: transaction.data.id,
        image: file,
      });
      toast.success("Bukti pembayaran berhasil diupload!");
    } catch (err: any) {
      toast.error("Gagal upload bukti pembayaran.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const { event, status } = transaction.data;
  const isExpired = timeLeft <= 0 || transaction.data.isExpired;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 min-h-screen bg-white shadow rounded-xl space-y-6">
      <h1 className="text-2xl font-bold">Transaksi untuk: {event.title}</h1>
      <p className="text-gray-600">Status: {status}</p>

      <div>
        <p className="text-red-600 font-bold text-xl">
          {isExpired
            ? "Waktu pembayaran telah habis!"
            : `Sisa waktu pembayaran: ${formatTime(timeLeft)}`}
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          disabled={isExpired || isUploading}
        />
        <button
          onClick={handleUpload}
          disabled={!file || isExpired || isUploading}
          className={`px-4 py-2 rounded text-white font-semibold ${
            isExpired || isUploading || !file
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Bukti Pembayaran"}
        </button>
      </div>
    </div>
  );
}
