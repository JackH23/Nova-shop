export type ResetPasswordState = {
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string;
};

export const initialResetPasswordState: ResetPasswordState = {
  password: "",
  confirmPassword: "",
  loading: false,
  error: "",
};

export type ResetPasswordAction =
  | {
      type: "SET_PASSWORD";
      value: string;
    }
  | {
      type: "SET_CONFIRM_PASSWORD";
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

export function resetPasswordReducer(
  state: ResetPasswordState,
  action: ResetPasswordAction,
): ResetPasswordState {
  switch (action.type) {
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.value,
      };

    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.value,
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