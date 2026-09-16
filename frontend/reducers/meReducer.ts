export type User = {
  id: number;
  fullName: string;
  email: string;
  profileImage: string | null;
  isVerified: boolean;
};

export type MeState = {
  user: User | null;
  loading: boolean;
  error: string;
};

export const initialMeState: MeState = {
  user: null,
  loading: false,
  error: "",
};

export type MeAction =
  | {
      type: "SET_USER";
      value: User | null;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function meReducer(
  state: MeState,
  action: MeAction
): MeState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.value,
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