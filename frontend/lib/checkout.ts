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

// ================================
// Place Order
// ================================

export type ShippingData = {
  email: string;
  firstName: string;
  lastName: string;
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

export type PlaceOrderResponse = {
  message: string;
  order: PlacedOrder;
};