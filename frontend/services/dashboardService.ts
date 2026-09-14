import { apiRequest } from "@/lib/api";
import type {
  DashboardOrderResponse,
  DashboardOrdersResponse,
  DashboardSummaryResponse,
} from "@/lib/dashboard";

export const dashboardService = {
  // GET all orders with pagination
  getOrders: (
    page: number = 1,
    limit: number = 5,
  ): Promise<DashboardOrdersResponse> => {
    return apiRequest(
      `/dashboard/orders?page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    );
  },

  // GET one order
  getOrderById: (
    orderId: number,
  ): Promise<DashboardOrderResponse> => {
    return apiRequest(`/dashboard/orders/${orderId}`, {
      method: "GET",
    });
  },

  // GET dashboard summary
  getSummary: (): Promise<DashboardSummaryResponse> => {
    return apiRequest("/dashboard/summary", {
      method: "GET",
    });
  },
};