export type LoginState = {
  email: string;
  password: string;
  rememberMe: boolean;
  loading: boolean;
  error: string;
};

export const initialLoginState: LoginState = {
  email: "",
  password: "",
  rememberMe: false,
  loading: false,
  error: "",
};

export type LoginAction =
  | {
      type: "SET_FIELD";
      field: "email" | "password";
      value: string;
    }
  | {
    type: "SET_REMEMBER_ME";
    value: boolean;
  }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function loginReducer(
  state: LoginState,
  action: LoginAction
): LoginState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SET_REMEMBER_ME":
      return {
        ...state,
        rememberMe: action.value,
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