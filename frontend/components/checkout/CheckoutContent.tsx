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
import LoadingState from "@/components/common/LoadingState";
import AsyncState from "@/components/common/AsyncState";

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

  if (!checkout && !loading && !error) {
    return (
      <AsyncState
        isEmpty
        emptyTitle="Checkout unavailable"
        emptyDescription="There are no items available for checkout."
      >
        {null}
      </AsyncState>
    );
  }

  const checkoutGrid = checkout ? (
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
              <LoadingState message="Loading payment..." />
            )}

            {clientSecret && (
              <PaymentMethod
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onBack={() => setStep("delivery")}
              />
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
          paymentMethod={paymentMethod}
          placingOrder={placingOrder || creatingPayment}
          onPaymentSuccess={handlePlaceOrder}
        />
      </div>
    </div>
  ) : null;

  return (
    <AsyncState
      loading={loading || placingOrder}
      loadingMessage={
        placingOrder
          ? "Creating your order..."
          : "Loading checkout..."
      }
      error={error}
      isEmpty={!checkout}
      emptyTitle="Checkout unavailable"
      emptyDescription="There are no items available for checkout."
    >
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <PageContainer>
          {/* Checkout steps */}
          <CheckoutSteps step={step} />

          {step === "payment" ? (
            clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                }}
              >
                {checkoutGrid}
              </Elements>
            ) : (
              <LoadingState message="Loading payment..." />
            )
          ) : (
            checkoutGrid
          )}
        </PageContainer>
      </main>
    </AsyncState>
  );
}
