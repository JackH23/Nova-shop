"use client";

import ShippingForm from "./ShippingForm";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutSteps from "./CheckoutSteps";
import PageContainer from "@/components/common/PageContainer";
import DeliveryMethod from "./DeliveryMethod";
import { useCheckoutContent } from "@/composables/useCheckoutContent";
import ConfirmModal from "@/components/common/ConfirmModal";

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
    paymentData,
    paymentErrors,
    handlePaymentChange,

    showConfirm,
    openConfirm,
    closeConfirm,

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
                <PaymentMethod
                  paymentMethod={paymentMethod}
                  paymentData={paymentData}
                  errors={paymentErrors}
                  onPaymentMethodChange={setPaymentMethod}
                  onPaymentChange={handlePaymentChange}
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
                onPlaceOrder={openConfirm}
              />
            </div>
          </div>
        </PageContainer>
      </main>

      <ConfirmModal
        open={showConfirm}
        title="Confirm Order"
        message="Are you sure you want to place this order?"
        cancelText="Cancel"
        confirmText="Place Order"
        onCancel={closeConfirm}
        onConfirm={handlePlaceOrder}
      />
    </>
  );
}
