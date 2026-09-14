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

  // GET logged-in user's returns
  getReturns: (): Promise<ReturnsResponse> => {
    return apiRequest("/returns", {
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