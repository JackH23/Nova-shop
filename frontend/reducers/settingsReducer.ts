import type { SettingsUser } from "@/lib/settings";

export type SettingsState = {
  user: SettingsUser | null;

  loading: boolean;
  updatingProfile: boolean;
  updatingImage: boolean;
  changingPassword: boolean;
  deletingAccount: boolean;

  error: string;
};

export const initialSettingsState: SettingsState = {
  user: null,

  loading: false,
  updatingProfile: false,
  updatingImage: false,
  changingPassword: false,
  deletingAccount: false,

  error: "",
};

export type SettingsAction =
  | {
      type: "SET_USER";
      value: SettingsUser | null;
    }
  | {
      type: "UPDATE_PROFILE";
      value: {
        fullName: string;
        email: string;
      };
    }
  | {
      type: "UPDATE_PROFILE_IMAGE";
      value: string | null;
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_UPDATING_PROFILE";
      value: boolean;
    }
  | {
      type: "SET_UPDATING_IMAGE";
      value: boolean;
    }
  | {
      type: "SET_CHANGING_PASSWORD";
      value: boolean;
    }
  | {
      type: "SET_DELETING_ACCOUNT";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    }
  | {
      type: "RESET";
    };

export function settingsReducer(
  state: SettingsState,
  action: SettingsAction,
): SettingsState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.value,
      };

    case "UPDATE_PROFILE":
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          fullName: action.value.fullName,
          email: action.value.email,
        },
      };

    case "UPDATE_PROFILE_IMAGE":
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          profileImage: action.value,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.value,
      };

    case "SET_UPDATING_PROFILE":
      return {
        ...state,
        updatingProfile: action.value,
      };

    case "SET_UPDATING_IMAGE":
      return {
        ...state,
        updatingImage: action.value,
      };

    case "SET_CHANGING_PASSWORD":
      return {
        ...state,
        changingPassword: action.value,
      };

    case "SET_DELETING_ACCOUNT":
      return {
        ...state,
        deletingAccount: action.value,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.value,
      };

    case "RESET":
      return initialSettingsState;

    default:
      return state;
  }
}