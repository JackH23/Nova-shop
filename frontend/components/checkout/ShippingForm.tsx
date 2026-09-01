import AuthInput from "@/components/auth/AuthInput";
import AuthSelect from "@/components/auth/AuthSelect";

type ShippingFormProps = {
  onContinue: () => void;
};

export default function ShippingForm({ onContinue }: ShippingFormProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        Shipping Information
      </h2>

      <div className="space-y-4">
        {/* Email */}
        <AuthInput
          id="email"
          name="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
        />

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
          />

          <AuthInput
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
          />
        </div>

        {/* Address */}
        <AuthInput
          id="address"
          name="address"
          label="Address"
          type="text"
          placeholder="Street address or P.O. Box"
        />

        {/* Location */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <AuthInput
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="City"
          />

          <AuthSelect
            id="state"
            name="state"
            label="State / Province"
            options={[
              { label: "Select State", value: "" },
              { label: "California", value: "california" },
              { label: "New York", value: "new-york" },
              { label: "Texas", value: "texas" },
            ]}
          />

          <AuthInput
            id="postalCode"
            name="postalCode"
            label="Postal Code"
            type="text"
            placeholder="Postal Code"
          />
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="h-11 w-full rounded-md bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue to Delivery →
        </button>
      </div>
    </section>
  );
}
