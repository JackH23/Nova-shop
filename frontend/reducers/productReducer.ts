import type { Product } from "@/lib/products";

export type ProductState = {
  products: Product[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  loading: boolean;
  error: string;
};

export const initialProductState: ProductState = {
  products: [],
  total: 0,
  totalPages: 0,
  page: 1,
  limit: 9,
  loading: false,
  error: "",
};

export type ProductAction =
  | {
      type: "SET_PRODUCTS";
      products: Product[];
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function productReducer(
  state: ProductState,
  action: ProductAction
): ProductState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products,
        total: action.total,
        totalPages: action.totalPages,
        page: action.page,
        limit: action.limit,
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