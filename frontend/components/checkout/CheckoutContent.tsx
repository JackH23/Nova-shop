"use client";

import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutSteps from "./CheckoutSteps";
import PageContainer from "@/components/common/PageContainer";
import DeliveryMethod from "./DeliveryMethod";
import { useCheckoutContent } from "@/composables/useCheckoutContent";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentConfirm from "./StripePaymentConfirm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutContent() {
  const {
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
  } = useCheckoutContent();

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
    <>
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
                <>
                  {creatingPayment && (
                    <div className="rounded-lg border border-slate-200 bg-white p-6">
                      Loading payment...
                    </div>
                  )}

                  {clientSecret && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                      }}
                    >
                      <PaymentMethod
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                        onBack={() => setStep("delivery")}
                      />

                      <div className="mt-4">
                        <StripePaymentConfirm onSuccess={handlePlaceOrder} />
                      </div>
                    </Elements>
                  )}
                </>
              )}
            </div>

            {/* Right */}
            <div>
              <CheckoutSummary
                checkout={checkout}
                step={step}
                deliveryMethod={deliveryMethod}
                placingOrder={placingOrder || creatingPayment}
                onPlaceOrder={() => {}}
              />
            </div>
          </div>
        </PageContainer>
      </main>
    </>
  );
}
