import Link from "next/link";
import Image from "next/image";

type FooterBrandProps = {
  showDescription?: boolean;
};

export default function FooterBrand({
  showDescription = true,
}: FooterBrandProps) {
  return (
    <div>
      <Link
        href="/home"
        prefetch={false}
        className="inline-flex items-center"
      >
        <Image
          src="/logo/novaShop.png"
          alt="NovaShop"
          width={140}
          height={44}
          className="h-8 w-auto object-contain"
        />
      </Link>

      {showDescription && (
        <p className="mt-3 max-w-[190px] text-[11px] leading-[18px] text-slate-600">
          Elevating your everyday with curated, modern minimalism.
        </p>
      )}
    </div>
  );
}