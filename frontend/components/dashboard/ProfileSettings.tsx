"use client";

export default function ProfileSettings() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div>
        <h2 className="text-base font-semibold text-slate-950">
          Profile Information
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Update your personal information.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* Full name */}
        <div>
          <label className="text-xs font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Jack Sihalard"
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#3324d8]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-medium text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            defaultValue="jack@example.com"
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#3324d8]"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-medium text-slate-700">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="+856 20..."
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#3324d8]"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="cursor-pointer rounded-md bg-[#3324d8] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#271bb7]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}