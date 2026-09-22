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

  const { checkout, loading, placingOrder, error, placeOrder } = useCheckout();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [creatingPayment, setCreatingPayment] = useState(false);

  const [shippingData, setShippingData] = useState<ShippingData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
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
          phone: defaultAddress.phone ?? "",
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

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("STANDARD");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CREDIT_CARD");

  useEffect(() => {
    if (step !== "payment") return;
    if (paymentMethod !== "CREDIT_CARD") return;
    if (clientSecret) return;

    const createStripePayment = async () => {
      try {
        setCreatingPayment(true);

        const response = await checkoutService.createPayment(deliveryMethod);

        setClientSecret(response.clientSecret);
      } catch (error) {
        console.error("Failed to create Stripe payment:", error);
      } finally {
        setCreatingPayment(false);
      }
    };

    createStripePayment();
  }, [step, paymentMethod, deliveryMethod, clientSecret]);

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

      console.log("Order placed:", response.order);

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
    clientSecret,
    creatingPayment,

    handlePlaceOrder,
  };
}
