"use client";

import { useCallback, useEffect, useReducer } from "react";
import { addressService } from "@/services/addressService";
import { usePagination } from "@/composables/usePagination";
import { addressReducer, initialAddressState } from "@/reducers/addressReducer";
import { useAuth } from "@/components/shared/auth/AuthModalProvider";

import type { CreateAddressData, UpdateAddressData } from "@/lib/address";

export function useAddressContent() {
  const [state, dispatch] = useReducer(addressReducer, initialAddressState);

  const { currentPage, setCurrentPage } = usePagination();
  const { openLogin } = useAuth();

  // Get all addresses
  const getAddresses = useCallback(async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await addressService.getAddresses(currentPage);

      dispatch({
        type: "SET_ADDRESSES",
        value: response.addresses,
      });

      dispatch({
        type: "SET_TOTAL",
        value: response.total,
      });

      dispatch({
        type: "SET_PAGINATION",
        value: {
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Authentication required."
      ) {
        dispatch({
          type: "SET_ERROR",
          value: "",
        });

        openLogin();
        return;
      }

      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Failed to fetch addresses",
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  }, [currentPage]);

  // Create address
  const handleCreateAddress = useCallback(
    async (data: CreateAddressData) => {
      try {
        dispatch({
          type: "SET_LOADING",
          value: true,
        });

        dispatch({
          type: "SET_ERROR",
          value: "",
        });

        const response = await addressService.createAddress(data);

        // Reload current page so backend pagination
        // keeps the address limit correct
        await getAddresses();

        return response.address;
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          value:
            error instanceof Error ? error.message : "Failed to create address",
        });

        throw error;
      } finally {
        dispatch({
          type: "SET_LOADING",
          value: false,
        });
      }
    },
    [getAddresses],
  );

  // Update address
  const handleUpdateAddress = async (
    addressId: number,
    data: UpdateAddressData,
  ) => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });

      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await addressService.updateAddress(addressId, data);

      dispatch({
        type: "UPDATE_ADDRESS",
        value: response.address,
      });

      return response.address;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Failed to update address",
      });

      throw error;
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
  };

  // Remove address
  // Remove address
  const handleRemoveAddress = async (addressId: number) => {
    try {
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      await addressService.removeAddress(addressId);

      // If the last item on the current page was removed,
      // move back to the previous page
      if (state.addresses.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        return;
      }

      // Otherwise refresh the current page
      await getAddresses();
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error ? error.message : "Failed to remove address",
      });

      throw error;
    }
  };

  // Set default address
  const handleSetDefaultAddress = async (addressId: number) => {
    try {
      dispatch({
        type: "SET_ERROR",
        value: "",
      });

      const response = await addressService.setDefaultAddress(addressId);

      dispatch({
        type: "SET_DEFAULT_ADDRESS",
        value: response.address,
      });

      return response.address;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        value:
          error instanceof Error
            ? error.message
            : "Failed to set default address",
      });

      throw error;
    }
  };

  // Fetch addresses when page loads
  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  return {
    addresses: state.addresses,
    address: state.address,
    total: state.total,
    loading: state.loading,
    error: state.error,

    currentPage,
    setCurrentPage,
    totalPages: state.totalPages,

    getAddresses,
    handleCreateAddress,
    handleUpdateAddress,
    handleRemoveAddress,
    handleSetDefaultAddress,
  };
}
