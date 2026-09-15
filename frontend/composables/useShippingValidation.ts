import { useState } from "react";
import type { ShippingData } from "@/services/checkoutService";

export type ShippingErrors = Partial<Record<keyof ShippingData, string>>;

export function useShippingValidation(
  shippingData: ShippingData,
  onShippingChange: (data: ShippingData) => void,
  onContinue: () => void,
) {
  const [errors, setErrors] = useState<ShippingErrors>({});

  const validateShipping = (shippingData: ShippingData) => {
    const newErrors: ShippingErrors = {};

    if (!shippingData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!shippingData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!shippingData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!shippingData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!shippingData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!shippingData.stateProvince.trim()) {
      newErrors.stateProvince = "State / Province is required";
    }

    if (!shippingData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof ShippingData) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleChange = (field: keyof ShippingData, value: string) => {
    onShippingChange({
      ...shippingData,
      [field]: value,
    });

    clearError(field);
  };

  const handleContinue = () => {
    if (!validateShipping(shippingData)) return;

    onContinue();
  };

  return {
    errors,
    validateShipping,
    clearError,
    clearErrors,
    handleChange,
    handleContinue,
  };
}
