import type { PaymentMethod } from "@/lib/paymentMethod";

export type PaymentMethodState = {
  paymentMethods: PaymentMethod[];
  paymentMethod: PaymentMethod | null;

  total: number;
  page: number;
  limit: number;
  totalPages: number;

  loading: boolean;
  error: string;
};

export const initialPaymentMethodState: PaymentMethodState = {
  paymentMethods: [],
  paymentMethod: null,

  total: 0,
  page: 1,
  limit: 4,
  totalPages: 1,

  loading: false,
  error: "",
};

export type PaymentMethodAction =
  | {
      type: "SET_PAYMENT_METHODS";
      value: PaymentMethod[];
    }
  | {
      type: "SET_PAYMENT_METHOD";
      value: PaymentMethod | null;
    }
  | {
      type: "ADD_PAYMENT_METHOD";
      value: PaymentMethod;
    }
  | {
      type: "UPDATE_PAYMENT_METHOD";
      value: PaymentMethod;
    }
  | {
      type: "REMOVE_PAYMENT_METHOD";
      value: number;
    }
  | {
      type: "SET_DEFAULT_PAYMENT_METHOD";
      value: PaymentMethod;
    }
  | {
      type: "SET_TOTAL";
      value: number;
    }
  | {
      type: "SET_PAGINATION";
      value: {
        page: number;
        limit: number;
        totalPages: number;
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

export function paymentMethodReducer(
  state: PaymentMethodState,
  action: PaymentMethodAction,
): PaymentMethodState {
  switch (action.type) {
    case "SET_PAYMENT_METHODS":
      return {
        ...state,
        paymentMethods: action.value,
      };

    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.value,
      };

    case "ADD_PAYMENT_METHOD":
      return {
        ...state,

        paymentMethods: [
          action.value,

          ...state.paymentMethods.map((paymentMethod) => ({
            ...paymentMethod,

            is_default: action.value.is_default
              ? false
              : paymentMethod.is_default,
          })),
        ],

        paymentMethod: action.value,
      };

    case "UPDATE_PAYMENT_METHOD":
      return {
        ...state,

        paymentMethods: state.paymentMethods.map((paymentMethod) =>
          paymentMethod.id === action.value.id
            ? action.value
            : paymentMethod,
        ),

        paymentMethod: action.value,
      };

    case "REMOVE_PAYMENT_METHOD":
      return {
        ...state,

        paymentMethods: state.paymentMethods.filter(
          (paymentMethod) => paymentMethod.id !== action.value,
        ),

        paymentMethod:
          state.paymentMethod?.id === action.value
            ? null
            : state.paymentMethod,
      };

    case "SET_DEFAULT_PAYMENT_METHOD":
      return {
        ...state,

        paymentMethods: state.paymentMethods
          .map((paymentMethod) => ({
            ...paymentMethod,

            is_default:
              paymentMethod.id === action.value.id,
          }))
          .sort(
            (a, b) =>
              Number(b.is_default) - Number(a.is_default),
          ),

        paymentMethod: action.value,
      };

    case "SET_TOTAL":
      return {
        ...state,
        total: action.value,
      };

    case "SET_PAGINATION":
      return {
        ...state,
        page: action.value.page,
        limit: action.value.limit,
        totalPages: action.value.totalPages,
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