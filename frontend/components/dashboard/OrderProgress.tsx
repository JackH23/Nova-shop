import { Check } from "lucide-react";

type OrderProgressProps = {
  status: string;
};

const steps = [
  {
    key: "PENDING",
    label: "Order Placed",
  },
  {
    key: "PROCESSING",
    label: "Processing",
  },
  {
    key: "SHIPPED",
    label: "Shipped",
  },
  {
    key: "DELIVERED",
    label: "Delivered",
  },
];

export default function OrderProgress({
  status,
}: OrderProgressProps) {
  const currentStepIndex = steps.findIndex(
    (step) => step.key === status,
  );

  return (
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Order Progress
      </h2>

      <div className="mt-8 flex items-start">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isActive = index <= currentStepIndex;

          return (
            <div
              key={step.key}
              className="flex flex-1 items-start last:flex-none"
            >
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500"
                      : "border-slate-300 bg-white text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={18} strokeWidth={3} />
                  ) : (
                    <span className="text-xs font-semibold">
                      {index + 1}
                    </span>
                  )}
                </div>

                <p
                  className={`mt-2 whitespace-nowrap text-xs font-medium ${
                    isCurrent
                      ? "text-indigo-600 dark:text-indigo-400"
                      : isCompleted
                        ? "text-slate-900 dark:text-slate-200"
                        : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`mt-4 h-0.5 flex-1 transition-colors ${
                    index < currentStepIndex
                      ? "bg-indigo-600 dark:bg-indigo-500"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}