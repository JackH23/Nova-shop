import { apiRequest } from "@/lib/api";

export type CheckoutVariant = {
  id: number;
  colorName: string;
  colorHex: string | null;
};

export type CheckoutItem = {
  cartItemId: number;
  productId: number;
  variantId: number | null;
  productName: string;
  image: string;
  variant: CheckoutVariant | null;
  quantity: number;
  availableStock: number;
  unitPrice: number;
  lineTotal: number;
};

export type CheckoutData = {
  cartId: number;
  items: CheckoutItem[];
  totalQuantity: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
};

export type CheckoutResponse = {
  message: string;
  checkout: CheckoutData;
};

// Place Order types

export type ShippingData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  stateProvince: string;
  postalCode: string;
};

export type DeliveryMethod = "STANDARD" | "EXPRESS";

export type PaymentMethod = "CREDIT_CARD" | "PAYPAL";

export type PlaceOrderRequest = {
  shipping: ShippingData;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
};

export type PlacedOrder = {
  id: number;
  orderNo: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discountAmount: number;
  total: number;
  status: string;
};

export type GetOrderResponse = {
  message: string;
  order: PlacedOrder;
};

export type PlaceOrderResponse = {
  message: string;
  order: PlacedOrder;
};

export const checkoutService = {
  // Get checkout information
  getCheckout: () => {
    return apiRequest("/checkout", {
      method: "GET",
    }) as Promise<CheckoutResponse>;
  },

  // Place order
  placeOrder: (data: PlaceOrderRequest) => {
    return apiRequest("/checkout/order", {
      method: "POST",
      body: JSON.stringify(data),
    }) as Promise<PlaceOrderResponse>;
  },

  // Get order by ID
  getOrderById: (orderId: number) => {
    return apiRequest(`/checkout/order/${orderId}`, {
      method: "GET",
    }) as Promise<GetOrderResponse>;
  },
};
