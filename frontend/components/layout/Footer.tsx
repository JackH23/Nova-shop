import FooterBrand from "./footer/FooterBrand";
import FooterColumn from "./footer/FooterColumn";
import FooterCopyright from "./footer/FooterCopyright";
import ProductFooter from "./footer/ProductFooter";

const companyLinks = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

const supportLinks = [
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Shipping Info",
    href: "/shipping",
  },
  {
    label: "Returns",
    href: "/returns",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
];

type FooterProps = {
  variant?: "home" | "product";
};

export default function Footer({ variant = "home" }: FooterProps) {
  if (variant === "product") {
    return <ProductFooter />;
  }

  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#eef0f2]">
      <div className="mx-auto max-w-[1440px] px-10 pb-5 pt-8">
        {/* Footer columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <FooterBrand />

          <FooterColumn title="Company" links={companyLinks} />

          <FooterColumn title="Support" links={supportLinks} />

          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
}
