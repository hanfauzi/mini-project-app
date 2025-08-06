export type CreateTransactionPayload = {
  eventId: string;
  ticketCategoryId: string;
  quantity: number;
  voucherCode?: string; 
  slug?: string, 
};

export interface Transaction {
  id: string;
  event: {title: string} | null; // Assuming event has a title field
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
}
