import Link from "next/link";
import FooterBrand from "./FooterBrand";

const productLinks = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Shipping Info",
    href: "/shipping",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
];

export default function ProductFooter() {
  return (
    <footer className="mt-auto border-t border-slate-300 bg-[#e9ecef]">
      <div className="mx-auto max-w-[1440px] px-10 py-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Brand */}
          <div className="w-[220px] shrink-0">
            <FooterBrand showDescription={false} />

            <p className="mt-3 text-[10px] leading-4 text-slate-600">
              © 2026 NovaShop Inc. All rights reserved.
            </p>
          </div>

          {/* Product footer links */}
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] text-slate-600 transition hover:text-[#3324d8]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}