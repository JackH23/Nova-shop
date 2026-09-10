import type { Category } from "@/lib/categories";

export type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string;
};

export const initialCategoryState: CategoryState = {
  categories: [],
  loading: false,
  error: "",
};

export type CategoryAction =
  | {
      type: "SET_CATEGORIES";
      categories: Category[];
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function categoryReducer(
  state: CategoryState,
  action: CategoryAction
): CategoryState {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
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