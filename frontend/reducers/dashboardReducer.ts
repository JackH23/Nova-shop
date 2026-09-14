import type { DashboardOrder, DashboardSummaryResponse } from "@/lib/dashboard";

export type DashboardState = {
  summary: DashboardSummaryResponse["dashboard"] | null;

  order: DashboardOrder | null;
  orders: DashboardOrder[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string;
};

export const initialDashboardState: DashboardState = {
  summary: null,
  order: null,
  orders: [],
  total: 0,
  totalPages: 0,
  page: 1,
  limit: 5,
  loading: false,
  error: "",
};

export type DashboardAction =
  | {
      type: "SET_SUMMARY";
      value: DashboardSummaryResponse["dashboard"] | null;
    }
  | {
      type: "SET_ORDER";
      value: DashboardOrder | null;
    }
  | {
      type: "SET_ORDERS";
      value: {
        orders: DashboardOrder[];
        total: number;
        totalPages: number;
        page: number;
        limit: number;
      };
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case "SET_SUMMARY":
      return {
        ...state,
        summary: action.value,
      };
    case "SET_ORDER":
      return {
        ...state,
        order: action.value,
      };

    case "SET_ORDERS":
      return {
        ...state,
        orders: action.value.orders,
        total: action.value.total,
        totalPages: action.value.totalPages,
        page: action.value.page,
        limit: action.value.limit,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.value,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.value,
      };

    default:
      return state;
  }
}
