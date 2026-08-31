export type VerifyResetCodeState = {
  code: string;
  loading: boolean;
  error: string;
};

export const initialVerifyResetCodeState: VerifyResetCodeState = {
  code: "",
  loading: false,
  error: "",
};

export type VerifyResetCodeAction =
  | {
      type: "SET_CODE";
      value: string;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function verifyResetCodeReducer(
  state: VerifyResetCodeState,
  action: VerifyResetCodeAction,
): VerifyResetCodeState {
  switch (action.type) {
    case "SET_CODE":
      return {
        ...state,
        code: action.value,
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