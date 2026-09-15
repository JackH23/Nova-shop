export type PaymentMethod = {
  id: number;
  user_id: number;
  type: "Visa" | "Mastercard" | "Amex" | "Discover";
  last_four: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type PaymentMethodsResponse = {
  message: string;
  paymentMethods: PaymentMethod[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type DefaultPaymentMethodResponse = {
  message: string;
  paymentMethod: PaymentMethod | null;
};

export type CreatePaymentMethodData = {
  type: "Visa" | "Mastercard" | "Amex" | "Discover";
  last_four: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default?: boolean;
};

export type PaymentMethodFormData = {
  type: "Visa" | "Mastercard" | "Amex" | "Discover";
  card_number: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default: boolean;
};

export type CreatePaymentMethodResponse = {
  message: string;
  paymentMethod: PaymentMethod;
};

export type UpdatePaymentMethodData = {
  type?: "Visa" | "Mastercard" | "Amex" | "Discover";
  last_four?: string;
  cardholder_name?: string;
  expiry_month?: string;
  expiry_year?: string;
};

export type UpdatePaymentMethodResponse = {
  message: string;
  paymentMethod: PaymentMethod;
};

export type RemovePaymentMethodResponse = {
  message: string;
};

export type SetDefaultPaymentMethodResponse = {
  message: string;
  paymentMethod: PaymentMethod;
};