"use client";

import { useState } from "react";
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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmPayment = async () => {
    if (!stripe || !elements || loading) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const { error, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

      if (error) {
        console.error(
          "Stripe payment failed:",
          error.message,
        );

        setErrorMessage(
          error.message ?? "Payment failed.",
        );

        return;
      }

      if (paymentIntent?.status === "succeeded") {
        console.log(
          "Stripe payment successful:",
          paymentIntent.id,
        );

        await onSuccess(paymentIntent.id);
      }
    } catch (error) {
      console.error(
        "Stripe payment error:",
        error,
      );

      setErrorMessage(
        "Something went wrong while processing payment.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMessage && (
        <p className="mb-3 text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        onClick={handleConfirmPayment}
        disabled={!stripe || !elements || loading}
        className="w-full rounded-md bg-indigo-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Processing Payment..."
          : "Confirm Payment"}
      </button>
    </div>
  );
}