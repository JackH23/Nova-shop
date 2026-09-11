import type { Cart, AddedCartItem, CartPagination } from "@/lib/cart";

export type CartState = {
  cart: Cart | null;
  cartItem: AddedCartItem | null;
  pagination: CartPagination;
  loading: boolean;
  error: string;
};

export const initialCartState: CartState = {
  cart: null,
  cartItem: null,

  pagination: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
  },

  loading: false,
  error: "",
};

export type CartAction =
  | {
      type: "SET_CART";
      value: Cart;
    }
  | {
      type: "SET_PAGINATION";
      value: CartPagination;
    }
  | {
      type: "SET_CART_ITEM";
      value: AddedCartItem;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.value,
      };

    case "SET_PAGINATION":
      return {
        ...state,
        pagination: action.value,
      };

    case "SET_CART_ITEM":
      return {
        ...state,
        cartItem: action.value,
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
