"use client";

type ProductSortProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductSort({
  value,
  onChange,
}: ProductSortProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none"
    >
      <option value="featured">
        Sort by: Featured
      </option>

      <option value="low-high">
        Price: Low to High
      </option>

      <option value="high-low">
        Price: High to Low
      </option>
    </select>
  );
}