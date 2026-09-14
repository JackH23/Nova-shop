import AuthInput from "@/components/auth/AuthInput";
import AuthSelect from "@/components/auth/AuthSelect";
import { useShippingValidation } from "@/composables/useShippingValidation";
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
  const {
    errors,
    handleChange,
    handleContinue,
  } = useShippingValidation(
    shippingData,
    onShippingChange,
    onContinue,
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">
        Shipping Information
      </h2>

      <div className="space-y-4">
        {/* Email */}
        <AuthInput
          id="email"
          error={errors.email}
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
            error={errors.firstName}
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First Name"
            value={shippingData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          <AuthInput
            id="lastName"
            error={errors.lastName}
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
          error={errors.address}
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
            error={errors.city}
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
            error={errors.stateProvince}
            onChange={(e) => handleChange("stateProvince", e.target.value)}
            options={[
              { label: "Select State", value: "" },
              { label: "California", value: "california" },
              { label: "New York", value: "new-york" },
              { label: "Texas", value: "texas" },
            ]}
          />

          <AuthInput
            id="postalCode"
            error={errors.postalCode}
            name="postalCode"
            label="Postal Code"
            type="text"
            placeholder="Postal Code"
            value={shippingData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleContinue}
          className="h-11 w-full rounded-md bg-indigo-600 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue to Delivery →
        </button>
      </div>
    </section>
  );
}
