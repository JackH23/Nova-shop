export type CheckoutStep = "shipping" | "delivery" | "payment";

type CheckoutStepsProps = {
  step: CheckoutStep;
};

export default function CheckoutSteps({ step }: CheckoutStepsProps) {
  const steps = [
    {
      key: "shipping",
      label: "Shipping",
      number: 1,
    },
    {
      key: "delivery",
      label: "Delivery",
      number: 2,
    },
    {
      key: "payment",
      label: "Payment",
      number: 3,
    },
  ] as const;

  return (
    <div className="mb-6 flex items-center gap-3 text-sm">
      {steps.map((item, index) => (
        <div key={item.key} className="flex items-center gap-3">
          <span
            className={
              step === item.key
                ? "font-semibold text-indigo-600"
                : "text-slate-500"
            }
          >
            {item.number}. {item.label}
          </span>

          {index < steps.length - 1 && (
            <span className="text-slate-400">›</span>
          )}
        </div>
      ))}
    </div>
  );
}
