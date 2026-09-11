import type { CheckoutData } from "@/services/checkoutService";

export type CheckoutState = {
  checkout: CheckoutData | null;
  loading: boolean;
  error: string;
};

export const initialCheckoutState: CheckoutState = {
  checkout: null,
  loading: false,
  error: "",
};

export type CheckoutAction =
  | {
      type: "SET_CHECKOUT";
      value: CheckoutData;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    }
  | {
      type: "RESET_CHECKOUT";
    };

export function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState {
  switch (action.type) {
    case "SET_CHECKOUT":
      return {
        ...state,
        checkout: action.value,
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

    case "RESET_CHECKOUT":
      return initialCheckoutState;

    default:
      return state;
  }
}