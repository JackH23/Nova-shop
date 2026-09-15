import type { UserAddress } from "@/lib/address";

export type AddressState = {
  addresses: UserAddress[];
  address: UserAddress | null;

  total: number;
  page: number;
  limit: number;
  totalPages: number;

  loading: boolean;
  error: string;
};

export const initialAddressState: AddressState = {
  addresses: [],
  address: null,

  total: 0,
  page: 1,
  limit: 4,
  totalPages: 1,

  loading: false,
  error: "",
};

export type AddressAction =
  | {
      type: "SET_ADDRESSES";
      value: UserAddress[];
    }
  | {
      type: "SET_ADDRESS";
      value: UserAddress | null;
    }
  | {
      type: "ADD_ADDRESS";
      value: UserAddress;
    }
  | {
      type: "UPDATE_ADDRESS";
      value: UserAddress;
    }
  | {
      type: "REMOVE_ADDRESS";
      value: number;
    }
  | {
      type: "SET_DEFAULT_ADDRESS";
      value: UserAddress;
    }
  | {
      type: "SET_TOTAL";
      value: number;
    }
  | {
      type: "SET_PAGINATION";
      value: {
        page: number;
        limit: number;
        totalPages: number;
      };
    }
  | {
      type: "SET_LOADING";
      value: boolean;
    }
  | {
      type: "SET_ERROR";
      value: string;
    };

export function addressReducer(
  state: AddressState,
  action: AddressAction,
): AddressState {
  switch (action.type) {
    case "SET_ADDRESSES":
      return {
        ...state,
        addresses: action.value,
      };

    case "SET_ADDRESS":
      return {
        ...state,
        address: action.value,
      };

    case "ADD_ADDRESS":
      return {
        ...state,
        addresses: [
          action.value,
          ...state.addresses.map((address) => ({
            ...address,
            is_default: action.value.is_default ? false : address.is_default,
          })),
        ],
        address: action.value,
      };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address.id === action.value.id ? action.value : address,
        ),
        address: action.value,
      };

    case "REMOVE_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.value,
        ),
        address: state.address?.id === action.value ? null : state.address,
      };

    case "SET_DEFAULT_ADDRESS":
      return {
        ...state,
        addresses: state.addresses
          .map((address) => ({
            ...address,
            is_default: address.id === action.value.id,
          }))
          .sort((a, b) => Number(b.is_default) - Number(a.is_default)),
        address: action.value,
      };

    case "SET_TOTAL":
      return {
        ...state,
        total: action.value,
      };

    case "SET_PAGINATION":
      return {
        ...state,
        page: action.value.page,
        limit: action.value.limit,
        totalPages: action.value.totalPages,
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
