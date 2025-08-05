export type CreateTransactionPayload = {
  eventId: string;
  ticketCategoryId: string;
  quantity: number;
  voucherCode?: string; 
  slug?: string, 
};
