import { Pencil, Phone } from "lucide-react";

export default function DashboardDefaultAddress() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">
          Default Address
        </h2>

        <button
          type="button"
          className="text-slate-500 hover:text-indigo-600"
        >
          <Pencil size={14} />
        </button>
      </div>

      <div className="mt-4 rounded-md bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          Alex Doe
        </p>

        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <p>1234 Design Boulevard</p>
          <p>Apt 4B</p>
          <p>San Francisco, CA 94107</p>
          <p>United States</p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
          <Phone size={12} />
          <span>+1 (555) 123-4567</span>
        </div>
      </div>
    </div>
  );
}