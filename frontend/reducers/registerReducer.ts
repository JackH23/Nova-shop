export type RegisterState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string;
};

export const initialRegisterState: RegisterState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  loading: false,
  error: "",
};

export type RegisterAction =
  | {
      type: "SET_FIELD";
      field: keyof Pick<
        RegisterState,
        "fullName" | "email" | "password" | "confirmPassword"
      >;
      value: string;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    }
  | {
      type: "RESET";
    };

export function registerReducer(
  state: RegisterState,
  action: RegisterAction
): RegisterState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
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

    case "RESET":
      return initialRegisterState;

    default:
      return state;
  }
}