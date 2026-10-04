import { apiRequest } from "@/lib/api";
import type {
  CreateReturnData,
  CreateReturnResponse,
  ReturnResponse,
  ReturnsResponse,
} from "@/lib/returns";

export const returnService = {
  // POST create return request
  createReturn: (
    data: CreateReturnData,
  ): Promise<CreateReturnResponse> => {
    return apiRequest("/returns", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // GET logged-in user's returns with pagination
  getReturns: (
    page = 1,
    limit = 6,
  ): Promise<ReturnsResponse> => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    return apiRequest(`/returns?${query.toString()}`, {
      method: "GET",
    });
  },

  // GET one return
  getReturnById: (
    returnId: number,
  ): Promise<ReturnResponse> => {
    return apiRequest(`/returns/${returnId}`, {
      method: "GET",
    });
  },
};