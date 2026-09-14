export type CreateReturnItem = {
  order_item_id: number;
  quantity: number;
};

export type ReturnOrderItem = {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: number | null;
  product_name: string;
  unit_price: string;
  quantity: number;
  line_total: string;
  created_at: string;
  updated_at: string;
};

export type ReturnItem = {
  id: number;
  return_id: number;
  order_item_id: number;
  quantity: number;
  refund_amount: string;
  created_at: string;
  updated_at: string;
  order_item: ReturnOrderItem;
};

export type CreateReturnData = {
  order_id: number;
  reason: string;
  note?: string;
  items: CreateReturnItem[];
};

export type ReturnRequest = {
  id: number;
  order_id: number;
  user_id: number;
  status: "REQUESTED" | "APPROVED" | "REJECTED" | "REFUNDED";
  reason: string;
  note: string | null;
  refund_amount: string;
  created_at: string;
  updated_at: string;
  items: ReturnItem[];
};

export type CreateReturnResponse = {
  message: string;
  return: ReturnRequest;
};

export type ReturnsResponse = {
  message: string;
  returns: ReturnRequest[];
};

export type ReturnResponse = {
  message: string;
  return: ReturnRequest;
};