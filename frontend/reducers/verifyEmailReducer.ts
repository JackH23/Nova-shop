export type VerifyEmailState = {
  code: string;
  loading: boolean;
  error: string;
};

export const initialVerifyEmailState: VerifyEmailState = {
  code: "",
  loading: false,
  error: "",
};

export type VerifyEmailAction =
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

export function verifyEmailReducer(
  state: VerifyEmailState,
  action: VerifyEmailAction
): VerifyEmailState {
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