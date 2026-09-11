import type { CheckoutData, PlacedOrder } from "@/services/checkoutService";

export type CheckoutState = {
  checkout: CheckoutData | null;
  placedOrder: PlacedOrder | null;
  loading: boolean;
  placingOrder: boolean;
  error: string;
};

export const initialCheckoutState: CheckoutState = {
  checkout: null,
  placedOrder: null,
  loading: false,
  placingOrder: false,
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
      type: "SET_PLACING_ORDER";
      value: boolean;
    }
  | {
      type: "SET_PLACED_ORDER";
      value: PlacedOrder;
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
  action: CheckoutAction,
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
    case "SET_PLACING_ORDER":
      return {
        ...state,
        placingOrder: action.value,
      };

    case "SET_PLACED_ORDER":
      return {
        ...state,
        placedOrder: action.value,
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
