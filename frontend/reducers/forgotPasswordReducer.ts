export type ForgotPasswordState = {
  email: string;
  loading: boolean;
  error: string;
};

export const initialForgotPasswordState: ForgotPasswordState = {
  email: "",
  loading: false,
  error: "",
};

export type ForgotPasswordAction =
  | {
      type: "SET_EMAIL";
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

export function forgotPasswordReducer(
  state: ForgotPasswordState,
  action: ForgotPasswordAction,
): ForgotPasswordState {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.value,
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