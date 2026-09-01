import Link from "next/link";

type FooterBrandProps = {
  showDescription?: boolean;
};

export default function FooterBrand({
  showDescription = true,
}: FooterBrandProps) {
  return (
    <div>
      <Link
        href="/dashboard"
        className="text-sm font-bold text-slate-950"
      >
        NovaShop
      </Link>

      {showDescription && (
        <p className="mt-3 max-w-[190px] text-[11px] leading-[18px] text-slate-600">
          Elevating your everyday with curated, modern minimalism.
        </p>
      )}
    </div>
  );
}