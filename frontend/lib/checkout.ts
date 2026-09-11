import { checkoutService } from "@/services/checkoutService";

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

export type Checkout = {
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
  checkout: Checkout;
};

export async function getCheckout(): Promise<CheckoutResponse> {
  return checkoutService.getCheckout();
}