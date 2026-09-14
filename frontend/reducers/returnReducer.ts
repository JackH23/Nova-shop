import type { ReturnRequest } from "@/lib/returns";

export type ReturnState = {
  returnRequest: ReturnRequest | null;
  returns: ReturnRequest[];
  loading: boolean;
  error: string;
};

export const initialReturnState: ReturnState = {
  returnRequest: null,
  returns: [],
  loading: false,
  error: "",
};

export type ReturnAction =
  | {
      type: "SET_RETURN";
      value: ReturnRequest | null;
    }
  | {
      type: "SET_RETURNS";
      value: ReturnRequest[];
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function returnReducer(
  state: ReturnState,
  action: ReturnAction,
): ReturnState {
  switch (action.type) {
    case "SET_RETURN":
      return {
        ...state,
        returnRequest: action.value,
      };

    case "SET_RETURNS":
      return {
        ...state,
        returns: action.value,
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