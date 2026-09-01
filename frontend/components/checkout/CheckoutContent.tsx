"use client";

import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import { useCart } from "@/composables/useCart";
import { useState } from "react";
import CheckoutSteps, { type CheckoutStep } from "./CheckoutSteps";
import DeliveryMethod from "./DeliveryMethod";

export default function CheckoutContent() {
  const { cart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("shipping");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
              cart={cart}
              step={step}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
