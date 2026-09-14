import { apiRequest } from "@/lib/api";

export const dashboardService = {
  getOrderById: (orderId: number) => {
    return apiRequest(`/dashboard/orders/${orderId}`, {
      method: "GET",
    });
  },
};