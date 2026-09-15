import type { WishlistItem } from "@/lib/wishlist";

export type WishlistState = {
  wishlist: WishlistItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  loading: boolean;
  error: string;
};

export const initialWishlistState: WishlistState = {
  wishlist: [],
  total: 0,
  page: 1,
  limit: 12,
  totalPages: 1,
  loading: false,
  error: "",
};

export type WishlistAction =
  | {
      type: "SET_WISHLIST";
      value: WishlistItem[];
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
      type: "ADD_WISHLIST_ITEM";
      value: WishlistItem;
    }
  | {
      type: "REMOVE_WISHLIST_ITEM";
      value: number;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function wishlistReducer(
  state: WishlistState,
  action: WishlistAction,
): WishlistState {
  switch (action.type) {
    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.value,
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

    case "ADD_WISHLIST_ITEM":
      return {
        ...state,
        wishlist: [action.value, ...state.wishlist],
        total: state.total + 1,
      };

    case "REMOVE_WISHLIST_ITEM":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.product_id !== action.value,
        ),
        total: Math.max(0, state.total - 1),
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
