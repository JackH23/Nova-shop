import type { DashboardOrder } from "@/lib/dashboard";

export type DashboardState = {
  order: DashboardOrder | null;
  loading: boolean;
  error: string;
};

export const initialDashboardState: DashboardState = {
  order: null,
  loading: false,
  error: "",
};

export type DashboardAction =
  | {
      type: "SET_ORDER";
      value: DashboardOrder | null;
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
    case "SET_ORDER":
      return {
        ...state,
        order: action.value,
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