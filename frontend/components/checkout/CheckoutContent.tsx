"use client";

import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import { useCheckout } from "@/composables/useCheckout";
import { useState } from "react";
import CheckoutSteps, { type CheckoutStep } from "./CheckoutSteps";
import PageContainer from "@/components/common/PageContainer";
import DeliveryMethod from "./DeliveryMethod";

export default function CheckoutContent() {
  const { checkout, loading, error } = useCheckout();
  const [step, setStep] = useState<CheckoutStep>("shipping");

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
              <ShippingForm onContinue={() => setStep("delivery")} />
            )}

            {step === "delivery" && (
              <DeliveryMethod
                onBack={() => setStep("shipping")}
                onContinue={() => setStep("payment")}
              />
            )}

            {step === "payment" && (
              <PaymentMethod onBack={() => setStep("delivery")} />
            )}
          </div>

          {/* Right */}
          <div>
            <CheckoutSummary
              checkout={checkout}
              step={step}
            />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
