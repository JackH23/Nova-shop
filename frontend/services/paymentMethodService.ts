import { apiRequest } from "@/lib/api";

import type {
  PaymentMethodsResponse,
  DefaultPaymentMethodResponse,
  CreatePaymentMethodData,
  CreatePaymentMethodResponse,
  UpdatePaymentMethodData,
  UpdatePaymentMethodResponse,
  RemovePaymentMethodResponse,
  SetDefaultPaymentMethodResponse,
} from "@/lib/paymentMethod";

export const paymentMethodService = {

  // GET logged-in user's default payment method
  getDefaultPaymentMethod: (): Promise<DefaultPaymentMethodResponse> => {
    return apiRequest("/payment-methods/default", {
      method: "GET",
    });
  },

  // GET logged-in user's payment methods
  getPaymentMethods: (
    page: number = 1,
    limit: number = 4,
  ): Promise<PaymentMethodsResponse> => {
    return apiRequest(
      `/payment-methods?page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    );
  },

  // Create new payment method
  createPaymentMethod: (
    data: CreatePaymentMethodData,
  ): Promise<CreatePaymentMethodResponse> => {
    return apiRequest("/payment-methods", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update payment method
  updatePaymentMethod: (
    paymentMethodId: number,
    data: UpdatePaymentMethodData,
  ): Promise<UpdatePaymentMethodResponse> => {
    return apiRequest(`/payment-methods/${paymentMethodId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Remove payment method
  removePaymentMethod: (
    paymentMethodId: number,
  ): Promise<RemovePaymentMethodResponse> => {
    return apiRequest(`/payment-methods/${paymentMethodId}`, {
      method: "DELETE",
    });
  },

  // Set payment method as default
  setDefaultPaymentMethod: (
    paymentMethodId: number,
  ): Promise<SetDefaultPaymentMethodResponse> => {
    return apiRequest(
      `/payment-methods/${paymentMethodId}/default`,
      {
        method: "PATCH",
      },
    );
  },
};