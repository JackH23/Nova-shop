"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCheckout } from "@/composables/useCheckout";
import {
  usePaymentValidation,
  type PaymentData,
} from "@/composables/usePaymentValidation";

import type { CheckoutStep } from "@/components/checkout/CheckoutSteps";

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

  const [shippingData, setShippingData] = useState<ShippingData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  });

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

  const {
    errors: paymentErrors,
    validatePayment,
    handleChange: handlePaymentChange,
  } = usePaymentValidation(paymentData, setPaymentData);

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

    paymentData,
    paymentErrors,
    handlePaymentChange,

    showConfirm,
    openConfirm,
    closeConfirm,

    handlePlaceOrder,
  };
}
