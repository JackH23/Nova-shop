"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCheckout } from "@/composables/useCheckout";
import { addressService } from "@/services/addressService";
import type { CheckoutStep } from "@/components/checkout/CheckoutSteps";

import {
  checkoutService,
  type ShippingData,
  type DeliveryMethod,
  type PaymentMethod,
} from "@/services/checkoutService";

export function useCheckoutContent() {
  const router = useRouter();

  const {
    checkout,
    loading,
    placingOrder,
    error,
    placeOrder,
  } = useCheckout();

  const [step, setStep] =
    useState<CheckoutStep>("shipping");

  const [clientSecret, setClientSecret] =
    useState<string | null>(null);

  const [creatingPayment, setCreatingPayment] =
    useState(false);

  const [shippingData, setShippingData] =
    useState<ShippingData>({
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      stateProvince: "",
      postalCode: "",
    });

  const [deliveryMethod, setDeliveryMethodState] =
    useState<DeliveryMethod>("STANDARD");

  const [paymentMethod, setPaymentMethodState] =
    useState<PaymentMethod>("CREDIT_CARD");

  // ========================================
  // Get default shipping address
  // ========================================

  useEffect(() => {
    const getDefaultAddress = async () => {
      try {
        const response =
          await addressService.getDefaultAddress();

        if (!response.address) {
          return;
        }

        const defaultAddress = response.address;

        setShippingData({
          email: defaultAddress.email,
          firstName: defaultAddress.first_name,
          lastName: defaultAddress.last_name,
          phone: defaultAddress.phone ?? "",
          address: defaultAddress.address,
          city: defaultAddress.city,
          stateProvince:
            defaultAddress.state_province ?? "",
          postalCode:
            defaultAddress.postal_code ?? "",
        });
      } catch (error) {
        console.error(
          "Failed to fetch default address:",
          error,
        );
      }
    };

    getDefaultAddress();
  }, []);

  // ========================================
  // Change delivery method
  // ========================================

  const handleDeliveryMethodChange = (
    method: DeliveryMethod,
  ) => {
    setDeliveryMethodState(method);

    // Shipping price changes.
    // Do not reuse the old PaymentIntent.
    setClientSecret(null);
  };

  // ========================================
  // Change payment method
  // ========================================

  const handlePaymentMethodChange = (
    method: PaymentMethod,
  ) => {
    setPaymentMethodState(method);

    // Stripe clientSecret belongs only
    // to the credit-card payment flow.
    if (method !== "CREDIT_CARD") {
      setClientSecret(null);
    }
  };

  // ========================================
  // Create Stripe PaymentIntent
  // ========================================

  useEffect(() => {
    if (step !== "payment") {
      return;
    }

    if (paymentMethod !== "CREDIT_CARD") {
      return;
    }

    if (clientSecret) {
      return;
    }

    let cancelled = false;

    const createStripePayment = async () => {
      try {
        setCreatingPayment(true);

        const response =
          await checkoutService.createPayment(
            deliveryMethod,
          );

        if (cancelled) {
          return;
        }

        setClientSecret(response.clientSecret);
      } catch (error) {
        if (!cancelled) {
          console.error(
            "Failed to create Stripe payment:",
            error,
          );
        }
      } finally {
        if (!cancelled) {
          setCreatingPayment(false);
        }
      }
    };

    createStripePayment();

    return () => {
      cancelled = true;
    };
  }, [
    step,
    paymentMethod,
    deliveryMethod,
    clientSecret,
  ]);

  // ========================================
  // Place order after payment succeeds
  // ========================================

  const handlePlaceOrder = async (
    paymentIntentId: string,
  ) => {
    try {
      const response = await placeOrder({
        shipping: shippingData,
        deliveryMethod,
        paymentMethod,
        paymentIntentId,
      });

      console.log(
        "Order placed:",
        response.order,
      );

      // PaymentIntent has already succeeded.
      // Never reuse its clientSecret.
      setClientSecret(null);

      router.replace(
        `/checkout/success?orderId=${response.order.id}`,
      );
    } catch (error) {
      console.error(
        "Place order failed:",
        error,
      );
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
    setDeliveryMethod:
      handleDeliveryMethodChange,

    paymentMethod,
    setPaymentMethod:
      handlePaymentMethodChange,

    clientSecret,
    creatingPayment,

    handlePlaceOrder,
  };
}