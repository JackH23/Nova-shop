"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCheckout } from "@/composables/useCheckout";
import {
  usePaymentValidation,
  type PaymentData,
} from "@/composables/usePaymentValidation";
import { addressService } from "@/services/addressService";
import type { CheckoutStep } from "@/components/checkout/CheckoutSteps";
import { paymentMethodService } from "@/services/paymentMethodService";
import type { PaymentMethod as SavedPaymentMethod } from "@/lib/paymentMethod";

import type {
  ShippingData,
  DeliveryMethod,
  PaymentMethod,
} from "@/services/checkoutService";

export function useCheckoutContent() {
  const router = useRouter();

  const { checkout, loading, placingOrder, error, placeOrder } = useCheckout();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [showConfirm, setShowConfirm] = useState(false);
  const [defaultPaymentMethod, setDefaultPaymentMethod] =
    useState<SavedPaymentMethod | null>(null);

  const [shippingData, setShippingData] = useState<ShippingData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  });

  useEffect(() => {
    const getDefaultAddress = async () => {
      try {
        const response = await addressService.getDefaultAddress();

        if (!response.address) return;

        const defaultAddress = response.address;

        setShippingData({
          email: defaultAddress.email,
          firstName: defaultAddress.first_name,
          lastName: defaultAddress.last_name,
          address: defaultAddress.address,
          city: defaultAddress.city,
          stateProvince: defaultAddress.state_province ?? "",
          postalCode: defaultAddress.postal_code ?? "",
        });
      } catch (error) {
        console.error("Failed to fetch default address:", error);
      }
    };
    getDefaultAddress();
  }, []);

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("STANDARD");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT_CARD");

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  useEffect(() => {
    const getDefaultPaymentMethod = async () => {
      try {
        const response = await paymentMethodService.getDefaultPaymentMethod();

        if (!response.paymentMethod) return;

        const defaultPayment = response.paymentMethod;

        setDefaultPaymentMethod(defaultPayment);

        setPaymentData((prev) => ({
          ...prev,
          cardNumber: "",
          expiryDate: "",
        }));
      } catch (error) {
        console.error("Failed to fetch default payment method:", error);
      }
    };

    getDefaultPaymentMethod();
  }, []);

  const {
    errors: paymentErrors,
    validatePayment,
    handleChange: handlePaymentChange,
  } = usePaymentValidation(paymentData, setPaymentData, {
    requireCardNumber: !defaultPaymentMethod,
    requireExpiry: !defaultPaymentMethod,
    requireCvc: true,
  });
  const openConfirm = () => {
    if (paymentMethod === "CREDIT_CARD") {
      const isValid = validatePayment(paymentData);

      if (!isValid) return;
    }

    setShowConfirm(true);
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder({
        shipping: shippingData,
        deliveryMethod,
        paymentMethod,
      });

      console.log("Order placed:", response.order);

      setShowConfirm(false);

      router.push(`/checkout/success?orderId=${response.order.id}`);
    } catch (error) {
      console.error("Place order failed:", error);
    }
  };

  return {
    checkout,
    loading,
    placingOrder,
    error,

    step,
    setStep,

    shippingData,
    setShippingData,

    deliveryMethod,
    setDeliveryMethod,

    paymentMethod,
    setPaymentMethod,

    defaultPaymentMethod,

    paymentData,
    paymentErrors,
    handlePaymentChange,

    showConfirm,
    openConfirm,
    closeConfirm,

    handlePlaceOrder,
  };
}
