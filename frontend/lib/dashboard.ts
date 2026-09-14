// Order item
export type DashboardOrderItem = {
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

// Delivery
export type DashboardDelivery = {
  id: number;
  order_id: number;
  delivery_method: string;
  delivery_fee: string;
  status: string;
  tracking_number: string | null;
  estimated_delivery_date: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
};

// Payment
export type DashboardPayment = {
  id: number;
  order_id: number;
  payment_method: string;
  amount: string;
  status: string;
  transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

// Order
export type DashboardOrder = {
  id: number;
  user_id: number;
  order_no: string;

  subtotal: string;
  shipping_fee: string;
  tax: string;
  discount_amount: string;
  total_amount: string;

  status: string;

  created_at: string;
  updated_at: string;

  items: DashboardOrderItem[];
  delivery: DashboardDelivery | null;
  payment: DashboardPayment | null;
};

// GET /dashboard/orders/:id
export type DashboardOrderResponse = {
  message: string;
  order: DashboardOrder;
};