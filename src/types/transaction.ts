import { Event } from "./event";

export type CreateTransactionPayload = {
  eventId: string;
  ticketCategoryId: string;
  quantity: number;
  voucherCode?: string; 
  slug?: string,
  usedPoints?: number; // Optional, if points system is implemented 
};

export interface Transaction {
  id: string;
  event: Event | null; 
  eventId: string;
  userId: string;
  ticketCategoryId: string;
  quantity: number;
  usedPoints?: number;
  finalPrice: number;
  voucherId?: string;
  paymentProofUrl?: string;
  totalPrice: number;
  status: "WAITING_PAYMENT" | "WAITING_CONFIRMATION" | "DONE" | "REJECTED" | "CANCELED";
  createdAt: string;
   tickets?: {
    id: string;
    // bisa ditambah info lain kalau perlu
  }[];
}
