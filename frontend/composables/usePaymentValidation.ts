import { useState } from "react";

export type PaymentData = {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

export type PaymentErrors = Partial<Record<keyof PaymentData, string>>;

type PaymentValidationOptions = {
  requireExpiry?: boolean;
  requireCvc?: boolean;
};

export function usePaymentValidation(
  paymentData?: PaymentData,
  onPaymentDataChange?: (data: PaymentData) => void,
  options: PaymentValidationOptions = {},
) {
  const { requireExpiry = true, requireCvc = true } = options;
  const [errors, setErrors] = useState<PaymentErrors>({});

  const validatePayment = (paymentData: PaymentData) => {
    const newErrors: PaymentErrors = {};

    const cleanCardNumber = paymentData.cardNumber.replace(/\s/g, "");

    if (!cleanCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (requireExpiry) {
      if (!paymentData.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
        newErrors.expiryDate = "Expiry date must be MM/YY";
      }
    }

    if (requireCvc) {
      if (!paymentData.cvc.trim()) {
        newErrors.cvc = "CVC is required";
      } else if (!/^\d{3,4}$/.test(paymentData.cvc)) {
        newErrors.cvc = "CVC must be 3 or 4 digits";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof PaymentData) => {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleChange = (field: keyof PaymentData, value: string) => {
    if (!paymentData || !onPaymentDataChange) return;

    let formattedValue = value;

    // Card number: numbers only, max 16 digits
    if (field === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);

      formattedValue = digits.replace(/(.{4})/g, "$1 ").trim();
    }

    // Expiry: numbers only, automatically add /
    if (field === "expiryDate") {
      const digits = value.replace(/\D/g, "").slice(0, 4);

      formattedValue =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }

    // CVC: numbers only, max 4 digits
    if (field === "cvc") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    onPaymentDataChange({
      ...paymentData,
      [field]: formattedValue,
    });

    clearError(field);
  };

  return {
    errors,
    validatePayment,
    clearError,
    clearErrors,
    handleChange,
  };
}
