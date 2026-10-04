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

export default function Footer({
  variant = "home",
}: FooterProps) {
  if (variant === "product") {
    return <ProductFooter />;
  }

  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#eef0f2] transition-colors dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-5 pt-7 sm:px-6 sm:pt-8 lg:px-10">
        {/* Footer content */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <FooterBrand />
          </div>

          {/* Company */}
          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={supportLinks}
          />

          {/* Legal */}
          <div className="col-span-2 sm:col-span-1">
            <FooterColumn
              title="Legal"
              links={legalLinks}
            />
          </div>
        </div>

        <FooterCopyright />
      </div>
    </footer>
  );
}