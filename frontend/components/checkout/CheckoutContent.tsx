"use client";

import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import { useCheckout } from "@/composables/useCheckout";
import { useState } from "react";
import CheckoutSteps, { type CheckoutStep } from "./CheckoutSteps";
import PageContainer from "@/components/common/PageContainer";
import DeliveryMethod from "./DeliveryMethod";
import type {
  ShippingData,
  DeliveryMethod as DeliveryMethodType,
  PaymentMethod as PaymentMethodType,
} from "@/services/checkoutService";

export default function CheckoutContent() {
  const { checkout, loading, placingOrder, error, placeOrder } = useCheckout();
  const [step, setStep] = useState<CheckoutStep>("shipping");

  const [shippingData, setShippingData] = useState<ShippingData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    stateProvince: "",
    postalCode: "",
  });

  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethodType>("STANDARD");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("CREDIT_CARD");

  const handlePlaceOrder = async () => {
    try {
      const response = await placeOrder({
        shipping: shippingData,
        deliveryMethod,
        paymentMethod,
      });

      console.log("Order placed:", response.order);
    } catch (error) {
      console.error("Place order failed:", error);
    }
  };

  if (loading) {
    return <div>Loading checkout...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!checkout) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <PageContainer>
        {/* Checkout steps */}
        <CheckoutSteps step={step} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left */}
          <div className="space-y-6">
            {step === "shipping" && (
              <ShippingForm
                shippingData={shippingData}
                onShippingChange={setShippingData}
                onContinue={() => setStep("delivery")}
              />
            )}

            {step === "delivery" && (
              <DeliveryMethod
                deliveryMethod={deliveryMethod}
                onDeliveryMethodChange={setDeliveryMethod}
                onBack={() => setStep("shipping")}
                onContinue={() => setStep("payment")}
              />
            )}

            {step === "payment" && (
              <PaymentMethod
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onBack={() => setStep("delivery")}
              />
            )}
          </div>

          {/* Right */}
          <div>
            <CheckoutSummary
              checkout={checkout}
              step={step}
              deliveryMethod={deliveryMethod}
              placingOrder={placingOrder}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
