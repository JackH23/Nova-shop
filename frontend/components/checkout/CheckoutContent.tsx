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

  if (placingOrder) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <PageContainer>
          <div className="flex min-h-[600px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />

              <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                Creating your order...
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Please don't close or refresh this page.
              </p>
            </div>
          </div>
        </PageContainer>
      </main>
    );
  }

  const checkoutGrid = (
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
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Loading payment...
              </div>
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
  );

  return (
    <>
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
              <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                Loading payment...
              </div>
            )
          ) : (
            checkoutGrid
          )}
        </PageContainer>
      </main>
    </>
  );
}
