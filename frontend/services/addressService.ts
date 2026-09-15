import { apiRequest } from "@/lib/api";

import type {
  AddressResponse,
  CreateAddressData,
  CreateAddressResponse,
  UpdateAddressData,
  UpdateAddressResponse,
  RemoveAddressResponse,
  SetDefaultAddressResponse,
} from "@/lib/address";

export const addressService = {
  // GET logged-in user's addresses
  getAddresses: (
    page: number = 1,
    limit: number = 4,
  ): Promise<AddressResponse> => {
    return apiRequest(`/addresses?page=${page}&limit=${limit}`, {
      method: "GET",
    });
  },

  // Create new address
  createAddress: (data: CreateAddressData): Promise<CreateAddressResponse> => {
    return apiRequest("/addresses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update address
  updateAddress: (
    addressId: number,
    data: UpdateAddressData,
  ): Promise<UpdateAddressResponse> => {
    return apiRequest(`/addresses/${addressId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Remove address
  removeAddress: (addressId: number): Promise<RemoveAddressResponse> => {
    return apiRequest(`/addresses/${addressId}`, {
      method: "DELETE",
    });
  },

  // Set address as default
  setDefaultAddress: (
    addressId: number,
  ): Promise<SetDefaultAddressResponse> => {
    return apiRequest(`/addresses/${addressId}/default`, {
      method: "PATCH",
    });
  },
};
