import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

export default function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-semibold text-slate-950">
        {title}
      </h3>

      <div className="flex flex-col gap-2 text-[11px] text-slate-500">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition hover:text-[#3324d8]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}