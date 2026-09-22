"use client";

import {
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

type StripePaymentConfirmProps = {
  onSuccess: (paymentIntentId: string) => Promise<void>;
};

export default function StripePaymentConfirm({
  onSuccess,
}: StripePaymentConfirmProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

    if (error) {
      console.error("Stripe payment failed:", error.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      console.log("Stripe payment successful:", paymentIntent.id);

      await onSuccess(paymentIntent.id);
    }
  };

  return (
    <button
      type="button"
      onClick={handleConfirmPayment}
      disabled={!stripe}
      className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
    >
      Confirm Payment
    </button>
  );
}