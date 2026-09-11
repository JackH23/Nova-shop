import AuthInput from "@/components/auth/AuthInput";
import AuthSelect from "@/components/auth/AuthSelect";

import type { ShippingData } from "@/services/checkoutService";

type ShippingFormProps = {
  shippingData: ShippingData;
  onShippingChange: (data: ShippingData) => void;
  onContinue: () => void;
};

export default function ShippingForm({
  shippingData,
  onShippingChange,
  onContinue,
}: ShippingFormProps) {
  const handleChange = (
    field: keyof ShippingData,
    value: string,
  ) => {
    onShippingChange({
      ...shippingData,
      [field]: value,
    });
  };

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
          value={shippingData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {/* Name */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthInput
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            value={shippingData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          <AuthInput
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last Name"
            value={shippingData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Address */}
        <AuthInput
          id="address"
          name="address"
          label="Address"
          type="text"
          placeholder="Street address or P.O. Box"
          value={shippingData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        {/* Location */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <AuthInput
            id="city"
            name="city"
            label="City"
            type="text"
            placeholder="City"
            value={shippingData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <AuthSelect
            id="state"
            name="state"
            label="State / Province"
            value={shippingData.stateProvince}
            onChange={(e) =>
              handleChange("stateProvince", e.target.value)
            }
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
            value={shippingData.postalCode}
            onChange={(e) =>
              handleChange("postalCode", e.target.value)
            }
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