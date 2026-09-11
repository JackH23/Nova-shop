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

export const checkoutService = {
  // Get checkout information
  getCheckout: () => {
    return apiRequest("/checkout", {
      method: "GET",
    }) as Promise<CheckoutResponse>;
  },
};