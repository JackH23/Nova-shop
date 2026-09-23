// ========================================
// Return Status
// ========================================

export type ReturnStatus =
  | "REQUESTED"
  | "APPROVED"
  | "REJECTED"
  | "REFUNDED";

// ========================================
// Create Return Item
// ========================================

export type CreateReturnItem = {
  order_item_id: number;
  quantity: number;
};

// ========================================
// Order Item
// ========================================

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

// ========================================
// Return Item
// ========================================

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

// ========================================
// Admin Evidence Image
// ========================================

export type ReturnAdminImage = {
  id: number;
  return_id: number;

  image_url: string;

  created_at: string;
  updated_at?: string;
};

// ========================================
// Create Return Data
// ========================================

export type CreateReturnData = {
  order_id: number;

  reason: string;
  note?: string;

  items: CreateReturnItem[];
};

// ========================================
// Return Request
// ========================================

export type ReturnRequest = {
  id: number;
  order_id: number;
  user_id: number;

  status: ReturnStatus;

  // Customer return information
  reason: string;
  note: string | null;

  // Admin rejection information
  rejection_reason: string | null;
  admin_images?: ReturnAdminImage[];

  refund_amount: string;

  created_at: string;
  updated_at: string;

  items: ReturnItem[];
};

// ========================================
// Create Return Response
// ========================================

export type CreateReturnResponse = {
  message: string;
  return: ReturnRequest;
};

// ========================================
// Returns Response
// ========================================

export type ReturnsResponse = {
  message: string;
  returns: ReturnRequest[];
};

// ========================================
// Return Detail Response
// ========================================

export type ReturnResponse = {
  message: string;
  return: ReturnRequest;
};